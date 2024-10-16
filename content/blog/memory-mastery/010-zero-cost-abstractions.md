---
title: "001 - Learning Rust as a Pythonista: Zero-Cost Abstractions"
authors: ["Peter Verheijen"]
date: 2024-10-15
description: "Understanding Rust's zero-cost abstractions compared to Python's abstractions."
tags: [Rust, Python, abstractions, performance]
template: "page.html"
---

## Memory Mastery: Zero-Cost Abstractions

When coming from Python, one of the key differentiators you’ll notice in Rust is its focus on **zero-cost abstractions**. This concept is central to Rust's performance and memory safety guarantees. While Python offers many abstractions that prioritize ease of use and flexibility, these often come with a runtime cost. In Rust, the philosophy of zero-cost abstractions ensures that abstractions don't add overhead at runtime, meaning you can write high-level code without sacrificing performance.

In this post, we’ll dive into what zero-cost abstractions mean in Rust and compare them to some familiar Python abstractions, demonstrating where the performance gains lie.

### What Are Zero-Cost Abstractions?

A **zero-cost abstraction** is one where the abstraction itself does not introduce any additional runtime cost beyond what an equivalent hand-written lower-level code would. This means that Rust's high-level constructs like iterators, closures, and pattern matching are as efficient as if you'd written the low-level code manually.

In Python, abstractions like generators, comprehensions, or higher-order functions are often easy to write and read but may have performance costs, such as additional function calls or memory allocation. Rust’s zero-cost philosophy ensures that similar abstractions incur no such overhead.

### Iterators: Zero-Cost in Rust versus Python

**Rust Learning**: Iterator trait \
**Python Concept**: ``` for ``` loops, generators, comprehensions

Python's iterators, especially generator expressions, are powerful tools that allow you to lazily evaluate data. However, generators introduce a layer of abstraction that carries some overhead, particularly with memory and performance due to Python’s interpreted nature.

In Rust, iterators are built with the concept of zero-cost abstractions in mind. Rust’s iterator chains (like ``` map() ```, ``` filter() ```, and ``` collect() ```) don’t allocate intermediate structures. Instead, Rust leverages **compile-time optimization** to eliminate any unnecessary intermediate steps, so iterator chains are as efficient as writing loops by hand.

#### Example: Python versus Rust Iterator

**Python (Generator Expression):**

```python 
nums = range(10)
squared = (x ** 2 for x in nums if x % 2 == 0)
result = list(squared) 
```

- **Abstraction cost**: In Python, the generator expression creates an intermediate object, and the ``` list() ``` function fully consumes it, triggering the computation. There’s an additional cost with the creation and iteration of the generator.

**Rust:**

```rust let nums = 0..10;
let result: Vec<_> = nums
.filter(|x| x % 2 == 0)
.map(|x| x * x)
.collect();
```

- **Zero-cost**: Rust’s iterator chain is optimized at compile time. No intermediate collections are created, and the final result is computed with no overhead. Rust compiles the iterator chain down to simple loops without allocation.

### What About Python’s List Comprehensions?

You might wonder whether Python’s list comprehensions can eliminate some of the overhead found in generator expressions. List comprehensions are indeed more efficient because they avoid the lazy evaluation of generators and immediately create the list in memory. However, there are still key differences in overhead when compared to Rust’s iterators:

**Memory Allocation**:
* In Python, a list comprehension allocates memory for the entire list upfront. This can be efficient for small datasets but may lead to excessive memory usage when handling large data.
* In contrast, Rust’s iterator chains don’t allocate intermediate collections. The final result is only materialized when necessary, making Rust's approach more memory-efficient.

**Function Call Overhead**:
* Python’s list comprehensions are fast and concise, but Python’s dynamic typing and interpreted nature mean function calls are still more expensive than in Rust. 
* Rust eliminates unnecessary function calls by optimizing iterators at compile time, effectively reducing them to a simple loop with no additional cost. 

**Python (List Comprehension):**

```python
nums = range(10)
squared = [x ** 2 for x in nums if x % 2 == 0]
```

- **Pros**: Python’s list comprehension is faster than generators as it avoids the lazy evaluation overhead and creates the list immediately in memory.
- **Abstraction cost**: While more efficient than a generator, it still requires allocating the full list in memory, which can become costly with large datasets.

**Rust (Iterator):**

```rust
let nums = 0..10;
let result: Vec<_> = nums
.filter(|x| x % 2 == 0)
.map(|x| x * x)
.collect(); 
```

- **Zero-cost**: Rust’s iterators don’t allocate any intermediate collections and are compiled into the most efficient form possible. Rust achieves zero overhead with iterators, making it especially suitable for large datasets or performance-critical code.

### Closures: Efficient Capture in Rust

**Rust Learning**: Closures and capture modes \
**Python Concept**: Lambda functions

In Python, lambda functions provide a convenient way to create small, anonymous functions. However, Python lambdas are dynamically typed, and capturing variables from the enclosing scope adds runtime cost, particularly if you're frequently using closures in performance-critical paths.

In Rust, closures can **capture variables by value, reference, or mutable reference**, and Rust can often optimize these captures at compile time. The closure’s behavior is statically analyzed, ensuring no unnecessary allocations or performance hits.

#### Example: Python versus Rust Closure

**Python:**

```python def make_closure():
x = 10
return lambda y: x + y

closure = make_closure()
print(closure(5)) # Output: 15
```

- **Abstraction cost**: In Python, the lambda function dynamically captures ``` x ``` from the enclosing scope, adding an extra lookup at runtime.

**Rust:**

```rust
fn make_closure() -> impl Fn(i32) -> i32 {
    let x = 10;
    move |y| x + y
}

let closure = make_closure();
println!("{}", closure(5)); // Output: 15 
```

- **Zero-cost**: In Rust, the ``` move ``` keyword ensures that ``` x ``` is captured by value, and since the closure is statically typed, Rust can optimize the closure at compile time, eliminating any runtime cost for capturing ``` x ```.

### Zero-Cost Trait Bounds versus Python’s Duck Typing

**Rust Learning**: Traits with zero-cost abstraction \
**Python Concept**: Duck typing and ``` iter ``` method

In Python, duck typing allows you to use objects based on their behavior rather than their type, which is flexible but can lead to runtime errors or inefficiencies. Rust, by contrast, uses traits to ensure type safety at compile time, while still achieving the same flexibility through polymorphism.

Rust’s trait system is a zero-cost abstraction, meaning that trait bounds don’t incur any runtime overhead. This allows Rust to provide both flexibility and performance.

#### Example: Python versus Rust Trait

**Python:**

```python
def print_iterable(items):
    for item in items:
    print(item)

print_iterable([1, 2, 3]) 
```

- **Abstraction cost**: Python’s ``` for ``` loop checks at runtime if ``` items ``` is iterable using duck typing. This flexibility introduces some runtime overhead.

**Rust:**

```rust
fn print_iterable<T: IntoIterator>(items: T) {
    for item in items {
        println!("{}", item);
    }
}

print_iterable(vec![1, 2, 3]); 
```

- **Zero-cost**: In Rust, the trait bound ``` T: IntoIterator ``` is checked at compile time. Rust ensures that only types that implement ``` IntoIterator ``` can be used, with no overhead at runtime.

### Understanding the IntoIterator Trait in Rust

In Rust, iterators are an essential part of working with collections, and the IntoIterator trait is a key component of how Rust handles iteration over various types of collections and data structures.

The IntoIterator trait is a core abstraction in Rust that allows types to be converted into an iterator. It defines a method, ```into_iter()```, that transforms a collection or type into an iterator, which can then be used with loops or iterator combinators like ``` map() ``` and ``filter``().

**Compile-Time Guarantees**:
One of the primary advantages of Rust’s IntoIterator trait is that it enforces type safety at compile time. When you write a function that accepts any type that implements IntoIterator, Rust ensures that the type passed to that function has implemented the trait correctly, meaning the type can be converted into an iterator.

This compile-time check prevents errors related to type mismatches or missing iterator implementations, which would only be caught at runtime in a dynamically-typed language like Python. In Python, if you mistakenly pass an object that is not iterable to a ```for``` loop, it will only fail when the code is executed.

**Example of IntoIterator in Action**:

Here's how IntoIterator works in practice:

```rust
fn print_iterable<T: IntoIterator>(items: T) {
    for item in items {
        println!("{}", item);
    }
}

let numbers = vec![1, 2, 3];
print_iterable(numbers); // Works because Vec implements IntoIterator
```

In this example:

- The generic type ```T``` is bound by the IntoIterator trait, meaning that whatever type is passed into the ```print_iterable()``` function must implement the IntoIterator trait. 
- The Vec type (i.e., vectors in Rust) implements IntoIterator, so when you pass a vector to ```print_iterable()```, it can be converted into an iterator and looped over. 
-  You could pass other collection types that also implement IntoIterator, such as arrays, strings, or hash maps.

**Differences from Python**:
In Python, iteration works through "duck typing"—Python objects are considered iterable if they implement the ```iter``` method. However, Python does not check this at compile time; it will only raise an error at runtime if the object is not iterable. Rust, by contrast, ensures that only objects that explicitly implement IntoIterator can be used in functions requiring iteration, preventing runtime errors and ensuring greater robustness.

In Rust, the safety and performance benefits of the IntoIterator trait mean that:

- The type conversion to an iterator happens at compile time, leading to faster execution since there's no need for runtime checks. 
- Rust can optimize the iteration internally, making it as efficient as possible.

By using traits like IntoIterator, Rust provides strong guarantees that your code will work with iterators in a safe and performant manner, with zero overhead for using these abstractions compared to lower-level code.

### Conclusion

Rust’s zero-cost abstractions allow you to write high-level, expressive code while retaining performance that rivals hand-written, low-level code. For Python developers, this concept may be unfamiliar but is one of the reasons why Rust is chosen for performance-critical applications.

Whether you're dealing with iterators, closures, or trait bounds, Rust ensures that these abstractions come with no hidden costs. By embracing these principles, you can write elegant Rust code that runs as fast as possible, giving you the best of both worlds: abstraction and performance.

### Running the complete Rust example
```rust
fn main() {
    // Iterator Example: Filtering and Mapping Numbers
    let nums = 0..10;
    let result: Vec<_> = nums
        .filter(|x| x % 2 == 0)
        .map(|x| x * x)
        .collect();
    println!("Squared even numbers: {:?}", result);

    // Closure Example: Adding a Value Using a Closure
    let closure = make_closure();
    println!("Closure result: {}", closure(5));

    // IntoIterator Example: Printing Elements of a Vector
    let numbers = vec![1, 2, 3];
    print_iterable(numbers);
}

// Function to create a closure that captures a value and adds to it
fn make_closure() -> impl Fn(i32) -> i32 {
    let x = 10;
    move |y| x + y
}

// Generic function that works with any type implementing IntoIterator
fn print_iterable<T: IntoIterator>(items: T) {
    for item in items {
        println!("{}", item);
    }
}
```