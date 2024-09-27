---
title: "008"
date: 2024-09-26
description: "Pattern Matching in Rust"
tags: [Rust, Python]
draft: true
---

# Learning Rust as a Pythonista: Pattern Matching

In this article, we’ll explore **Pattern Matching** in Rust, one of the language’s most powerful and flexible features. Pattern matching allows you to match complex data structures and handle different cases with safety and conciseness. Python introduced **Structural Pattern Matching** in Python 3.10 (PEP 634), but Rust's pattern matching is more deeply integrated into the language and is an essential part of its design.

## 1. Pattern Matching in Python

With the release of Python 3.10, structural pattern matching was introduced, allowing Python to handle more complex cases using the `match` statement. Here's an example of Python’s pattern matching:

### Python Example (Pattern Matching):

```python
def process(value):
    match value:
        case 0:
            return "Zero"
        case 1:
            return "One"
        case _:
            return "Other"

print(process(0))  # Output: Zero
print(process(2))  # Output: Other
```

In this example, Python’s `match` statement evaluates the value and matches it against different cases.

### Key Points in Python:

- **New Feature**: Structural pattern matching was introduced in Python 3.10, and it allows for more concise handling of various data patterns.
- **Basic Use**: Python’s `match` works well with basic types like integers, tuples, and custom objects but is still evolving in flexibility and complexity.

### 2. Pattern Matching in Rust

Rust’s pattern matching is a core feature of the language, and it goes beyond simple matching of values. Rust allows you to match against structs, enums, tuples, and more, while enforcing exhaustive matches at compile time, ensuring all cases are handled.

#### Rust `match` Example:

```rust
fn process(value: i32) -> &'static str {
    match value {
        0 => "Zero",
        1 => "One",
        _ => "Other",
    }
}

fn main() {
    println!("{}", process(0));  // Output: Zero
    println!("{}", process(2));  // Output: Other
}
```

Just like in Python, the `match` statement in Rust matches the value against different patterns. The `_` pattern is a catch-all, ensuring that any unmatched values are handled.

### Key Differences:

- **Exhaustiveness**: Rust enforces that all possible cases are handled, either by explicitly listing them or using the wildcard pattern (`_`). This ensures that no cases are missed, enhancing code safety.
- **Compile-time Safety**: Rust’s pattern matching is checked at compile time, preventing runtime errors caused by missing cases.

### 3. Pattern Matching with Enums

One of the most powerful uses of pattern matching in Rust is with enums. Unlike Python’s enums, Rust enums can hold data, making pattern matching a crucial tool for handling the different variants.

#### Rust Enum and Pattern Matching Example:

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn process_message(msg: Message) {
    match msg {
        Message::Quit => println!("Quit"),
        Message::Move { x, y } => println!("Move to {}, {}", x, y),
        Message::Write(text) => println!("Text message: {}", text),
        Message::ChangeColor(r, g, b) => println!("Change color to {}, {}, {}", r, g, b),
    }
}

fn main() {
    let msg = Message::Move { x: 10, y: 20 };
    process_message(msg);
}
```

Here, the `match` statement destructures the enum variants, allowing you to access the data inside each variant and handle them accordingly.

### Key Differences:

- **Data in Enums**: Unlike Python’s enums, Rust enums can store data in each variant, which allows for more expressive pattern matching.
- **Pattern Destructuring**: Rust’s pattern matching allows you to destructure complex data types like enums, structs, and tuples directly in the `match` arm.

### 4. Matching on Structs and Tuples

Rust’s pattern matching can also be used to destructure structs and tuples, allowing you to easily access their fields and handle various cases based on their content.

#### Struct Pattern Matching Example:

```rust
struct Point {
    x: i32,
    y: i32,
}

fn print_point(point: Point) {
    match point {
        Point { x: 0, y } => println!("On the y-axis at {}", y),
        Point { x, y: 0 } => println!("On the x-axis at {}", x),
        Point { x, y } => println!("Point at ({}, {})", x, y),
    }
}

fn main() {
    let p = Point { x: 0, y: 5 };
    print_point(p);
}
```

In this example, Rust destructures the `Point` struct within the `match` arms to access its fields, allowing different behavior based on the values of `x` and `y`.

### Key Differences:

- **Destructuring**: Rust allows you to destructure structs, tuples, and other data types directly in pattern matching, making it easy to handle complex data structures.
- **Type Safety**: Rust ensures that the types being matched are correct at compile time, catching potential errors early.

### Tuple Pattern Matching Example:

```rust
fn print_coordinates(coords: (i32, i32)) {
    match coords {
        (0, y) => println!("On the y-axis at {}", y),
        (x, 0) => println!("On the x-axis at {}", x),
        (x, y) => println!("Coordinates: ({}, {})", x, y),
    }
}

fn main() {
    let coords = (0, 5);
    print_coordinates(coords);
}
```

This example demonstrates how Rust can match against tuples, extracting individual values and processing them accordingly.

### 5. Advanced Patterns in Rust

Rust’s pattern matching also supports more advanced patterns, including guards, binding variables in patterns, and ignoring parts of a pattern.

#### Pattern Guards

Pattern guards allow you to add conditions to patterns, giving you more control over how patterns are matched.

```rust
fn process_value(x: i32) {
    match x {
        n if n < 0 => println!("Negative number"),
        n if n == 0 => println!("Zero"),
        n if n > 0 => println!("Positive number"),
        _ => println!("No match"),
    }
}

fn main() {
    process_value(-5);  // Output: Negative number
    process_value(0);   // Output: Zero
    process_value(10);  // Output: Positive number
}
```

In this example, the `if` conditions in the `match` arms are used to control how the values are matched.

### Binding in Patterns

Rust allows you to bind parts of a pattern to variables so you can reference them in the `match` arm.

```rust
fn process_option(opt: Option<i32>) {
    match opt {
        Some(x) if x > 10 => println!("Got a big number: {}", x),
        Some(x) => println!("Got a number: {}", x),
        None => println!("Got nothing"),
    }
}

fn main() {
    process_option(Some(20));  // Output: Got a big number: 20
    process_option(Some(5));   // Output: Got a number: 5
    process_option(None);      // Output: Got nothing
}
```

In this case, `Some(x)` binds the value inside the `Option` to `x`, which can then be used within the arm.

### 6. Refutability and Exhaustiveness

Rust’s pattern matching enforces exhaustiveness, meaning that all possible cases must be handled in a `match` expression. This is checked at compile time, ensuring that there are no unhandled cases, which can lead to safer code.

#### Example of Exhaustive Matching:

```rust
fn process_number(n: i32) {
    match n {
        0 => println!("Zero"),
        1 => println!("One"),
        _ => println!("Other"),
    }
}
```

If you omit the `_` arm in this example, Rust will raise a compile-time error because not all cases are covered. This is different from Python, where unmatched cases will result in a runtime error.

### Conclusion

Pattern matching in Rust is one of the language’s most powerful features, allowing you to concisely and safely destructure complex data structures and handle multiple cases. While Python introduced structural pattern matching in Python 3.10, Rust’s system is more deeply integrated and versatile, offering advanced features like destructuring, pattern guards, and exhaustive checking.

In the next article, we’ll explore **Rust’s Memory Model** and compare it with Python’s garbage collection system, focusing on **Ownership and Borrowing**. Stay tuned!
