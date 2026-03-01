---
title: Sample
description: This is a sample markdown file.
date: "2025-10-21"
categories:
  - sveltekit
  - svelte
published: true
---

<script>
  import Button from '../components/Button.svelte'
</script>

# Svelte

## Contents

## Intro

Hey friends! 👋

- this blog is written in markdown file, But rendered as html using [mdsvex](https://github.com/pngwn/MDsveX) and [svelte](https://svelte.dev/)

## Syntax highligting

```ts
function greet(name: string) {
	console.log(`Hey ${name}! 👋`);
}
```

## Counter

The counter is rendered inside markdown

<Button type="button">Email</Button>

## Media

Media inside the **static** folder is served from `/`.

![Svelte](/opm.png "an image of one punch man")

<Button type="button">Email</Button>
