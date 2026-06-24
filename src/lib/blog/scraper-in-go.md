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

Hey everyone, in this blog post we are going to build a simple, concurrent web scraper in go. Recently I spent some time coding a web scraper from [boot.dev](https://www.boot.dev/courses/build-web-scraper-golang). This post will cover two concurrent implementations. I assume that you already have some idea around how concurrency in golang works and you have working knowledge of primitives like `WaitGroup`, `Mutex` and channels(`chan`). For final output refer this [Github repo](https://github.com/saranv740/crawler).

### Contents

### What is a web scraper?

A web scraper is a program that visits a web page and extracts some data for some purpose. For example, we can scrap an e-commerce website to extract data regarding products. This data can be further processed to gain some insights or serve as knowledge base.

### How does a web scraper work ?

A scraper starts from base/seed URL. The scraper fetches the page and data is extracted. After extraction, it moves to other links discover from the current page and repeats the same process for the newly discovered links. This process continues until desired amount of data is collected. The collected data is converted to format like JSON, XML, CSV or directly stored in databases.

### Web crawler vs web scraper

- A web crawler is used by search engines like google to extract the web page and understand it's content for indexing it. The indexed data is used for ranking the pages during search. It respect protocols like `robots.txt` and the entire content of the page will not be extracted in case of a crawler, it's targeted to access only specific parts of the page.

- A web scraper extracts the entire data for a specific kind of operations like gaining knowledge insights regarding pricing, market research, etc. It focuses on large amount of data. It might not follow protocols like crawler does.

### Scope
We will implement a configurable web scraper in form of CLI(command line interface) that take a URL and scrapes for specific content.
```bash
./build/crawler -url=https://learnwebscraping.dev/practice/ecommerce/ -workers=5 -pages=100 -output="output/report.json"
```

It will generate a report that looks like this:
```json
[
	{
		"url": "https://learnwebscraping.dev/",
		"heading": "Web Scraping Practice Sandbox",
		"first_paragraph": "First paragraph",
		"outgoing_links": [
			"https://learnwebscraping.dev/",
			"https://learnwebscraping.dev/practice/",
		],
		"image_urls": []
	},
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
]
```

### Implementation outline
1. First we will implement the core logic that extracts the actual data.
2. Implement a mutex based concurrent scraper (shared memory).
3. Wire up the CLI and make the scraper configurable.
4. Refactor the scraping logic from mutex based to channel based (fixed worker pool).
