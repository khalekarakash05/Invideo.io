use wasm_bindgen::prelude::*;
use meval::Expr;
use web_sys::console; // Import the console module

#[wasm_bindgen]
pub fn calculate(expression: &str) -> String {
    console::log_1(&format!("Received expression: {}", expression).into());

    match expression.parse::<Expr>() {
        Ok(expr) => {
            match expr.eval() {
                Ok(result) => {
                    console::log_1(&format!("Evaluation result: {}", result).into());
                    result.to_string()
                }
                Err(_) => {
                    console::log_1(&"Evaluation failed".into());
                    "Evaluation Error".to_string()
                }
            }
        }
        Err(_) => {
            console::log_1(&"Parsing failed".into());
            "Invalid Expression".to_string()
        }
    }
}
