
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";

interface EmployeeResponseInputProps {
  onSubmit: (response: string) => Promise<void>;
  isProcessing: boolean;
  responseSubmitted: boolean;
}

export function EmployeeResponseInput({ 
  onSubmit, 
  isProcessing, 
  responseSubmitted 
}: EmployeeResponseInputProps) {
  const { currentEmployee } = useAuth();
  const [response, setResponse] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (response.trim() && !isProcessing && !responseSubmitted) {
      await onSubmit(response);
      setResponse("");
    }
  };
  
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="text-sm font-medium mb-1 block">
            Your Response
          </label>
          <Textarea
            placeholder="Type your response to the customer here..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            disabled={isProcessing || responseSubmitted}
            className="min-h-[120px]"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {responseSubmitted 
              ? "Response submitted. See feedback below."
              : "Respond as if you were speaking directly to the customer."
            }
          </div>
          
          <Button 
            type="submit" 
            disabled={!response.trim() || isProcessing || responseSubmitted}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Response
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
