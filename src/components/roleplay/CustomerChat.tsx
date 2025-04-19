
import { ScenarioStep } from "@/types";
import { User } from "lucide-react";

interface CustomerChatProps {
  step: ScenarioStep;
  customerResponse: string | null;
}

export function CustomerChat({ step, customerResponse }: CustomerChatProps) {
  return (
    <div className="space-y-4">
      {/* Initial customer prompt */}
      <div className="flex items-start gap-3">
        <div className="bg-primary text-primary-foreground rounded-full p-2 mt-1">
          <User className="h-5 w-5" />
        </div>
        <div className="bg-slate-100 rounded-lg p-4 max-w-[80%]">
          <p className="text-gray-900 font-medium mb-1">Customer</p>
          <p className="text-gray-800">{step.customerPrompt}</p>
        </div>
      </div>
      
      {/* Follow-up customer response if there is one */}
      {customerResponse && (
        <div className="flex items-start gap-3">
          <div className="bg-primary text-primary-foreground rounded-full p-2 mt-1">
            <User className="h-5 w-5" />
          </div>
          <div className="bg-slate-100 rounded-lg p-4 max-w-[80%]">
            <p className="text-gray-900 font-medium mb-1">Customer</p>
            <p className="text-gray-800">{customerResponse}</p>
          </div>
        </div>
      )}
    </div>
  );
}
