import { CheckCircle2 } from "lucide-react";
import React from "react";

type ProgressStepsProps = {
  steps: {
    path: string;
    label: string;
  }[];
  currentStepIndex: number;
};

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStepIndex,
}) => {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
        {/* Mobile: Vertical Layout */}
        <div className="flex flex-col sm:hidden space-y-3">
          {steps.map((step, index) => (
            <div key={step.path} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full font-medium transition-colors flex-shrink-0 ${
                  index < currentStepIndex
                    ? "bg-[#1e3a8a] text-white"
                    : index === currentStepIndex
                      ? "bg-[#1e3a8a] text-white"
                      : "bg-slate-200 text-[#64748b]"
                }`}
              >
                {index < currentStepIndex ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
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
          ))}
        </div>

        {/* Desktop: Horizontal Layout */}
        <div className="hidden sm:flex items-center justify-between">
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
                    index < currentStepIndex ? "bg-[#1e3a8a]" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
