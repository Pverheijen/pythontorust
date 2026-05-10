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