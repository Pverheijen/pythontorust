---
title: "007 - Traits vs Duck Typing and Protocols"
authors: ["Peter Verheijen"]
date: 2024-10-09
description: "Compare Rust traits with Python duck typing and protocols, including static and dynamic dispatch tradeoffs."
tags: [Rust, Python, Duck Typing, Traits, Protocols, Type Safety, Programming]
draft: false
template: "page.html"
---

# Learning Rust as a Pythonista: Traits vs. Duck Typing and Protocols

Traits are one of Rust’s most important abstraction tools. They are the bridge between flexibility and type safety.

## Why this matters for Python developers

- Python duck typing is flexible but mostly runtime-checked.
- Python protocols add optional static checking.
- Rust traits make behavior contracts explicit and compile-time enforced.

## Learning goals

By the end of this lesson, you should be able to:

- Define and implement a trait.
- Use trait bounds for static dispatch.
- Use trait objects (`dyn Trait`) for runtime polymorphism.

## Concepts in 5 minutes

- `trait` defines required behavior.
- `impl Trait for Type` implements that behavior.
- Static dispatch: `fn f<T: Trait>(...)` or `impl Trait`.
- Dynamic dispatch: `&dyn Trait` / `Box<dyn Trait>`.

## Python baseline snippets

```python
def notify(service):
    print(service.send("Build finished"))
```

```python
from typing import Protocol

class Notifier(Protocol):
    def send(self, msg: str) -> str: ...
```

## Rust equivalent snippets

```rust
trait Notifier {
    fn send(&self, msg: &str) -> String;
}
```

```rust
fn notify_static<T: Notifier>(service: &T, msg: &str) {
    println!("{}", service.send(msg));
}

fn notify_dynamic(service: &dyn Notifier, msg: &str) {
    println!("{}", service.send(msg));
}
```

## One runnable end-to-end example

```rust
trait Notifier {
    fn send(&self, msg: &str) -> String;
}

struct EmailNotifier {
    from: String,
}

struct SlackNotifier {
    channel: String,
}

impl Notifier for EmailNotifier {
    fn send(&self, msg: &str) -> String {
        format!("email from {}: {}", self.from, msg)
    }
}

impl Notifier for SlackNotifier {
    fn send(&self, msg: &str) -> String {
        format!("slack #{}: {}", self.channel, msg)
    }
}

// Static dispatch (monomorphized at compile time)
fn notify_static<T: Notifier>(service: &T, msg: &str) {
    println!("[static] {}", service.send(msg));
}

// Dynamic dispatch (trait object)
fn notify_dynamic(service: &dyn Notifier, msg: &str) {
    println!("[dynamic] {}", service.send(msg));
}

fn main() {
    let email = EmailNotifier {
        from: "noreply@pythontorust.nl".to_string(),
    };
    let slack = SlackNotifier {
        channel: "engineering".to_string(),
    };

    notify_static(&email, "Build finished");
    notify_static(&slack, "Tests passed");

    let services: Vec<Box<dyn Notifier>> = vec![
        Box::new(EmailNotifier {
            from: "alerts@pythontorust.nl".to_string(),
        }),
        Box::new(SlackNotifier {
            channel: "ops".to_string(),
        }),
    ];

    for service in services {
        notify_dynamic(service.as_ref(), "Deployment started");
    }
}
```

## Static vs dynamic dispatch (practical)

- Use **static dispatch** for performance and simple generic APIs.
- Use **dynamic dispatch** when you need heterogeneous collections (`Vec<Box<dyn Trait>>`) or plugin-like behavior.

## Common mistakes

- Returning concrete types where trait-object abstraction is needed.
- Reaching for `dyn Trait` too early when generics are enough.
- Forgetting object-safety constraints when designing traits for `dyn` usage.

## Quick practice

1. Add `SmsNotifier` implementing `Notifier`.
2. Create a function that broadcasts one message to a `Vec<Box<dyn Notifier>>`.

## Recap

Traits let Rust express polymorphism with explicit contracts. Choose static or dynamic dispatch based on API and performance needs.

Next lesson: concurrency part 1 (threads, channels, shared state).