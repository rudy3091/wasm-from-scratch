extern crate console_error_panic_hook;

pub mod algo;

use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
pub fn add(x: i32, y: i32) -> i32 {
    x + y
}

#[wasm_bindgen(js_name = sumRandomArray)]
pub fn sum_random_array(array: js_sys::Int32Array) -> i32 {
    let mut sum = 0;
    array.for_each(&mut |x, _, _| { sum += x; });
    sum
}

#[wasm_bindgen(js_name = setArrayValue)]
pub fn set_array_value(array: js_sys::Int32Array) {
    unsafe {
        let n = 2;
        array.copy_from(&[2; 1_000_000]);
    };
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
