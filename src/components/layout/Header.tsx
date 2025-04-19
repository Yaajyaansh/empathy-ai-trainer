
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart3, LogOut, User } from "lucide-react";

export function Header() {
  const { currentEmployee, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          <h1 className="text-xl font-bold">
            Retail Training Simulator
          </h1>
        </div>
        
        {isAuthenticated && currentEmployee && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary-foreground/10 rounded-full p-1">
                <User className="h-5 w-5" />
              </div>
              <span className="font-medium">{currentEmployee.name}</span>
              <span className="text-sm text-primary-foreground/80">({currentEmployee.role})</span>
            </div>
            <Button 
              variant="ghost"
              size="sm"
              className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
