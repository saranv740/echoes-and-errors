---
title: Building a web scraper in go
description: Building a concurrent web scraper in go.
date: "2026-06-25"
tags:
  - Go
  - Concurrency
published: true
image: /blog/scraper-in-go/hero.png
---

![Image from unsplash](/blog/scraper-in-go/hero.png "Image from unsplash")

Hey everyone, in this blog post we are going to build a simple, concurrent web scraper in go. Recently I spent some time coding a web scraper from this [boot.dev](https://www.boot.dev/courses/build-web-scraper-golang) course. This post will cover two concurrent implementations, one mentioned in course and a different implementation altogether. This post assumes that you already have some idea of golang's concurrency model and you have working knowledge of primitives like `WaitGroup`, `Mutex` and channels(`chan`). For final output refer this [Github repo](https://github.com/saranv740/crawler).

### Contents

### What is a web scraper?

A web scraper is a program that visits a web page and extracts some data for some purpose. For example, we can scrap an e-commerce website to extract data regarding products. This data can be further processed to gain some insights or serve as knowledge base.

### How does a web scraper work ?

A scraper starts from base/seed URL. The scraper fetches the page and data is extracted. After extraction, it moves to other links discover from the current page and repeats the same process for the newly discovered links. This process continues until desired amount of data is collected. The collected data is converted to format like JSON, XML, CSV or directly stored in databases.

### Web crawler vs web scraper

- A web crawler is used by search engines like google to extract the web page and understand it's content for indexing it. The indexed data is used for ranking the pages during search. It respect protocols like `robots.txt` and the entire content of the page will not be extracted in case of a crawler, it's targeted to access only specific parts of the page.

- A web scraper extracts the entire data for a specific kind of operations like gaining knowledge insights regarding pricing, market research, etc. It focuses on large amount of data. It might not follow protocols like crawler does.

### Scope
We will implement a configurable web scraper in form of CLI(Command Line Interface) that take a URL and scrapes for specific content.
```bash filename=bash
./build/crawler -url=https://learnwebscraping.dev/practice/ecommerce/ -workers=5 -pages=100 -output="output/report.json"
```

It will generate a report that looks like this:
```json filename=report.json
[
	{
		"url": "https://learnwebscraping.dev/practice/",
		"heading": "Scraping Practice",
		"first_paragraph": "First paragraph",
		"outgoing_links": [
			"https://learnwebscraping.dev/terms-of-service/",
			"https://www.boot.dev"
		],
		"image_urls": [
            "https://learnwebscraping.dev/practice/ecommerce/logo.png"
        ]
	},
	// Other entries...
]
```

### Implementation outline
1. First we will implement the logic that extracts the actual data.
2. Implement a mutex based concurrent scraper (shared memory).
3. Wire up the CLI and make the scraper configurable.
4. Refactor the scraping logic from mutex based to channel based (fixed worker pool).

### Initialize
Run these commands in your terminal to setup the project (if you haven't done already).
```bash filename=terminal
mkdir scraper-in-go && cd scraper-in-go
go mod init github.com/[your_name]/crawler
```

### Implementing extraction logic
Now we will create functions that make up the extraction part of the scraper. We will be using TDD(Test Driven Development) throughout the development. So we will write tests first and then implement the function. To extract data from HTML, we will be using the [goquery](https://pkg.go.dev/github.com/PuerkitoBio/goquery) library. To install the package run:
```bash filname=terminal
go get github.com/PuerkitoBio/goquery
```

Our first function would be `normalizeURL` that sanitizes the URL. We don't want to count the following URLs as four different URLs.
```text filename=example
https://codebysaran.in/posts/scraper-in-go
https://codebysaran.in/posts\scraper-in-go
https://codebysaran.in/posts/scraper-in-go?foo=bar
https://codebysaran.in/posts/scraper-in-go/
```

Also URLs might be malformed like `https://codebysaran.in/\posts//scraper-in-go//`. Let's create `normalize_url_test.go` under project directory.
```go filename=normalize_url_test.go
package main

import (
	"testing"
)

func TestNormalizeURL(t *testing.T) {
	tests := []struct {
		name          string
		input         string
		expected      string
		expectedError error
	}{
		{
			name:          "remove https",
			input:         "https://www.boot.dev/blog/path",
			expected:      "www.boot.dev/blog/path",
			expectedError: nil,
		},
		{
			name:          "remove trailing slash",
			input:         "https://www.boot.dev/blog/path/",
			expected:      "www.boot.dev/blog/path",
			expectedError: nil,
		},
		{
			name:          "remove http",
			input:         "http://www.boot.dev/blog/path",
			expected:      "www.boot.dev/blog/path",
			expectedError: nil,
		},
		{
			name:          "remove capitalization",
			input:         "https://www.boot.dev/blog/PATH",
			expected:      "www.boot.dev/blog/path",
			expectedError: nil,
		},
		{
			name:          "normalize slashes",
			input:         `https://www.boot.dev//blog\PATH\\hello//`,
			expected:      "www.boot.dev/blog/path/hello",
			expectedError: nil,
		},
		{
			name:          "invalid url",
			input:         `://www.boot.dev/`,
			expected:      "",
			expectedError: ErrInvalidURL,
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			out, err := normalizeURL(tc.input)
			if err != tc.expectedError {
				t.Fatalf("test %q failed. expected %v, got %v", tc.name, tc.expectedError, err)
			}

			if out != tc.expected {
				t.Fatalf("test %q failed. expected %q, got %q", tc.name, tc.expected, out)
			}
		})
	}
}
```

If your run the test using `go run .`, you will encounter an error, because the function is not yet implemented. Now the implementation of `normalizeURL`:
```go filename=normalize_url.go
func normalizeURL(raw string) (string, error) {
	parsed, err := url.Parse(raw)
	if err != nil {
		return "", ErrInvalidURL
	}

	stripped := fmt.Sprintf("%s%s", parsed.Host, path.Clean(strings.ReplaceAll(parsed.Path, `\`, "/")))
	stripped = strings.ToLower(stripped)

	return stripped, nil
}
```

The above function parses the url and returns back sanitized version. The tests should now pass. Now we from the example output we can see that we need to extract four fields.
```json {3,4,5,9} filename=example
{
	"url": "https://learnwebscraping.dev/practice/",
	"heading": "Scraping Practice",
	"first_paragraph": "First paragraph",
	"outgoing_links": [
		"https://learnwebscraping.dev/terms-of-service/",
		"https://www.boot.dev"
	],
	"image_urls": [
		"https://learnwebscraping.dev/practice/ecommerce/logo.png"
	]
}
```

To extract the data we require, we have to first select the element. Going with a small example the html response will look something like this:
```text filename='html response'
<html>
  <body>
    <h1>Welcome to Boot.dev</h1>
    <main>
      <p>Learn to code by building real projects.</p>
      <p>This is the second paragraph.</p>
    </main>
  </body>
</html>
```

**Note**: since the test functions are taking lot of space, I will link the github code for future implementations instead of full code.

The goquery library has a convenient function that can be used to select the element from the tree call `Find` that accepts a selector similar to javascript's `document.querySelector`. We will implement the `getHeadingFromHTML` function. The testing logic for the function can be found [here](https://github.com/saranv740/crawler/blob/694c7967f0ae689734622ac8838d114530b84774/parse_html_test.go#L10-L67).
```go filename=parse_html.go
package main

import (
	"strings"
	"github.com/PuerkitoBio/goquery"
)

func getHeadingFromHTML(rawHTML string) string {
	// goquery accepts only a reader interface,
	// so we are converting string to reader
	reader := strings.NewReader(rawHTML)
	doc, err := goquery.NewDocumentFromReader(reader)
	if err != nil {
		return ""
	}

	node := doc.Find("h1")
	// If H1 tag is not there try to find H2
	if node.Length() == 0 {
		node = doc.Find("h2")
	}

	return node.Text()
}
```

Now the tests are passing, we can move to next function, that is getting the paragraph element. The tests can be found [here](https://github.com/saranv740/crawler/blob/694c7967f0ae689734622ac8838d114530b84774/parse_html.go#L28-L41). As you can see in the test we are extracting main tag data first, if main element is absent then there is a fallback to paragraph. Actually it should be named as something like getMainContentFromHTML, but for some reason they kept it like this in the course. The implementation:
```go filename=parse_html.go
// Rest of the code...
func getParagraphFromHTML(rawHTML string) string {
	reader := strings.NewReader(rawHTML)
	doc, err := goquery.NewDocumentFromReader(reader)
	if err != nil {
		return ""
	}

	// Try to find main if not fallback to p tag
	node := doc.Find("main")
	if node.Length() == 0 {
		node = doc.Find("p")
	}

	return node.Text()
}
```

Moving to the next field, we need links used in image source and anchor tags. Both the functions `getLinksFromHTML` and `getLinksFromImages` are similar in implementation. One issue here is using `Find` method will return the first element that matches the selector. We certainly don't want to capture only the first anchor or image links.  Secondly, both anchor and image elements can have mix of relative, absolute and external URLs. Since the scraper searches through all the links, relative URLs must be resolved into a full URL. The solution is explained in comments. The implementation:
```go filename=parse_html.go
// Rest of the code...
func getLinksFromHTML(rawHTML string, baseURL *url.URL) ([]string, error) {
	reader := strings.NewReader(rawHTML)
	doc, err := goquery.NewDocumentFromReader(reader)
	if err != nil {
		return []string{}, err
	}

	result := make([]string, 0)
	/*
		Chaining Each to Find result will execute a callback
		on every element that matches the selector.
	*/
	doc.Find("a[href]").Each(func(_ int, s *goquery.Selection) {
		// Take the href attribute or return empty string if it's absent
		href := s.AttrOr("href", "")

		// If the href starts with /, like /post/some-post, it's a relative URL
		if strings.HasPrefix(href, "/") {
			// add the baseURL to convert relative URL To a full URL
			href = fmt.Sprintf("%s%s", baseURL, href)
		}

		if href != "" {
			result = append(result, href)
		}
	})

	return result, nil
}

func getLinksFromImages(rawHTML string, baseURL *url.URL) ([]string, error) {
	reader := strings.NewReader(rawHTML)
	doc, err := goquery.NewDocumentFromReader(reader)
	if err != nil {
		return []string{}, err
	}

	result := make([]string, 0)
	doc.Find("img[src]").Each(func(_ int, s *goquery.Selection) {
		src := s.AttrOr("src", "")

		if strings.HasPrefix(src, "/") {
			src = fmt.Sprintf("%s%s", baseURL, src)
		}

		if src != "" {
			result = append(result, src)
		}
	})

	return result, nil
}
```
