---
title: "002 - Basic Syntax and Structure"
authors: ["Peter Verheijen"]
date: 2024-09-27
description: "Understand Rust syntax essentials for Python developers: functions, mutability, control flow, and loops."
tags: ["Rust", "Python", "Programming", "Syntax", "Comparison", "Functions", "Variables", "Loops", "Control Flow", "Types", "Pythonista", "Beginners", "Software Development"]
draft: false
template: "page.html"
---

Welcome to syntax essentials. This lesson compares the Rust basics you use every day with equivalent Python constructs.

## Why this matters for Python developers

You already know how to model logic. The main shift is Rust’s explicit typing and immutability-by-default.

## Learning goals

By the end of this lesson, you should be able to:

- Write functions with explicit parameter and return types.
- Use mutable/immutable bindings intentionally.
- Read and write basic control flow (`if`, `for`, `while`).

## Concepts in 5 minutes

- `fn` defines functions.
- `let` introduces bindings, immutable by default.
- `if` is an expression in Rust.
- Braces define blocks; indentation is stylistic, not semantic.

## 1. Defining Functions

In Python, functions are defined with `def`, and you have the freedom of not explicitly defining types for parameters or return values:

```python
def add(x, y):
    return x + y
```

In Rust, functions are defined using the `fn` keyword. Unlike Python, Rust enforces explicit type annotations for both parameters and return values:

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y
}
```

In this Rust example, the types of `x` and `y` are explicitly declared as `i32`, which is a 32-bit integer, and the return type is also specified after the `->` symbol. Rust's strict type system ensures safety and performance at compile time, something Python typically handles dynamically at runtime.

## Key differences

- **Type annotations**: Rust requires type annotations for both parameters and return types, whereas Python is dynamically typed and doesn't require explicit types.
- **Return values**: In Rust, the return type is declared after the arrow (`->`). Additionally, Rust doesn’t use the `return` keyword if the last expression in the function is the return value. Python, on the other hand, always uses `return`.

## 2. Variables and Mutability

In Python, variables are mutable by default:

```python
x = 10
x = x + 5
```

In Rust, variables are immutable by default. If you want to make a variable mutable, you have to explicitly declare it using the `mut` keyword:

```rust
let mut x = 10;
x = x + 5;
```

## Key differences

- **Immutability**: In Rust, variables are immutable by default for safety reasons, while in Python, variables can be reassigned freely.
- **Explicit mutability**: Rust forces you to explicitly declare variables as mutable (`mut`) if you plan to change their values.

### 3. Control Flow: `if` Statements

Python and Rust both use `if` statements for conditionals, but there are some differences in syntax and flexibility.

#### Python:
```python
x = 10
if x > 5:
    print("x is greater than 5")
else:
    print("x is less than or equal to 5")
```

#### Rust:
```rust
let x = 10;
if x > 5 {
    println!("x is greater than 5");
} else {
    println!("x is less than or equal to 5");
}
```

#### Key differences

- **Parentheses**: In Rust, the condition doesn’t need parentheses (similar to Python), but it’s required to use curly braces `{}` around blocks of code.
- **Block structure**: In Rust, control flow structures always require curly braces, while in Python, indentation is used to define blocks.

### 4. Loops: `for` and `while`

Python’s `for` loop iterates over sequences like lists or ranges, while Rust’s `for` loop works similarly but is often paired with iterators.

#### Python:
```python
for i in range(5):
    print(i)

```

#### Rust:
```rust
for i in 0..5 {
    println!("{}", i);
}
```

#### Key differences

- **Ranges**: In Python, `range(5)` generates numbers from 0 to 4. In Rust, the range syntax `0..5` also generates values from 0 to 4. Rust’s range syntax is more flexible and can be inclusive (`0..=5` includes 5).
- **Iteration over collections**: Both languages allow looping over collections, but Rust encourages use of its powerful iterator traits for more control over iteration.

Rust also has a `while` loop similar to Python’s:

#### Python:

```python
i = 0
while i < 5:
    print(i)
    i += 1
```

#### Rust:

```rust
let mut x = 0;

while x < 5 {
    println!("{}", x);
    x += 1;
}
```

#### Key differences

- **Mutability**: In Rust, you must declare `i` as mutable (`mut`) if you plan to change its value, while Python doesn’t require such an explicit declaration.

## 5. Returning Values from `if` Statements

One unique feature of Rust is that `if` statements are expressions, meaning they can return values. Python’s `if` blocks are statements and cannot return values directly without using additional techniques like a ternary operator.

#### Python:

```python
x = 5
y = 10 if x > 5 else 0
```

#### Rust:

```rust
let x = 5;
let y = if x > 5 { 10 } else { 0 };
```

#### Key Differences:
- **Expressions**: In Rust, control structures like `if` can return values directly, making it more expressive in some cases compared to Python.
- **No ternary operator**: Rust doesn’t have a ternary operator because `if` is already an expression.

## 6. Rust's `main` function

In Rust, every standalone program requires a `main` function, much like a script in Python. However, Python doesn’t require this unless the script needs to be run in a specific context:

#### Python:

```python
if __name__ == "__main__":
    print("Hello, Python!")
```

#### Rust:

```rust
fn main() {
    println!("Hello, Rust!");
}
```
#### Key differences
- **Entry point**: Rust programs must have a `main` function as an entry point, whereas Python scripts can be run without one. The `if __name__ == "__main__"` guard is a common idiom in Python but not necessary in Rust.

## One runnable end-to-end example

```rust
// 1. Defining Functions in Rust
fn add(x: i32, y: i32) -> i32 {
    x + y
}

fn main() {
    // Call the add function
    println!("Sum of 2 and 3: {}", add(2, 3));

    // 2. Variables and Mutability
    let mut x = 10;
    x = x + 5;
    println!("Updated value of x: {}", x);

    // 3. Control Flow: if Statements
    if x > 5 {
        println!("x is greater than 5");
    } else {
        println!("x is less than or equal to 5");
    }

    // 4. Loops in Rust: for Loop
    println!("For loop output:");
    for i in 0..5 {
        println!("{}", i);
    }

    // 4. Loops in Rust: while Loop
    println!("While loop output:");
    let mut y = 0;
    while y < 5 {
        println!("{}", y);
        y += 1;
    }

    // 5. Returning values from if statements
    let z = if x > 5 { 10 } else { 0 };
    println!("Value of z: {}", z);

    // 6. Rust's main function (Already part of the example)
    println!("Hello, Rust!");
}
```

## Common mistakes

- Forgetting type annotations in function signatures.
- Forgetting `mut` when a value must change.
- Using semicolons after expressions that should return values.

## Quick practice

1. Write a function `multiply(x: i32, y: i32) -> i32` and call it.
2. Create a loop that prints numbers `1..=3`.

## Recap

Rust syntax is familiar in spirit but stricter by design. The big wins are explicitness and compile-time guarantees.

In the next lesson, we’ll cover ownership, borrowing, and lifetimes.
