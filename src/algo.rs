use std::io::{self, BufRead};
use std::collections::VecDeque;
use js_sys::{Int32Array, Uint8Array};
use wasm_bindgen::prelude::*;
use web_sys::console;

const WIDTH: usize = 100;
const HEIGHT: usize = 100;

static mut VISITED: [i32; 1000000] = [1; 1000000];
static mut GRAPH: [[i32; 1001]; 1001] = [[0; 1001]; 1001];

fn input() -> Vec<Vec<i32>> {
    let stdin = io::stdin();
    stdin
        .lock()
        .lines()
        .map(|l| {
            l.unwrap()
                .split_whitespace()
                .map(|x| x.parse().unwrap())
                .collect::<Vec<i32>>()
        })
        .collect::<Vec<Vec<i32>>>()
}

unsafe fn dfs(n: usize, node: usize) {
    console::log_1(&JsValue::from(node));
    VISITED[node] = 1;
    for i in 1..=n {
        if VISITED[i] == 0 && GRAPH[node][i] != 0 {
            dfs(n, i);
        }
    }
}

unsafe fn bfs(n: usize, node: usize) {
    let mut queue = VecDeque::new();
    VISITED[node] = 1;
    queue.push_back(node);

    while queue.len() != 0 {
        if let Some(next) = queue.pop_front() {
            console::log_1(&JsValue::from(next));

            for i in 1..=n {
                if VISITED[i] == 0 && GRAPH[next][i] != 0 {
                    queue.push_back(i);
                    VISITED[i] = 1;
                }
            }
        }
    }
}

#[wasm_bindgen(js_name = makeArray)]
pub fn make_array(arr: Int32Array) {
    unsafe {
        arr.copy_from(&[1_i32; 1000000]);
    }
}

#[wasm_bindgen(js_name = makeUint8array)]
pub fn make_uint8_array(arr: Uint8Array) {
    unsafe {
        arr.copy_from(&[1_u8; 1000000]);
    }
}

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

// fn main() {
//     let edges = input();
//     let (n, v) = (edges[0][0], edges[0][2]);
//     unsafe { GRAPH = [[0; 1001]; 1001]; }

//     for edge in edges.into_iter().skip(1) {
//         let x = edge[0] as usize;
//         let y = edge[1] as usize;
//         unsafe {
//             GRAPH[x][y] = 1;
//             GRAPH[y][x] = 1;
//         }
//     }

//     unsafe {
//         dfs(n as usize, v as usize);
//         println!("");
//         VISITED = [0; 100001];
//         bfs(n as usize, v as usize);
//         println!("");
//     }
// }
