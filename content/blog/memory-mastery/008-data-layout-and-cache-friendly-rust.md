---
title: "008 - Data Layout and Cache-Friendly Rust"
authors: ["Peter Verheijen"]
date: 2024-11-01
description: "Improve memory locality and performance by choosing data layouts that fit CPU caches."
tags: [Rust, Python, memory, cache, data layout, performance]
template: "page.html"
---

## Data Layout and Cache-Friendly Rust

## Why this matters

Memory access patterns often dominate performance. Fast code is not only about algorithms—it is also about data layout and locality.

## Learning goals

By the end, you should be able to:

- Explain why contiguous memory often improves performance.
- Recognize Array of Structs (AoS) vs Struct of Arrays (SoA) tradeoffs.
- Apply simple layout choices to improve cache friendliness.

## Mental model

CPU caches prefer predictable, contiguous reads.

- Good locality: sequential access in `Vec<T>`.
- Poor locality: pointer chasing across many heap allocations.

## Python baseline

Python lists store references to Python objects, which can reduce data locality compared to tightly packed primitive arrays.

## AoS vs SoA (concept)

- **AoS**: `Vec<Point {x, y}>` — nice ergonomics for per-object operations.
- **SoA**: `xs: Vec<f32>, ys: Vec<f32>` — often better for column-wise numeric loops.

## Runnable end-to-end example

```rust
#[derive(Clone, Copy)]
struct Point {
    x: f32,
    y: f32,
}

fn sum_aos(points: &[Point]) -> f32 {
    points.iter().map(|p| p.x + p.y).sum()
}

fn sum_soa(xs: &[f32], ys: &[f32]) -> f32 {
    xs.iter().zip(ys.iter()).map(|(x, y)| x + y).sum()
}

fn main() {
    let n = 10_000;

    // AoS layout
    let points: Vec<Point> = (0..n)
        .map(|i| Point {
            x: i as f32,
            y: (i * 2) as f32,
        })
        .collect();

    // SoA layout
    let xs: Vec<f32> = (0..n).map(|i| i as f32).collect();
    let ys: Vec<f32> = (0..n).map(|i| (i * 2) as f32).collect();

    let a = sum_aos(&points);
    let b = sum_soa(&xs, &ys);

    println!("sum_aos = {}", a);
    println!("sum_soa = {}", b);
}
```

## Practical guidance

- Keep hot-path data contiguous when possible.
- Benchmark with realistic workloads before redesigning structure.
- Choose AoS for ergonomics, SoA for heavy column-wise numeric processing.

## Common pitfalls

- Optimizing layout before measuring.
- Overcomplicating code for tiny gains in non-critical paths.
- Confusing algorithmic improvements with locality improvements.

## Quick practice

1. Extend the example to include `z` and compare AoS/SoA functions.
2. Measure both versions with `cargo run --release` and compare timings manually.

## Recap

Cache-friendly layout can unlock significant speedups. Rust gives you control over data representation so you can choose the right tradeoff for each workload.

Next lesson: [009 - Concurrency Memory Safety (`Send`, `Sync`)](/blog/memory-mastery/009-concurrency-memory-safety-send-sync/).
