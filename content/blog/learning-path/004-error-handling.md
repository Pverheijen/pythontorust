---
title: "004 - Error Handling"
authors: ["Peter Verheijen"]
date: 2024-10-02
description: "Learn practical Rust error handling with Result, Option, and the ? operator, compared to Python exceptions."
tags: ["Rust", "Python", "Error Handling", "Programming", "Comparison", "Learning Rust"]
draft: false
template: "page.html"
---

# Learning Rust as a Pythonista: Error Handling

Rust makes failure explicit with `Result` and `Option`. That means more typing up front, but fewer hidden runtime surprises.

## Why this matters for Python developers

- Python raises exceptions at runtime.
- Rust represents recoverable failures in the type system.
- The compiler helps you handle unhappy paths early.

## Learning goals

By the end of this lesson, you should be able to:

- Use `Result<T, E>` for operations that can fail.
- Use `Option<T>` when a value may be absent.
- Propagate errors cleanly with `?`.

## Concepts in 5 minutes

- `Result<T, E>` = `Ok(value)` or `Err(error)`
- `Option<T>` = `Some(value)` or `None`
- `?` returns early with `Err(...)` when needed

## Python baseline snippet

```python
def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None
```

## Rust equivalent snippets

```rust
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("cannot divide by zero".to_string())
    } else {
        Ok(a / b)
    }
}
```

```rust
fn find_value(values: &[i32], index: usize) -> Option<i32> {
    values.get(index).copied()
}
```

## One runnable end-to-end example

```rust
use std::num::ParseIntError;

#[derive(Debug)]
enum AppError {
    Parse(ParseIntError),
    InvalidConfig(String),
}

impl From<ParseIntError> for AppError {
    fn from(value: ParseIntError) -> Self {
        AppError::Parse(value)
    }
}

fn parse_port(input: &str) -> Result<u16, AppError> {
    let port: u16 = input.parse()?;
    if port == 0 {
        Err(AppError::InvalidConfig("port must be > 0".to_string()))
    } else {
        Ok(port)
    }
}

fn maybe_timeout(ms: Option<u64>) -> u64 {
    ms.unwrap_or(1_000)
}

fn main() {
    // Result + ? + custom error
    match parse_port("8080") {
        Ok(port) => println!("port = {}", port),
        Err(err) => println!("error: {:?}", err),
    }

    match parse_port("0") {
        Ok(port) => println!("port = {}", port),
        Err(err) => println!("error: {:?}", err),
    }

    // Option handling
    println!("timeout = {} ms", maybe_timeout(Some(250)));
    println!("timeout = {} ms", maybe_timeout(None));
}
```

## Common mistakes

- Calling `unwrap()` everywhere instead of handling errors intentionally.
- Returning `String` errors for everything in larger apps (prefer typed errors).
- Mixing `Option` and `Result` without clear intent.

## Quick practice

1. Change `parse_port` to reject ports below `1024`.
2. Add `fn divide(a, b) -> Result<f64, AppError>` and return a typed error on zero.

## Recap

Use `Result` for failures and `Option` for missing values. Rust’s explicit model is a core reason production code is easier to reason about.

Next lesson: structs and enums.
