extern crate console_error_panic_hook;

pub mod algo;

use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
pub fn add(x: i32, y: i32) -> i32 {
    x + y
}

#[wasm_bindgen(js_name = sumArray)]
pub fn sum_array() -> f64 {
    let mut v: Vec<f64> = Vec::with_capacity(100);
    for _ in 0..v.capacity() {
        let x = js_sys::Math::random() * 10.;
        v.push(x);
    }

    v.iter().sum()
}

// This is like the `main` function, except for JavaScript.
#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    let greet = JsValue::from_str("Hello this is your first web assembly program");
    console::log_1(&greet);

    Ok(())
}
