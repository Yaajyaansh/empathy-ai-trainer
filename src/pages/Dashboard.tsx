
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTraining } from "@/contexts/TrainingContext";
import { Header } from "@/components/layout/Header";
import { CategoryList } from "@/components/dashboard/CategoryList";
import { ScenarioCard } from "@/components/dashboard/ScenarioCard";
import { ProgressSummary } from "@/components/dashboard/ProgressSummary";
import { categories } from "@/data/mockData";
import { TrainingScenario } from "@/types";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { currentEmployee, isAuthenticated } = useAuth();
  const { availableScenarios, progress, currentScenario } = useTraining();
  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredScenarios, setFilteredScenarios] = useState<TrainingScenario[]>(availableScenarios);
  
  // If user starts a scenario, redirect to the training page
  useEffect(() => {
    if (currentScenario) {
      navigate("/training");
    }
  }, [currentScenario, navigate]);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  // Filter scenarios based on selected category
  useEffect(() => {
    if (selectedCategory) {
      setFilteredScenarios(availableScenarios.filter(scenario => scenario.category === selectedCategory));
    } else {
      setFilteredScenarios(availableScenarios);
    }
  }, [selectedCategory, availableScenarios]);
  
  // Calculate progress for each scenario
  const getScenarioProgress = (scenarioId: string) => {
    if (!currentEmployee) return 0;
    
    const scenarioProgress = progress.find(
      p => p.employeeId === currentEmployee.id && p.scenarioId === scenarioId
    );
    
    if (!scenarioProgress) return 0;
    
    return scenarioProgress.totalSteps > 0 
      ? scenarioProgress.completedSteps / scenarioProgress.totalSteps 
      : 0;
  };
  
  if (!isAuthenticated || !currentEmployee) {
    return null; // Will redirect to login
  }
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <ProgressSummary />
            
            <div className="mt-8">
              <CategoryList 
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Training Modules</h2>
              {selectedCategory ? (
                <p className="text-muted-foreground">
                  {categories.find(c => c.id === selectedCategory)?.name || 'Selected Category'}
                </p>
              ) : (
                <p className="text-muted-foreground">
                  All available training modules
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredScenarios.length > 0 ? (
                filteredScenarios.map(scenario => (
                  <ScenarioCard 
                    key={scenario.id} 
                    scenario={scenario} 
                    progress={getScenarioProgress(scenario.id)}
                  />
                ))
              ) : (
                <div className="col-span-full bg-white border rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">
                    No training modules available for this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
