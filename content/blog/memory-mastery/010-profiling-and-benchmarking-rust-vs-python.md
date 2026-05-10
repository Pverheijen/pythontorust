---
title: "010 - Profiling and Benchmarking Rust vs Python"
authors: ["Peter Verheijen"]
date: 2024-11-03
description: "A practical and fair way to benchmark Rust and Python for memory-sensitive workloads."
tags: [Rust, Python, profiling, benchmarking, performance]
template: "page.html"
---

## Profiling and Benchmarking Rust vs Python

## Why this matters

Performance claims are easy to make and easy to get wrong. This final lesson gives you a minimal, repeatable process for fair comparisons.

## Learning goals

By the end, you should be able to:

- Separate benchmarking from profiling.
- Design an apples-to-apples comparison.
- Interpret results without overfitting to noise.

## Benchmarking vs profiling

- **Benchmarking** answers: “How fast is version A vs B?”
- **Profiling** answers: “Where is the time/memory going?”

Do benchmark first to verify there is a real issue; profile second to find causes.

## Fair comparison checklist

- Same algorithm and data size.
- Same input distribution.
- Warm-up runs before measurement.
- Multiple runs, then summarize (median/percentiles).
- Report hardware + compiler/interpreter versions.

## Minimal benchmark example

Rust side:

```rust
use std::time::Instant;

fn sum_squares(data: &[u64]) -> u64 {
    data.iter().map(|x| x * x).sum()
}

fn main() {
    let data: Vec<u64> = (0..2_000_000).collect();

    let warmup = sum_squares(&data);
    let _ = warmup;

    let start = Instant::now();
    let result = sum_squares(&data);
    let elapsed = start.elapsed();

    println!("result={result}, elapsed_ms={}", elapsed.as_millis());
}
```

Python side:

```python
import time

def sum_squares(data):
    return sum(x * x for x in data)

data = list(range(2_000_000))
_ = sum_squares(data)  # warm-up

start = time.perf_counter()
result = sum_squares(data)
elapsed = (time.perf_counter() - start) * 1000

print(f"result={result}, elapsed_ms={elapsed:.2f}")
```

## Reading results responsibly

- Prefer median over a single run.
- If differences are small, treat them as inconclusive.
- Distinguish CPU-bound from I/O-bound workloads.
- Tie results back to user-facing impact.

## Recap

You now have a compact memory-mastery path:

1. Ownership and borrowing foundations.
2. Stack/heap and allocation behavior.
3. Lifetimes and reference design.
4. Smart pointers and interior mutability.
5. Data layout and cache effects.
6. Concurrency memory safety.
7. Fair benchmarking and profiling.

This is enough to make strong architecture choices without turning the series into a giant textbook.

Continue exploring related content in the [Learning Path](/blog/learning-path/).
