import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import ProgressSteps from "./ProgressSteps";

export function WizardLayout() {
  const location = useLocation();

  const steps = [
    { path: "/", label: "Project Overview" },
    { path: "/technical", label: "Technical Requirements" },
    { path: "/business", label: "Business Goals" },
    { path: "/results", label: "Results" },
  ];

  const currentStepIndex = steps.findIndex(
    (step) => step.path === location.pathname,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <Header />

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
      <ProgressSteps steps={steps} currentStepIndex={currentStepIndex} />

      {/* Main Content */}
      <main className="max-w-7xl px-2 py-6 flex-1 xl:mx-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
