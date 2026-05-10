---
title: "005 - String, &str, and Allocation Patterns"
authors: ["Peter Verheijen"]
date: 2024-10-29
description: "Choose between String and &str, and reduce unnecessary allocations in Rust APIs."
tags: [Rust, Python, String, str, allocation, memory]
template: "page.html"
---

## String, &str, and Allocation Patterns

## Why this matters

A lot of Rust performance and ergonomics comes down to one practical question: should this API take `String` or `&str`?

## Learning goals

By the end, you should be able to:

- Explain the difference between `String` and `&str`.
- Design APIs that avoid unnecessary allocations.
- Use `Cow<'_, str>` when you sometimes need owned data.

## Mental model

- `String` = owned, growable UTF-8 buffer (heap-allocated).
- `&str` = borrowed string slice, view into UTF-8 bytes.
- Prefer borrowing (`&str`) at API boundaries unless ownership is needed.

## Python baseline

```python
def normalize(name: str) -> str:
    return name.strip().lower()
```

Python strings are immutable and reference-managed; copying behavior is runtime-managed.

## Rust examples

```rust
fn normalize(name: &str) -> String {
    name.trim().to_lowercase()
}
```

```rust
fn print_title(title: &str) {
    println!("{}", title);
}
```

Both `&String` and string literals (`&'static str`) can be passed as `&str`.

## Runnable end-to-end example

```rust
use std::borrow::Cow;

fn normalize(name: &str) -> String {
    name.trim().to_lowercase()
}

fn maybe_trim(input: &str) -> Cow<'_, str> {
    let trimmed = input.trim();
    if trimmed.len() == input.len() {
        Cow::Borrowed(input)
    } else {
        Cow::Owned(trimmed.to_string())
    }
}

fn main() {
    let owned = String::from("  Rustacean  ");
    let literal = "Pythonista";

    // borrow both as &str
    println!("normalized owned: {}", normalize(&owned));
    println!("normalized literal: {}", normalize(literal));

    // avoid allocation when unchanged
    let a = maybe_trim("no_spaces");
    let b = maybe_trim("  has spaces  ");

    println!("a = {} (borrowed: {})", a, matches!(a, Cow::Borrowed(_)));
    println!("b = {} (borrowed: {})", b, matches!(b, Cow::Borrowed(_)));
}
```

## Common pitfalls

- Accepting `String` when `&str` would be enough.
- Cloning strings at call sites because function signatures are too strict.
- Returning borrowed `&str` tied to temporary allocations.

## Quick practice

1. Refactor a function from `fn f(x: String)` to `fn f(x: &str)` and update call sites.
2. Add a function that concatenates two `&str` values and returns `String`.

## Recap

Use `&str` for input flexibility and fewer allocations; use `String` when ownership is part of the API contract.

Next lesson: [006 - Smart Pointers (`Box`, `Rc`, `Arc`, `RefCell`)](/blog/memory-mastery/006-smart-pointers-box-rc-arc-refcell/).
