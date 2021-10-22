use js_sys::{Array, ArrayBuffer, Int32Array};
use wasm_bindgen::prelude::*;

// I can use module system from rust side
#[wasm_bindgen(js_name = testModule)]
pub fn test_module(x: i32) -> i32 {
    x + 3
}

//
// gets array from javascript
// should be passed as Int32Array like
//
// const array = new Int32Array(...);
// getSum(array);
//
#[wasm_bindgen(js_name = getSum)]
pub fn get_sum(arr: Int32Array) -> i32 {
    let arr = arr.to_vec();
    arr.iter().sum()
}

#[wasm_bindgen]
pub fn hi() {
    // let mut arr = js_sys::ArrayBuffer::new(10_u32);

    let a = web_sys::console::time_with_label("wasm");
    let mut arr = js_sys::Array::new();
    for i in 0..100000 {
        arr.push(&JsValue::from(10_i32));
    }
    let b = web_sys::console::time_end_with_label("wasm");

    // let greet = JsValue::from_str("Hello this is your first web assembly program");
    // web_sys::console::log_1(&greet);
    // web_sys::console::log_1(&JsValue::from_str("[wasm]: "));

    // making empty javascript array
    // js_sys::Array::new()
}
