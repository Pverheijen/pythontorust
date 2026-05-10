---
title: "003 - Borrowing Rules in Real Functions"
authors: ["Peter Verheijen"]
date: 2024-10-27
description: "Apply Rust borrowing rules in realistic function boundaries and APIs."
tags: [Rust, Python, borrowing, references, ownership]
template: "page.html"
---

## Borrowing Rules in Real Functions

## Why this matters

Most borrow checker issues show up at function boundaries, not toy examples. This lesson focuses on patterns you can reuse in real code.

## Learning goals

By the end, you should be able to:

- Design function signatures using `&T` and `&mut T` appropriately.
- Avoid conflicting borrows in the same scope.
- Return owned values or references intentionally.

## Core rules refresher

- Many immutable borrows OR one mutable borrow at a time.
- References must never outlive the data they refer to.

## Python baseline

```python
def add_tag(tags, item):
    tags.append(item)

items = ["rust"]
add_tag(items, "memory")
print(items)
```

## Rust equivalent

```rust
fn add_tag(tags: &mut Vec<String>, item: &str) {
    tags.push(item.to_string());
}
```

## Runnable end-to-end example

```rust
#[derive(Debug)]
struct User {
    name: String,
    tags: Vec<String>,
}

fn add_tag(user: &mut User, tag: &str) {
    user.tags.push(tag.to_string());
}

fn display_name(user: &User) {
    println!("name: {}", user.name);
}

fn uppercase_name(user: &User) -> String {
    user.name.to_uppercase()
}

fn main() {
    let mut user = User {
        name: "peter".to_string(),
        tags: vec!["python".to_string()],
    };

    display_name(&user); // immutable borrow

    add_tag(&mut user, "rust"); // mutable borrow
    add_tag(&mut user, "memory");

    let upper = uppercase_name(&user); // immutable borrow again
    println!("upper = {}", upper);
    println!("user = {:?}", user);
}
```

## API design tip

Default to:

- `&T` when reading,
- `&mut T` when mutating,
- `T` when taking ownership is intended.

## Common pitfalls

- Keeping an immutable borrow alive while trying to mutably borrow.
- Returning references to local variables.
- Using `String` inputs where `&str` would be more flexible.

## Quick practice

1. Add `fn remove_tag(user: &mut User, tag: &str)`.
2. Change one function to take ownership and explain why.

## Recap

Borrowing is mostly API design discipline. Clear function signatures make ownership flow obvious and code easier to maintain.

Next lesson: [004 - Lifetimes Without Fear](/blog/memory-mastery/004-lifetimes-without-fear/).
