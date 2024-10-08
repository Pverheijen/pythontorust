---
title: "005 - Iterators and Closures"
authors: ["Peter Verheijen"]
date: 2024-10-08
description: "Iterators and Closures"
tags: [Rust, Python]
draft: false
---

# Learning Rust as a Pythonista: Iterators and Closures

In this article, we’ll explore **Iterators** and **Closures** in Rust and compare them to Python’s **generators** and **lambda functions**. While both languages offer ways to work with lazily evaluated data and anonymous functions, Rust’s iterator and closure mechanisms provide more control, efficiency, and safety.

## 1. Iterators in Python

In Python, iterators are objects that can be iterated (looped) over, such as lists, dictionaries, or ranges. You can create custom iterators using generators, which lazily yield values on demand.

### Python Generators:

Generators in Python are defined with the `yield` keyword and can be used to lazily produce a sequence of values:

```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for num in countdown(5):
    print(num)
```

### Key Points in Python:

- **Generators**: Python uses generators to create iterators. Generators are functions that yield values lazily, only when needed.
- **Built-in Iterators**: Python also provides built-in iterators like `range()`, `enumerate()`, and `zip()`, which generate values on demand.

### 2. Iterators in Rust

In Rust, iterators are a core feature of the language, with many iterator methods provided by the standard library. Iterators in Rust are lazy by default, meaning they only compute values when they are needed, much like Python generators.

#### Simple Rust Iterator:

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    for num in numbers.iter() {
        println!("{}", num);
    }
}
```
### Creating a Custom Iterator in Rust:

In Rust, you can also implement your own iterator by defining the `Iterator` trait:

```rust
struct Countdown {
    count: i32,
}

impl Iterator for Countdown {
    type Item = i32;

    fn next(&mut self) -> Option<Self::Item> {
        if self.count > 0 {
            self.count -= 1;
            Some(self.count + 1)
        } else {
            None
        }
    }
}

fn main() {
    let countdown = Countdown { count: 5 };
    for num in countdown {
        println!("{}", num);
    }
}
```

### Key Differences:

- **Traits**: Rust iterators are based on the `Iterator` trait, which requires implementing the `next` method. This makes iterators in Rust more powerful and flexible than Python’s generators.
- **Lazy Evaluation**: Like Python, Rust iterators are lazy, meaning they don’t compute their values until explicitly consumed (e.g., in a loop or a method like `.collect()`).
- **Method Chaining**: Rust’s iterators are composable through methods like `.map()`, `.filter()`, and `.collect()`, which are evaluated lazily, similar to Python’s generator expressions.

### 3. Iterator Adaptors

Rust provides a rich set of iterator adaptors, which are methods that allow you to transform iterators into new iterators. These can be used to apply operations like filtering, mapping, or summing over elements without needing to manually write loops.

#### Rust Iterator Adaptor Example:

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let squared: Vec<i32> = numbers.iter().map(|x| x * x).collect();
    println!("{:?}", squared);
}
```

In this example, the `.map()` method transforms each value, and `.collect()` turns the iterator into a `Vec`.

### Python Equivalent:

In Python, you might use a list comprehension to achieve a similar result:

```python
numbers = [1, 2, 3, 4, 5]
squared = [x * x for x in numbers]
print(squared)
```

### Key Differences:

- **Method Chaining**: Rust’s iterator adaptors allow method chaining, which makes it easier to perform complex transformations on iterators. Python also supports method chaining but tends to use list comprehensions or generator expressions for similar operations.
- **Immutable Iterators**: Rust iterators are immutable by default, promoting safe concurrency and preventing unexpected mutations.

### 4. Closures in Python

In Python, closures are functions defined within another function that capture variables from their enclosing scope. Python also supports lambda functions, which are anonymous, single-expression functions.

#### Python Closure Example:

```python
def outer(x):
    def inner(y):
        return x + y
    return inner

closure = outer(10)
print(closure(5))  # Output: 15
```

### Python Lambda Example:

```python
add = lambda x, y: x + y
print(add(5, 3))  # Output: 8
```

### Key Points in Python:

- **Closures**: Python closures capture variables from the outer scope.
- **Lambda Functions**: Python lambdas are limited to a single expression and are often used for small, anonymous functions.

### 5. Closures in Rust

Rust also supports closures, which are anonymous functions that can capture values from their environment. Closures in Rust are more flexible than Python's lambdas and can capture variables by value, reference, or mutable reference, depending on the situation.

#### Rust Closure Example:

```rust
fn main() {
    let x = 10;
    let add = |y| x + y;
    println!("{}", add(5));  // Output: 15
}
```

In this example, the closure captures `x` from its environment. Closures in Rust automatically infer whether to borrow or move captured variables based on how they are used.

### Rust Closure with Mutable Captures:

```rust
fn main() {
    let mut x = 10;
    let mut add = |y| {
        x += y;
        x
    };
    println!("{}", add(5));  // Output: 15
    println!("{}", x);       // Output: 15
}
```

In this example, the closure captures `x` mutably, allowing it to modify the value.

### Key Differences:

- **Capture Modes**: Rust closures can capture variables by value, reference, or mutable reference. This allows for more fine-grained control over variable ownership and borrowing, making closures in Rust more versatile than Python’s lambdas.
- **Type Inference**: Rust closures can infer their argument types and return types, though you can also explicitly define them if needed.

### 6. Closures as Function Parameters

In Rust, closures are commonly passed as function parameters. This is a key feature that allows Rust to use closures in many iterator adaptors like `map`, `filter`, and `for_each`.

#### Rust Closure as Parameter Example:

```rust
fn apply<F>(f: F) 
where F: Fn(i32) -> i32 {
    let result = f(10);
    println!("{}", result);
}

fn main() {
    let closure = |x| x + 5;
    apply(closure);  // Output: 15
}
```

In this example, `apply` takes a closure that conforms to the `Fn` trait, applies it to the value 10, and prints the result.

### Python Equivalent:

```python
def apply(func):
    result = func(10)
    print(result)

apply(lambda x: x + 5)  # Output: 15
```

### Key Differences:

- **Function Traits**: In Rust, closures implement one or more function traits (`Fn`, `FnMut`, or `FnOnce`), depending on how they capture variables. This adds flexibility in how closures are used, allowing you to choose whether closures can modify their environment.
- **Ownership and Borrowing**: Rust closures follow the rules of ownership and borrowing, allowing them to capture and mutate variables with strict control over memory safety.

### Conclusion

Rust's iterators and closures provide more control and type safety than Python’s generators and lambda functions. While Python’s approach is more dynamic and flexible, Rust’s stricter memory management and trait-based system offer more powerful guarantees, especially when working with complex data transformations or performance-critical code.

In the next article, we’ll dive into Rust’s **Traits** and compare them to Python’s **Duck Typing** and **Protocols**. Stay tuned!

### Running the Complete Rust Example

```rust
fn main() {
    println!("1. Simple Iterator:");
    simple_iterator();

    println!("\n2. Custom Iterator:");
    custom_iterator();

    println!("\n3. Iterator Adaptor:");
    iterator_adaptor();

    println!("\n4. Simple Closure:");
    simple_closure();

    println!("\n5. Mutable Closure:");
    mutable_closure();

    println!("\n6. Closure as Function Parameter:");
    closure_as_parameter();
}

fn simple_iterator() {
    let numbers = vec![1, 2, 3, 4, 5];
    for num in numbers.iter() {
        println!("{}", num);
    }
}

struct Countdown {
    count: i32,
}

impl Iterator for Countdown {
    type Item = i32;

    fn next(&mut self) -> Option<Self::Item> {
        if self.count > 0 {
            self.count -= 1;
            Some(self.count + 1)
        } else {
            None
        }
    }
}

fn custom_iterator() {
    let countdown = Countdown { count: 5 };
    for num in countdown {
        println!("{}", num);
    }
}

fn iterator_adaptor() {
    let numbers = vec![1, 2, 3, 4, 5];
    let squared: Vec<i32> = numbers.iter().map(|x| x * x).collect();
    println!("{:?}", squared);
}

fn simple_closure() {
    let x = 10;
    let add = |y| x + y;
    println!("{}", add(5));  // Output: 15
}

fn mutable_closure() {
    let mut x = 10;
    let mut add = |y| {
        x += y;
        x
    };
    println!("{}", add(5));  // Output: 15
    println!("{}", x);       // Output: 15
}

fn apply<F>(f: F) 
where F: Fn(i32) -> i32 {
    let result = f(10);
    println!("{}", result);
}

fn closure_as_parameter() {
    let closure = |x| x + 5;
    apply(closure);  // Output: 15
}
```