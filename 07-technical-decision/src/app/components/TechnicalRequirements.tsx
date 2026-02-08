import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { wizardStore } from "../store";

export function TechnicalRequirements() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(wizardStore.getData());

  useEffect(() => {
    const unsubscribe = wizardStore.subscribe(() => {
      setFormData(wizardStore.getData());
    });
    return unsubscribe;
  }, []);

  const handleNext = () => {
    wizardStore.setData(formData);
    navigate("/business");
  };

  const handleBack = () => {
    wizardStore.setData(formData);
    navigate("/");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-[#1e3a8a] mb-2">
          Technical Requirements
        </h2>
        <p className="text-[#64748b]">
          Rate the importance of these technical factors for your project
        </p>
      </div>

      <div className="space-y-10 max-w-2xl">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-[#1e3a8a] font-medium">
              Scalability Needs
            </Label>
            <span className="text-sm font-medium text-[#1e3a8a] bg-slate-100 px-3 py-1 rounded-full">
              {formData.scalability}%
            </span>
          </div>
          <Slider
            value={[formData.scalability]}
            onValueChange={(value) => setFormData({ ...formData, scalability: value[0] })}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-[#1e3a8a] [&_[role=slider]]:border-[#1e3a8a]"
          />
          <div className="flex justify-between text-xs text-[#64748b]">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-[#1e3a8a] font-medium">
              Performance Requirements
            </Label>
            <span className="text-sm font-medium text-[#1e3a8a] bg-slate-100 px-3 py-1 rounded-full">
              {formData.performance}%
            </span>
          </div>
          <Slider
            value={[formData.performance]}
            onValueChange={(value) => setFormData({ ...formData, performance: value[0] })}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-[#1e3a8a] [&_[role=slider]]:border-[#1e3a8a]"
          />
          <div className="flex justify-between text-xs text-[#64748b]">
            <span>Standard</span>
            <span>Critical</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-[#1e3a8a] font-medium">
              Team Expertise Level
            </Label>
            <span className="text-sm font-medium text-[#1e3a8a] bg-slate-100 px-3 py-1 rounded-full">
              {formData.expertiseLevel}%
            </span>
          </div>
          <Slider
            value={[formData.expertiseLevel]}
            onValueChange={(value) => setFormData({ ...formData, expertiseLevel: value[0] })}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-[#1e3a8a] [&_[role=slider]]:border-[#1e3a8a]"
          />
          <div className="flex justify-between text-xs text-[#64748b]">
            <span>Junior</span>
            <span>Expert</span>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <Button
          onClick={handleBack}
          variant="outline"
          className="border-[#64748b] text-[#64748b] hover:bg-slate-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white px-8"
        >
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
