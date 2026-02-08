import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, RotateCcw, CheckCircle2, TrendingUp } from "lucide-react";
import { wizardStore } from "../store";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function Results() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(wizardStore.getData());

  useEffect(() => {
    const unsubscribe = wizardStore.subscribe(() => {
      setFormData(wizardStore.getData());
    });
    return unsubscribe;
  }, []);

  // Calculate recommendation based on inputs
  const calculateRecommendation = () => {
    // Microservices score based on various factors
    const microservicesScore =
      (formData.scalability * 0.3 +
        formData.performance * 0.2 +
        formData.expertiseLevel * 0.2 +
        formData.flexibility * 0.3) / 100;

    // Monolith score based on inverse factors
    const monolithScore =
      (formData.timeToMarket * 0.4 +
        formData.cost * 0.3 +
        (100 - formData.scalability) * 0.2 +
        (100 - formData.expertiseLevel) * 0.1) / 100;

    const recommended = microservicesScore > monolithScore ? "microservices" : "monolith";
    const confidence = Math.round(
      Math.max(microservicesScore, monolithScore) * 100
    );

    return { recommended, confidence };
  };

  const { recommended, confidence } = calculateRecommendation();

  // Data for architecture comparison chart
  const comparisonData = [
    {
      category: "Scalability",
      Microservices: 95,
      Monolith: 60,
    },
    {
      category: "Speed to Market",
      Microservices: 65,
      Monolith: 90,
    },
    {
      category: "Cost Efficiency",
      Microservices: 60,
      Monolith: 85,
    },
    {
      category: "Flexibility",
      Microservices: 90,
      Monolith: 55,
    },
    {
      category: "Maintenance",
      Microservices: 70,
      Monolith: 75,
    },
  ];

  // Data for ROI projection chart
  const roiData = [
    { month: "Month 1", Microservices: -50, Monolith: -30 },
    { month: "Month 3", Microservices: -40, Monolith: -10 },
    { month: "Month 6", Microservices: -20, Monolith: 20 },
    { month: "Month 9", Microservices: 10, Monolith: 40 },
    { month: "Month 12", Microservices: 45, Monolith: 55 },
    { month: "Month 18", Microservices: 85, Monolith: 70 },
    { month: "Month 24", Microservices: 130, Monolith: 85 },
  ];

  const handleBack = () => {
    navigate("/business");
  };

  const handleReset = () => {
    wizardStore.reset();
    navigate("/");
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-[#1e3a8a] mb-2">
            Architecture Recommendation
          </h2>
          <p className="text-[#64748b]">
            Based on your inputs, here's our analysis and recommendation
          </p>
        </div>

        {/* Recommendation Badge */}
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-slate-50 border-2 border-[#1e3a8a] rounded-xl p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-[#1e3a8a] text-white rounded-full p-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-[#64748b] mb-1">Recommended Architecture</p>
              <h3 className="text-3xl font-semibold text-[#1e3a8a] capitalize">
                {recommended}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#64748b] mb-1">Confidence Score</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-semibold text-[#1e3a8a]">
                {confidence}
              </span>
              <span className="text-xl text-[#64748b]">%</span>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <h4 className="text-sm font-medium text-[#64748b] mb-2">
              Project: {formData.projectName || "Unnamed Project"}
            </h4>
            <p className="text-xs text-[#64748b]">
              Team: {formData.teamSize || "Not specified"}
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <h4 className="text-sm font-medium text-[#64748b] mb-2">
              Expected Load
            </h4>
            <p className="text-xs text-[#64748b]">
              {formData.userLoad || "Not specified"}
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <h4 className="text-sm font-medium text-[#64748b] mb-2">
              Top Priority
            </h4>
            <p className="text-xs text-[#64748b]">
              {formData.timeToMarket >= formData.cost && formData.timeToMarket >= formData.flexibility
                ? "Time to Market"
                : formData.cost >= formData.flexibility
                ? "Cost Efficiency"
                : "Flexibility"}
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Comparison Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10">
        <h3 className="text-xl font-semibold text-[#1e3a8a] mb-6">
          Architecture Comparison
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="category" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="Microservices" fill="#1e3a8a" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Monolith" fill="#64748b" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ROI Projection Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-[#1e3a8a]" />
          <h3 className="text-xl font-semibold text-[#1e3a8a]">
            ROI Projection
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={roiData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="Microservices"
              stroke="#1e3a8a"
              strokeWidth={3}
              dot={{ fill: "#1e3a8a", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="Monolith"
              stroke="#64748b"
              strokeWidth={3}
              dot={{ fill: "#64748b", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-[#64748b] mt-4 text-center">
          Projected ROI over 24 months (normalized values)
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <Button
          onClick={handleBack}
          variant="outline"
          className="border-[#64748b] text-[#64748b] hover:bg-slate-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleReset}
          className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white px-8"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Start New Assessment
        </Button>
      </div>
    </div>
  );
}
