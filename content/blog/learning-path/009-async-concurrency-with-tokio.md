---
title: "009 - Async Concurrency with Tokio"
authors: ["Peter Verheijen"]
date: 2024-10-12
description: "A practical introduction to async concurrency in Rust with Tokio for Python asyncio users."
tags: [Rust, Python, Async, Tokio, Concurrency]
draft: false
template: "page.html"
---

# Learning Rust as a Pythonista: Async Concurrency with Tokio

This is part 2 of concurrency. In part 1, we used threads/channels/shared state. Here we focus on asynchronous I/O-style concurrency with `async`/`await` and Tokio.

## Why this matters for Python developers

If you already use `asyncio`, this will feel familiar:

- `async def` ↔ `async fn`
- `await` ↔ `await`
- event loop/runtime ↔ async runtime (`tokio`)

The big difference is that Rust still enforces strong type and memory guarantees at compile time.

## Learning goals

By the end of this lesson, you should be able to:

- Write an async Rust function and await it.
- Spawn concurrent async tasks with `tokio::spawn`.
- Add minimal Tokio setup in `Cargo.toml`.

## Concepts in 5 minutes

- `async fn` returns a `Future`.
- A runtime (Tokio) drives futures to completion.
- Use `tokio::spawn` for concurrent tasks.
- Use `join!`/`await` to synchronize task completion.

## Python baseline snippet

```python
import asyncio

async def fetch(name, delay):
    await asyncio.sleep(delay)
    return f"{name} done"

async def main():
    a = asyncio.create_task(fetch("A", 1))
    b = asyncio.create_task(fetch("B", 1))
    print(await a)
    print(await b)

asyncio.run(main())
```

## Rust setup (`Cargo.toml`)

```toml
[dependencies]
tokio = { version = "1", features = ["macros", "rt-multi-thread", "time"] }
```

## Rust equivalent snippets

### 1) Basic async function

```rust
use tokio::time::{sleep, Duration};

async fn fetch(name: &str, delay_ms: u64) -> String {
    sleep(Duration::from_millis(delay_ms)).await;
    format!("{} done", name)
}
```

### 2) Spawn tasks

```rust
let a = tokio::spawn(async { fetch("A", 500).await });
let b = tokio::spawn(async { fetch("B", 500).await });

println!("{}", a.await.unwrap());
println!("{}", b.await.unwrap());
```

## One runnable end-to-end example

```rust
use tokio::time::{sleep, Duration};

async fn fetch(name: &str, delay_ms: u64) -> String {
    sleep(Duration::from_millis(delay_ms)).await;
    format!("{} done", name)
}

#[tokio::main]
async fn main() {
    let tasks = vec![
        tokio::spawn(async { fetch("profile", 300).await }),
        tokio::spawn(async { fetch("orders", 500).await }),
        tokio::spawn(async { fetch("recommendations", 200).await }),
    ];

    for task in tasks {
        match task.await {
            Ok(value) => println!("{}", value),
            Err(e) => eprintln!("task failed: {}", e),
        }
    }

    println!("all async tasks completed");
}
```

## Common mistakes

- Forgetting to add Tokio dependency/features.
- Calling async functions without `await`.
- Doing heavy CPU work directly in async tasks (use threads or `spawn_blocking` instead).

## Quick practice

1. Add a fourth task and print completion order.
2. Change delays and verify faster tasks complete first.

## Recap

Use async for high-concurrency I/O workflows; use threads for CPU-heavy parallel work. Rust supports both models cleanly and safely.

Next, we continue with advanced pattern matching.
