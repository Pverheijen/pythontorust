---
title: "003 - Ownership, Borrowing, and Lifetimes"
authors: ["Peter Verheijen"]
date: 2024-09-30
description: "A practical introduction to Rust ownership, borrowing, and lifetimes for Python developers."
tags: [Rust, Python, ownership, borrowing, lifetimes]
draft: false
template: "page.html"
---

# Learning Rust as a Pythonista: Ownership, Borrowing, and Lifetimes

## Why this matters for Python developers

In Python, memory management is mostly invisible because the runtime handles it for you. In Rust, memory safety is guaranteed without a garbage collector through ownership and borrowing rules checked at compile time.

This is the concept that feels hardest at first—and gives the biggest payoff once it clicks.

## Learning goals

By the end of this lesson, you should be able to:

- Explain Rust’s ownership model in plain language.
- Use references (`&T`) and mutable references (`&mut T`) correctly.
- Recognize when a lifetime annotation is needed and what it means.

## Concepts in 5 minutes

- Every Rust value has **one owner**.
- When ownership is **moved**, the previous binding can no longer use the value.
- You can **borrow** data with references:
  - many immutable borrows (`&T`) OR
  - one mutable borrow (`&mut T`)
- Lifetimes describe how long references are valid, preventing dangling references.

## Python baseline

```python
# Python: assignment usually binds another name to the same object
names = ["Ada", "Grace"]
other = names
other.append("Linus")
print(names)  # ["Ada", "Grace", "Linus"]
```

## Rust equivalent (ownership + move)

```rust
fn main() {
    let names = vec![String::from("Ada"), String::from("Grace")];
    let other = names; // move ownership to `other`

    // println!("{:?}", names); // compile error: value moved
    println!("{:?}", other);
}
```

## Borrowing with references

```rust
fn print_len(items: &Vec<String>) {
    println!("len = {}", items.len());
}

fn main() {
    let names = vec![String::from("Ada"), String::from("Grace")];
    print_len(&names); // borrow immutably
    println!("still usable: {:?}", names);
}
```

## Mutable borrowing

```rust
fn add_name(items: &mut Vec<String>, name: &str) {
    items.push(name.to_string());
}

fn main() {
    let mut names = vec![String::from("Ada")];
    add_name(&mut names, "Grace");
    println!("{:?}", names);
}
```

Rule of thumb: at any point in time, either many readers or one writer.

## Lifetimes (minimal practical example)

Lifetimes become visible when returning references from functions.

```rust
fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() >= b.len() { a } else { b }
}

fn main() {
    let first = String::from("rust");
    let second = String::from("pythonista");

    let winner = longest(&first, &second);
    println!("Longest: {}", winner);
}
```

`'a` says: the returned reference is valid for at most the shorter of the two input lifetimes.

## One runnable end-to-end example

```rust
fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() >= b.len() { a } else { b }
}

fn add_prefix(name: &mut String, prefix: &str) {
    let updated = format!("{}{}", prefix, name);
    *name = updated;
}

fn main() {
    // 1) Ownership move
    let original = String::from("Rust");
    let moved = original;
    println!("Moved value: {}", moved);

    // 2) Immutable borrow
    let a = String::from("Ada");
    let b = String::from("Lovelace");
    let longest_name = longest(&a, &b);
    println!("Longest name part: {}", longest_name);

    // 3) Mutable borrow
    let mut label = String::from("compiler");
    add_prefix(&mut label, "safe-");
    println!("Updated label: {}", label);
}
```

## Common mistakes

- Trying to use a value after moving it.
- Mixing immutable and mutable borrows in the same scope.
- Returning a reference to data created inside a function.

## Quick practice

1. Write `fn first_word(s: &str) -> &str` that returns the first word.
2. Write `fn push_twice(v: &mut Vec<i32>, x: i32)` and call it from `main`.

## Recap

Ownership gives Rust memory safety without a GC. Borrowing lets you reuse data safely, and lifetimes make reference validity explicit when needed.

In the next lesson, we’ll use this foundation to make `Result` and `Option` error handling feel much more natural.
