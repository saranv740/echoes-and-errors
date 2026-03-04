---
title: Sample
description: This is a sample markdown file.
date: "2025-10-21"
categories:
  - sveltekit
  - svelte
published: false
---

<script>
  import Counter from '../components/blog/Counter.svelte'
</script>

### Headings:

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

### Ordered List:

1. Item 1
2. Item 2
3. Item 3

### Unordered List:

- Item 1
- Item 2
- Item 3

### Link:

[mdsvex](https://github.com/pngwn/MDsveX)

### Checkbox:

- [ ] unchecked
- [x] checked

### Syntax highligting

```ts
function greet(name: string) {
	console.log(`Hey ${name}! 👋`);
}
```

- The next word will be `highlighted`

### Interactive component

This interactive counter is rendered inside markdown

<Counter />

### Media

Media inside the **static** folder is served from `/`.

![Image Alt](/blog/sample/opm.png "Image title")
![](/blog/sample/post-12.jpg "Image without alt")
![Image without title](/blog/sample/opm.png)

### Table

| Column1 | Column2 | Column3 | Column4 |
| --------------- | --------------- | --------------- | --------------- |
| Item1.1 | Item2.1 | Item3.1 | Item4.1 |
| Item1.2 | Item2.2 | Item3.2 | Item4.2 |
| Item1.3 | Item2.3 | Item3.3 | Item4.3 |

