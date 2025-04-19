
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { TrainingProvider } from "@/contexts/TrainingContext";

const Index = () => {
  const navigate = useNavigate();

  // Redirect to login page
  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <AuthProvider>
      <TrainingProvider>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Retail Training Simulator</h1>
            <p className="text-xl text-gray-600">Loading application...</p>
          </div>
        </div>
      </TrainingProvider>
    </AuthProvider>
  );
};

export default Index;
