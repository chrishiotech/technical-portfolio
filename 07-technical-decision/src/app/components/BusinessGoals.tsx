import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { wizardStore } from "../store";

export function BusinessGoals() {
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
    navigate("/results");
  };

  const handleBack = () => {
    wizardStore.setData(formData);
    navigate("/technical");
  };

  const total = formData.timeToMarket + formData.cost + formData.flexibility;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-[#1e3a8a] mb-2">
          Business Goals
        </h2>
        <p className="text-[#64748b]">
          Prioritize your business objectives - total weight should equal 100%
        </p>
      </div>

      <div className="space-y-10 max-w-2xl">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-[#1e3a8a] font-medium">
              Time to Market
            </Label>
            <span className="text-sm font-medium text-[#1e3a8a] bg-slate-100 px-3 py-1 rounded-full">
              {formData.timeToMarket}%
            </span>
          </div>
          <Slider
            value={[formData.timeToMarket]}
            onValueChange={(value) => {
              const newValue = value[0];
              const remaining = 100 - newValue;
              const currentOtherTotal = formData.cost + formData.flexibility;
              const scale = currentOtherTotal > 0 ? remaining / currentOtherTotal : 0.5;
              setFormData({
                ...formData,
                timeToMarket: newValue,
                cost: Math.round(formData.cost * scale),
                flexibility: remaining - Math.round(formData.cost * scale),
              });
            }}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-[#1e3a8a] [&_[role=slider]]:border-[#1e3a8a]"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-[#1e3a8a] font-medium">
              Cost Efficiency
            </Label>
            <span className="text-sm font-medium text-[#1e3a8a] bg-slate-100 px-3 py-1 rounded-full">
              {formData.cost}%
            </span>
          </div>
          <Slider
            value={[formData.cost]}
            onValueChange={(value) => {
              const newValue = value[0];
              const remaining = 100 - newValue;
              const currentOtherTotal = formData.timeToMarket + formData.flexibility;
              const scale = currentOtherTotal > 0 ? remaining / currentOtherTotal : 0.5;
              setFormData({
                ...formData,
                cost: newValue,
                timeToMarket: Math.round(formData.timeToMarket * scale),
                flexibility: remaining - Math.round(formData.timeToMarket * scale),
              });
            }}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-[#1e3a8a] [&_[role=slider]]:border-[#1e3a8a]"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-[#1e3a8a] font-medium">
              Flexibility & Adaptability
            </Label>
            <span className="text-sm font-medium text-[#1e3a8a] bg-slate-100 px-3 py-1 rounded-full">
              {formData.flexibility}%
            </span>
          </div>
          <Slider
            value={[formData.flexibility]}
            onValueChange={(value) => {
              const newValue = value[0];
              const remaining = 100 - newValue;
              const currentOtherTotal = formData.timeToMarket + formData.cost;
              const scale = currentOtherTotal > 0 ? remaining / currentOtherTotal : 0.5;
              setFormData({
                ...formData,
                flexibility: newValue,
                timeToMarket: Math.round(formData.timeToMarket * scale),
                cost: remaining - Math.round(formData.timeToMarket * scale),
              });
            }}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-[#1e3a8a] [&_[role=slider]]:border-[#1e3a8a]"
          />
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#64748b]">Total Weight:</span>
            <span
              className={`text-lg font-semibold ${
                total === 100 ? "text-green-600" : "text-red-600"
              }`}
            >
              {total}%
            </span>
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
          disabled={total !== 100}
          className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white px-8"
        >
          View Results
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
