---
title: "002 - Learning Rust as a Pythonista: Basic Syntax and Structure"
authors: ["Peter Verheijen"]
date: 2024-09-27
description: "In this article, we introduce Rust from a Pythonista's perspective, focusing on basic syntax and structure. Through comparisons between Python and Rust, we cover defining functions, variables, control flow, and loops, helping Python developers ease into Rust's stricter type system and memory management features. This is the first post in a series aimed at making Rust more approachable for Python developers."
tags: ["Rust", "Python", "Programming", "Syntax", "Comparison", "Functions", "Variables", "Loops", "Control Flow", "Types", "Pythonista", "Beginners", "Software Development"]
draft: false
---

Welcome to the first article in the series on learning Rust from a Pythonista’s perspective. In this post, we’ll dive into the fundamental syntax and structure of Rust, drawing comparisons to Python to ease the learning curve. This will help you get familiar with Rust's core language features by relating them to what you already know.

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

## Key Differences:

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

## Key Differences:

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

#### Key Differences:

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

#### Key Differences:

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

#### Key Differences:

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

## 6. Rust's `main` Function

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
#### Key Differences:
- **Entry point**: Rust programs must have a `main` function as an entry point, whereas Python scripts can be run without one. The `if __name__ == "__main__"` guard is a common idiom in Python but not necessary in Rust.

## Conclusion

The basics of Rust syntax and structure are not drastically different from Python, but Rust’s strict typing, immutability by default, and expression-based control flow may feel unfamiliar at first. Understanding these foundational differences will set you up for success as you dive deeper into Rust’s powerful features.

In the next article, we’ll explore Rust’s memory management model, focusing on Ownership and Borrowing, which is quite different from Python’s garbage collection system. Stay tuned!

## Running the Complete Rust Example

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

### Explanation:
- **Defining Functions:** The `add` function is defined and called with parameters `2` and `3`, returning their sum.
- **Variables and Mutability:** A mutable variable `x` is modified and printed.
- **Control Flow:** An `if` statement checks whether `x` is greater than 5 and prints the appropriate message.
- **Loops:** A `for` loop prints numbers from `0` to `4`, and a `while` loop does the same for `y` from `0` to `4`.
- **Returning Values from `if`:** The result of the `if` expression is stored in `z` and printed.

You can compile and run this Rust code to verify the output.

### To run it:
1. Create a file called `main.rs`.
2. Copy this code into the file.
3. Compile and run using the following commands:
   ```bash
   rustc main.rs
   ./main
    ```
