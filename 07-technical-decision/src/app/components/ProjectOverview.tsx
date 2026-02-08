import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { wizardStore } from "../store";

export function ProjectOverview() {
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
    navigate("/technical");
  };

  const isFormValid = formData.projectName && formData.teamSize && formData.userLoad && formData.criticalFeatures;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-[#1e3a8a] mb-2">
          Project Overview
        </h2>
        <p className="text-[#64748b]">
          Tell us about your project to get started with the assessment
        </p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="projectName" className="text-[#1e3a8a] font-medium">
            Project Name
          </Label>
          <Input
            id="projectName"
            placeholder="e.g., E-commerce Platform"
            value={formData.projectName}
            onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
            className="border-slate-300 focus:border-[#1e3a8a]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="teamSize" className="text-[#1e3a8a] font-medium">
            Team Size
          </Label>
          <Input
            id="teamSize"
            placeholder="e.g., 5-10 developers"
            value={formData.teamSize}
            onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
            className="border-slate-300 focus:border-[#1e3a8a]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="userLoad" className="text-[#1e3a8a] font-medium">
            Expected User Load
          </Label>
          <Input
            id="userLoad"
            placeholder="e.g., 10,000 daily active users"
            value={formData.userLoad}
            onChange={(e) => setFormData({ ...formData, userLoad: e.target.value })}
            className="border-slate-300 focus:border-[#1e3a8a]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="criticalFeatures" className="text-[#1e3a8a] font-medium">
            Critical Features
          </Label>
          <Textarea
            id="criticalFeatures"
            placeholder="Describe the key features your application needs..."
            value={formData.criticalFeatures}
            onChange={(e) => setFormData({ ...formData, criticalFeatures: e.target.value })}
            className="border-slate-300 focus:border-[#1e3a8a] min-h-[120px]"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white px-8"
        >
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
