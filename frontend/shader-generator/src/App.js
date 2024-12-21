// import logo from './logo.svg';
import './App.css';
import ShaderGenerator from './components/ShaderGenerator';
import { useState } from 'react';
import Calculator from './components/Calculator';

function App() {
  const [activeTab, setActiveTab] = useState('calculator'); // 'calculator' or 'shader'

  return (
    <div className="App min-h-screen bg-gray-900 text-white">
      {/* Tab Buttons */}
      <div className="flex justify-center space-x-4 p-4 bg-gray-800">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'calculator'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setActiveTab('calculator')}
        >
          Calculator
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'shader'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setActiveTab('shader')}
        >
          Shader
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'calculator' ? <Calculator /> : <ShaderGenerator />}
      </div>
    </div>
  );
}

export default App;
