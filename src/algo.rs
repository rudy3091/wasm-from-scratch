use std::collections::VecDeque;

use wasm_bindgen::prelude::*;

const WIDTH: usize = 100;
const HEIGHT: usize = 100;

const MOVES: [(i32, i32); 4] = [(1, 0), (0, 1), (-1, 0), (0, -1)];

static mut VISITED: [u8; WIDTH * HEIGHT + 1] = [0; WIDTH * HEIGHT + 1];

fn get_index(x: i32, y: i32) -> usize {
    (y + x * WIDTH as i32) as usize
}

unsafe fn search(
    ix: i32,
    iy: i32,
    array: &[u8; WIDTH * HEIGHT],
) {
    let mut queue = VecDeque::new();
    VISITED[get_index(ix, iy)] = 1_u8;
    queue.push_back((ix, iy));

    while queue.len() != 0 {
        if let Some((x, y)) = queue.pop_front() {
            web_sys::console::log_2(&JsValue::from(x), &JsValue::from(y));

            for (dx, dy) in MOVES {
                let nx = x + dx;
                let ny = y + dy;
                if nx < 0 || ny < 0 { continue; }

                let next = get_index(nx, ny);
                let in_boundary = 0 < next && next < WIDTH * HEIGHT;
                if in_boundary && VISITED[next] == 0 && array[next] != 1 {
                    queue.push_back((nx, ny));
                    VISITED[next] = 1_u8;
                }
            }
        }
    }
}

unsafe fn _dfs(
    x: i32,
    y: i32,
    array: &[u8; WIDTH * HEIGHT],
    path: &Vec<(usize, usize)>
) {
    if x as usize == WIDTH - 1 && y as usize == HEIGHT - 1 {
        return
    }

    web_sys::console::log_2(&JsValue::from(x), &JsValue::from(y));
    VISITED[get_index(x as i32, y as i32)] = 1_u8;

    for (dx, dy) in MOVES {
        let nx = x + dx;
        let ny = y + dy;

        let next = get_index(nx, ny);
        let in_boundary = 0 < next && next < WIDTH * HEIGHT;
        if in_boundary && VISITED[next] == 0 && array[next] != 1 {
            _dfs(x + dx, y + dy, array, path);
        }
    }
}

#[wasm_bindgen(js_name = findPath)]
pub fn find_path(pixel_map: js_sys::Uint8Array) {
    let mut arr = [0_u8; WIDTH * HEIGHT];
    pixel_map.copy_to(&mut arr);
    unsafe { search(0, 0, &arr); }
}
