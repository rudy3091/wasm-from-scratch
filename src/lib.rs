extern crate console_error_panic_hook;

pub mod algo;

use wasm_bindgen::prelude::*;
use web_sys::console;

pub fn make_cell(idx: i32) -> web_sys::Element {
    let window = web_sys::window().unwrap();
    let document = window.document().unwrap();

    // create the element we're gonna append
    let val = document.create_element("div").unwrap();
    val.set_class_name("cell");
    val.set_attribute("data-cell-idx", &idx.to_string()).unwrap();
    val
}

#[wasm_bindgen(js_name = makeRow)]
pub fn make_row(idx: i32, n: i32) -> web_sys::Element {
    let window = web_sys::window().unwrap();
    let document = window.document().unwrap();
    let row = document.create_element("div").unwrap();
    row.set_class_name("row");
    row.set_attribute("data-row-idx", &idx.to_string()).unwrap();
    for i in 0..n {
        row.append_child(&make_cell(i)).unwrap();
    }
    row
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
