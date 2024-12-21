import { useState } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/Resizable"
import { ShaderHistory } from "./ShaderHistory"
import { ShaderContent } from "./ShaderContent"


export default function ShaderGeneratorLayout() {
  const [history, setHistory] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(null)

  const handleNewGeneration = (entry) => {
    setHistory(prev => [entry, ...prev])
  }

  return (
    <div className="h-screen bg-[#343541] overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
          <ShaderHistory 
            history={history} 
            onSelectEntry={setSelectedEntry}
            selectedEntry={selectedEntry}
          />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-[#2A2B32] data-[panel-group-direction=vertical]:h-2" />
        <ResizablePanel defaultSize={75}>
          <ShaderContent 
            onGenerate={handleNewGeneration}
            selectedEntry={selectedEntry}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}




// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
// import { Button } from "./ui/Button";
// import { Input } from "./ui/Input";
// import { Alert, AlertDescription } from "./ui/Alert";

// const TextProcessor = () => {
//   const [description, setDescription] = useState('');
//   const [processedText, setProcessedText] = useState('');
//   const [shaderCode, setShaderCode] = useState(''); // New state for shader_code
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [rawResponse, setRawResponse] = useState('');
//   const [history, setHistory] = useState([]); // New state to track history

//   const generateTextOutput = async () => {
//     if (!description) {
//       setError('Please enter some description');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://localhost:4000/api/shader/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer 914dead1-36d9-4eaf-a1c9-367f55f470cb',
//         },
//         body: JSON.stringify({ description }),
//       });

//       const data = await response.json();
//       console.log("data", data);
//       setRawResponse(data.raw_response);
//       setProcessedText(data.processed_output);

//       // Assuming the response contains the shader_code
//       if (data.shader_code) {
//         setShaderCode(data.shader_code); // Store the shader_code
//       }

//       // Save to history
//       setHistory((prevHistory) => [
//         ...prevHistory,
//         { description, processedText: data.processed_output, shaderCode: data.shader_code, rawResponse: data.raw_response }
//       ]);
//     } catch (err) {
//       setError(`Failed to process text: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader>
//         <CardTitle>Text Processor</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="flex gap-4">
//           <Input
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Describe your text (e.g., 'Explain the process of photosynthesis')"
//             className="flex-1"
//           />
//           <Button 
//             onClick={generateTextOutput}
//             disabled={loading}
//           >
//             {loading ? 'Generating...' : 'Generate Output'}
//           </Button>
//         </div>

//         {error && (
//           <Alert variant="destructive">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}

//         {processedText && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-sm">Processed Text Output</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
//                 <code>{processedText}</code>
//               </pre>
//             </CardContent>
//           </Card>
//         )}

//         {shaderCode && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-sm">Answer</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
//                 <code>{shaderCode}</code> {/* Display the shader_code */}
//               </pre>
//             </CardContent>
//           </Card>
//         )}

//         {rawResponse && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-sm">Backend Response</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
//                 <code>{rawResponse}</code>
//               </pre>
//             </CardContent>
//           </Card>
//         )}

//         {/* History Section */}
//         {history.length > 0 && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-sm">History</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {history.map((entry, index) => (
//                   <div key={index} className="border-b border-slate-300 pb-4">
//                     <p className="font-medium text-sm">Description:</p>
//                     <p className="text-xs">{entry.description}</p>
//                     <p className="font-medium text-sm mt-2">Processed Text:</p>
//                     <pre className="bg-slate-100 p-2 rounded-lg overflow-x-auto text-xs">
//                       <code>{entry.processedText}</code>
//                     </pre>
//                     {entry.shaderCode && (
//                       <>
//                         <p className="font-medium text-sm mt-2">Shader Code:</p>
//                         <pre className="bg-slate-100 p-2 rounded-lg overflow-x-auto text-xs">
//                           <code>{entry.shaderCode}</code>
//                         </pre>
//                       </>
//                     )}
//                     {entry.rawResponse && (
//                       <>
//                         <p className="font-medium text-sm mt-2">Raw Response:</p>
//                         <pre className="bg-slate-100 p-2 rounded-lg overflow-x-auto text-xs">
//                           <code>{entry.rawResponse}</code>
//                         </pre>
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default TextProcessor;
