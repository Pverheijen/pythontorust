---
title: "000 - Learning Rust as a Pythonista: A Suggested Path"
authors: ["Peter Verheijen"]
date: 2024-09-25
description: "A suggested path to learn Rust coming from Python"
tags: [Rust, Python, path]
template: "page.html"
---

# Learning Rust as a Pythonista: A Suggested Path

This is the roadmap for the full series. It is written for Python developers who want a practical and structured path into Rust.

## Prerequisites

- Comfortable with Python basics (`functions`, `classes`, exceptions, iterables).
- Basic command-line usage.
- Rust toolchain installed (`rustup`, `cargo`, `rustc`).

## How to use this series

- Follow in order. Rust concepts build on each other.
- Run every example locally.
- Don’t skip ownership/borrowing: it unlocks most later topics.

## Estimated effort

- 30–60 minutes per lesson
- 8–12 hours for first full pass
- 1–2 additional passes for retention

## Progress map

1. [001 - Create and run a Rust program](/blog/learning-path/001-your-first-rust-program/)
2. [002 - Basic syntax and structure](/blog/learning-path/002-basic-syntax-and-structure/)
3. [003 - Ownership, borrowing, and lifetimes](/blog/learning-path/003-ownership-borrowing-and-lifetimes/)
4. [004 - Error handling](/blog/learning-path/004-error-handling/)
5. [005 - Structs and enums](/blog/learning-path/005-structs-and-enums-in-rust/)
6. [006 - Iterators and closures](/blog/learning-path/006-iterators-and-closures-in-rust/)
7. [007 - Traits vs duck typing](/blog/learning-path/007-rust-traits-duck-typing-protocols/)
8. [008 - Concurrency in Rust (threads/channels)](/blog/learning-path/008-concurrency-in-rust/)
9. [009 - Async concurrency with Tokio](/blog/learning-path/009-async-concurrency-with-tokio/)
10. [010 - Pattern matching](/blog/learning-path/010-pattern-matching-in-rust/)
11. [011 - Macros in Rust](/blog/learning-path/011-macros-in-rust/)

## Why this order?

- **Ownership before error handling**: `Result`, `Option`, and borrowing often appear together.
- **Data modeling before abstractions**: `struct`/`enum` make iterator and trait examples clearer.
- **Concurrency later**: threads/async are easier after ownership and traits.

If you only remember one thing: Rust gets easier once ownership “clicks.”
