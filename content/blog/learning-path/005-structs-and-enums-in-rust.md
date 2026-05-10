---
title: "005 - Structs and Enums"
authors: ["Peter Verheijen"]
date: 2024-10-07
description: "Model data and state in Rust using structs, enums, and exhaustive pattern matching."
tags: [Rust, Python]
draft: false
template: "page.html"
---

# Learning Rust as a Pythonista: Structs and Enums

This lesson covers Rust’s two core data modeling tools: `struct` and `enum`.

## Why this matters for Python developers

- `dataclass` and `namedtuple` map naturally to Rust `struct`s.
- Rust `enum`s are much more powerful than Python `Enum` because variants can carry data.
- Together with `match`, they make state modeling explicit and safe.

## Learning goals

By the end of this lesson, you should be able to:

- Define and instantiate regular and tuple structs.
- Model multiple states with enums carrying data.
- Use `match` to handle enum variants exhaustively.

## Concepts in 5 minutes

- `struct` = named fields
- tuple struct = positional fields with custom type identity
- `enum` = one of several variants (each variant may carry different data)
- `match` = exhaustive branching over enum variants

## Python baseline snippet

```python
from dataclasses import dataclass
from enum import Enum

@dataclass
class Post:
    id: int
    title: str

class Status(Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
```

## Rust equivalent snippets

```rust
struct Post {
    id: u64,
    title: String,
}

struct Rgb(u8, u8, u8);
```

```rust
enum PostStatus {
    Draft,
    Published { published_at: String },
    Archived { reason: String },
}
```

## One runnable end-to-end example

```rust
struct Post {
    id: u64,
    title: String,
    views: u32,
}

struct Rgb(u8, u8, u8);

enum PostStatus {
    Draft,
    Published { published_at: String },
    Archived { reason: String },
}

fn status_label(status: &PostStatus) -> String {
    match status {
        PostStatus::Draft => "draft".to_string(),
        PostStatus::Published { published_at } => format!("published at {}", published_at),
        PostStatus::Archived { reason } => format!("archived ({})", reason),
    }
}

fn main() {
    let mut post = Post {
        id: 1,
        title: "Learning Rust".to_string(),
        views: 0,
    };

    post.views += 1;
    println!("#{} {} (views: {})", post.id, post.title, post.views);

    let accent = Rgb(52, 152, 219);
    println!("theme color: {}, {}, {}", accent.0, accent.1, accent.2);

    let states = [
        PostStatus::Draft,
        PostStatus::Published {
            published_at: "2026-05-10".to_string(),
        },
        PostStatus::Archived {
            reason: "superseded".to_string(),
        },
    ];

    for state in &states {
        println!("status: {}", status_label(state));
    }
}
```

## Common mistakes

- Using structs where enums model state transitions better.
- Forgetting to handle all enum variants in `match`.
- Overusing tuple structs when named fields would be clearer.

## Quick practice

1. Add a `Scheduled { publish_at: String }` variant and handle it in `status_label`.
2. Add a method-like function `bump_views(post: &mut Post)` and call it twice.

## Recap

Use structs for data shape, enums for state/variants, and `match` to keep behavior explicit and exhaustive.

Next lesson: iterators and closures.