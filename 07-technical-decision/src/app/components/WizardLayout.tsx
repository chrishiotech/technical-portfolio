import { Outlet, useLocation } from "react-router";
import { CheckCircle2 } from "lucide-react";

export function WizardLayout() {
  const location = useLocation();
  
  const steps = [
    { path: "/", label: "Project Overview" },
    { path: "/technical", label: "Technical Requirements" },
    { path: "/business", label: "Business Goals" },
    { path: "/results", label: "Results" },
  ];

  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-2xl font-semibold text-[#1e3a8a]">
            Technical Decision Framework
          </h1>
          <p className="text-sm text-[#64748b] mt-1">
            Make informed architecture decisions for your project
          </p>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.path} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-medium transition-colors ${
                      index < currentStepIndex
                        ? "bg-[#1e3a8a] text-white"
                        : index === currentStepIndex
                        ? "bg-[#1e3a8a] text-white"
                        : "bg-slate-200 text-[#64748b]"
                    }`}
                  >
                    {index < currentStepIndex ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`ml-3 text-sm font-medium ${
                      index <= currentStepIndex
                        ? "text-[#1e3a8a]"
                        : "text-[#64748b]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      index < currentStepIndex
                        ? "bg-[#1e3a8a]"
                        : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <Outlet />
      </main>
    </div>
  );
}
