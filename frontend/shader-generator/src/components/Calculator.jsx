import { useState } from 'react';

function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const calculate = async () => {
    try {
      const wasm = await import('../wasm/calculator/pkg'); // Path to your WASM module
      
      if (wasm.default) {
        await wasm.default();
      }
      console.log('WASM module:', wasm);
      console.log('Expression:', expression);
      
      const output = wasm.calculate(expression);
      console.log('Calculation output:', output);
      setResult(output);
    } catch (error) {
      console.error('Calculation error:', error);
      setResult('Error in calculation');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Rust Calculator</h1>
      <input
        type="text"
        className="w-full p-2 mb-4 bg-gray-700 rounded text-white outline-none focus:ring-2 focus:ring-blue-500"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Enter expression (e.g., 2+2)"
      />
      <button
        onClick={calculate}
        className="w-full bg-blue-500 p-2 rounded text-white hover:bg-blue-600 transition"
      >
        Calculate
      </button>
      {result && (
        <div className="mt-4 text-lg font-semibold">
          <span className="text-gray-300">Result:</span> {result}
        </div>
      )}
    </div>
  );
}

export default Calculator;
