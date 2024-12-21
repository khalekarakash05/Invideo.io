import { ScrollArea } from "./ui/Scroll-area"
import { Button } from "./ui/Button"


function formatTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return 'just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

export function ShaderHistory({ history, selectedEntry, onSelectEntry }) {
    return (
      <div className="h-screen border-r border-gray-600/50 bg-[#202123]">
        <div className="p-4 border-b border-gray-600/50">
          <h2 className="font-semibold text-gray-200">Generation History</h2>
        </div>
        <ScrollArea className="h-[calc(100vh-65px)]">
          <div className="flex flex-col gap-2 p-4">
            {history.map((entry) => (
              <Button
                key={entry.id}
                variant={selectedEntry?.id === entry.id ? "secondary" : "ghost"}
                className={`h-auto flex flex-col items-start gap-2 p-4 w-full rounded-lg transition-colors
                  ${selectedEntry?.id === entry.id 
                    ? 'bg-[#343541] text-gray-100 hover:bg-[#343541]' 
                    : 'text-gray-300 hover:bg-[#2A2B32]'}`}
                onClick={() => onSelectEntry(entry)}
              >
                <p className="text-sm font-medium line-clamp-2 text-left">
                  {entry.description}
                </p>
                <p className="text-xs text-gray-400">
                  {formatTimeAgo(entry.timestamp)}
                </p>
              </Button>
            ))}
            {history.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">
                No generation history yet
              </p>
            )}
          </div>
        </ScrollArea>
      </div>
    )
  }