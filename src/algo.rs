use js_sys::{Array, Int32Array};
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
