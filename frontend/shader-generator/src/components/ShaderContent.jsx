import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Alert, AlertDescription } from "./ui/Alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs"
import { ScrollArea } from "./ui/Scroll-area"
import { Loader2 } from 'lucide-react'


export function ShaderContent({ onGenerate, selectedEntry }) {
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [currentResponse, setCurrentResponse] = useState(null)
  
    const generateShader = async () => {
      if (!description) {
        setError("Please enter a description")
        return
      }
  
      setLoading(true)
      setError(null)
  
      try {
        const response = await fetch("http://localhost:4000/api/shader/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 914dead1-36d9-4eaf-a1c9-367f55f470cb",
          },
          body: JSON.stringify({ description }),
        })
  
        const data = await response.json()
        console.log("Response data:", data)
        
        setCurrentResponse(data)
        
        const newEntry = {
          id: crypto.randomUUID(),
          description,
          processedText: data.processed_output || "No processed output",
          shaderCode: data.shader_code || "No shader code generated",
          rawResponse: JSON.stringify(data, null, 2),
          timestamp: Date.now(),
        }
  
        onGenerate(newEntry)
        setDescription("")
      } catch (err) {
        console.error("Generation error:", err)
        setError(`Failed to generate shader: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }
  
    const displayData = currentResponse && !selectedEntry ? {
      processedText: currentResponse.processed_output || "No processed output",
      shaderCode: currentResponse.shader_code || "No shader code generated",
      rawResponse: JSON.stringify(currentResponse, null, 2)
    } : selectedEntry
  
    return (
      <div className="h-screen flex flex-col bg-[#343541]">
        <div className="border-b border-gray-600/50">
          <div className="max-w-3xl mx-auto py-4 px-4 md:px-8">
            <div className="flex gap-4">
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the message you want to generate..."
                className="flex-1 bg-[#40414F] border-0 focus-visible:ring-1 focus-visible:ring-gray-400/50 text-gray-900 placeholder:text-gray-400"
              />
              <Button 
                onClick={generateShader} 
                disabled={loading}
                className="bg-[#40414F] hover:bg-[#4A4B59] text-gray-100"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4 bg-red-900/50 border-red-600/50">
                <AlertDescription className="text-red-200">{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
  
        <ScrollArea className="flex-1 h-[calc(100vh-80px)]">
          <div className="max-w-3xl mx-auto p-4">
            {displayData && (
              <Tabs defaultValue="shader" className="w-full">
                <TabsList className="w-full grid grid-cols-3 bg-[#40414F] p-1 rounded-lg mb-4">
                  <TabsTrigger 
                    value="shader"
                    className="data-[state=active]:bg-[#343541] data-[state=active]:text-gray-100 text-gray-400"
                  >
                     Answer
                  </TabsTrigger>
                  {/* <TabsTrigger 
                    value="processed"
                    className="data-[state=active]:bg-[#343541] data-[state=active]:text-gray-100 text-gray-400"
                  >
                    Processed Output
                  </TabsTrigger>
                  <TabsTrigger 
                    value="raw"
                    className="data-[state=active]:bg-[#343541] data-[state=active]:text-gray-100 text-gray-400"
                  >
                    Raw Response
                  </TabsTrigger> */}
                </TabsList>
                <TabsContent value="shader">
                  <Card className="bg-[#40414F] border-gray-600/50">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-200">Generated Shader Code</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="rounded-lg bg-muted p-4 text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap break-words">
                        <code>{displayData.shaderCode}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* <TabsContent value="processed">
                  <Card className="bg-[#40414F] border-gray-600/50">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-200">Processed Output</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="rounded-lg bg-muted p-4 text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap break-words">
                        <code>{displayData.processedText}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="raw">
                  <Card className="bg-[#40414F] border-gray-600/50">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-200">Raw Response</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="rounded-lg bg-muted p-4 text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap break-words">
                        <code>{displayData.rawResponse}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent> */}
              </Tabs>
            )}
            {!displayData && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-400">
                  Enter a description and generate a shader to see the results
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    )
  }
  
  
  

