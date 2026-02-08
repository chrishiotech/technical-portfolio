import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Download,
  Share2,
  Info,
} from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Tooltip as Hint, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import contentDual from "../../../content-dual.json";

export function Results() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(wizardStore.getData());
  const [audience, setAudience] = useState<"human" | "technical">("human");
  const [copied, setCopied] = useState(false);

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

  const month12 = roiData.find((item) => item.month === "Month 12");
  const month1 = roiData[0];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleBack = () => {
    navigate("/business");
  };

  const handleReset = () => {
    wizardStore.reset();
    navigate("/");
  };

  const explanationData = contentDual.explanations;
  const explanationMode = audience === "human" ? "human" : "technical";

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-10 transition-all duration-300 ease-out hover:shadow-md">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-[#1e3a8a] mb-2">
            Architecture Recommendation
          </h2>
          <p className="text-[#64748b]">
            Based on your inputs, here's our analysis and recommendation
          </p>
        </div>

        {/* Recommendation Badge */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between bg-gradient-to-r from-blue-50 to-slate-50 border-2 border-[#1e3a8a] rounded-xl p-6 md:p-8 mb-8 transition-all duration-300 ease-out">
          <div className="flex items-center gap-4">
            <div className="bg-[#1e3a8a] text-white rounded-full p-4 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-[#64748b] mb-1">Recommended Architecture</p>
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-semibold text-[#1e3a8a] capitalize">
                  {recommended}
                </h3>
                <Badge className="bg-[#1e3a8a]/10 text-[#1e3a8a] border border-[#1e3a8a]/20">
                  Primary Choice
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-left lg:text-right">
            <p className="text-sm text-[#64748b] mb-1">Confidence Score</p>
            <div className="flex items-baseline gap-1 lg:justify-end">
              <span className="text-4xl font-semibold text-[#1e3a8a]">
                {confidence}
              </span>
              <span className="text-xl text-[#64748b]">%</span>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-sm">
            <h4 className="text-sm font-medium text-[#64748b] mb-2">
              Project: {formData.projectName || "Unnamed Project"}
            </h4>
            <p className="text-xs text-[#64748b]">
              Team: {formData.teamSize || "Not specified"}
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-sm">
            <h4 className="text-sm font-medium text-[#64748b] mb-2">
              Expected Load
            </h4>
            <p className="text-xs text-[#64748b]">
              {formData.userLoad || "Not specified"}
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-sm">
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
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-10 transition-all duration-300 ease-out hover:shadow-md">
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

      {/* Dual Explanation */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-10 transition-all duration-300 ease-out hover:shadow-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-[#1e3a8a]">
              Dual Explanation
            </h3>
            <p className="text-sm text-[#64748b]">
              Alterna entre lenguaje humano y técnico sin perder el ROI.
            </p>
          </div>
          <Tabs value={audience} onValueChange={(value) => setAudience(value as "human" | "technical")}>
            <TabsList className="bg-slate-100 border border-slate-200 rounded-full px-1 py-1">
              <TabsTrigger
                value="human"
                className="rounded-full px-4 data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white transition-all duration-300"
              >
                Para Todo Público
              </TabsTrigger>
              <TabsTrigger
                value="technical"
                className="rounded-full px-4 data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white transition-all duration-300"
              >
                Para Especialistas
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {(["monolith", "microservices"] as const).map((key) => {
            const data = explanationData[key][explanationMode];
            const isRecommended = key === recommended;
            return (
              <div
                key={key}
                className={`rounded-xl border p-6 transition-all duration-300 ease-out ${
                  isRecommended
                    ? "border-[#1e3a8a] bg-blue-50/40 shadow-sm"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-[#1e3a8a]">
                    {data.title}
                  </h4>
                  {isRecommended && (
                    <Badge className="bg-[#1e3a8a] text-white">Recomendado</Badge>
                  )}
                </div>
                {"analogy" in data && (
                  <p className="text-sm text-[#64748b] mb-4">{data.analogy}</p>
                )}
                {"definition" in data && (
                  <p className="text-sm text-[#64748b] mb-4">{data.definition}</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <p className="text-xs font-semibold text-[#1e3a8a] mb-2">
                      Pros
                    </p>
                    <ul className="text-xs text-[#475569] space-y-1">
                      {data.pros.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <p className="text-xs font-semibold text-[#1e3a8a] mb-2">
                      Cons
                    </p>
                    <ul className="text-xs text-[#475569] space-y-1">
                      {data.cons.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {"when_to_use" in data && (
                  <p className="text-xs text-[#64748b]">
                    <span className="font-semibold text-[#1e3a8a]">
                      Cuándo usarlo:
                    </span>{" "}
                    {data.when_to_use}
                  </p>
                )}
                {"metrics" in data && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                    {Object.entries(data.metrics).map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-[#475569]"
                      >
                        <p className="font-semibold text-[#1e3a8a] capitalize">
                          {label.replace(/_/g, " ")}
                        </p>
                        <p>{value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ROI Projection Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-10 transition-all duration-300 ease-out hover:shadow-md">
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
          Projected ROI over 24 months. 12-month milestone highlighted in the
          ROI table below.
        </p>
      </div>

      {/* ROI Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-10 transition-all duration-300 ease-out hover:shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-[#1e3a8a]">
              ROI Summary (12-Month Projection)
            </h3>
            <p className="text-sm text-[#64748b]">
              Visualiza ahorro vs costo con enfoque financiero claro.
            </p>
          </div>
          <Badge className="bg-[#1e3a8a]/10 text-[#1e3a8a] border border-[#1e3a8a]/20">
            12 meses
          </Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>Arquitectura</TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  Inversión Inicial
                  <Hint>
                    <TooltipTrigger className="text-[#1e3a8a]">
                      <Info className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      Costo estimado en la fase de arranque.
                    </TooltipContent>
                  </Hint>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  Ahorro Operativo
                  <Hint>
                    <TooltipTrigger className="text-[#1e3a8a]">
                      <Info className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      Beneficio operativo acumulado en 12 meses.
                    </TooltipContent>
                  </Hint>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  ROI 12 Meses
                  <Hint>
                    <TooltipTrigger className="text-[#1e3a8a]">
                      <Info className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      Proyección comparativa al mes 12.
                    </TooltipContent>
                  </Hint>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-[#1e3a8a]">
                Microservices
              </TableCell>
              <TableCell className="text-red-600 font-medium">
                {month1?.Microservices ?? 0}
              </TableCell>
              <TableCell className="text-emerald-600 font-medium">
                +{month12?.Microservices ?? 0}
              </TableCell>
              <TableCell className="text-emerald-600 font-semibold">
                {month12?.Microservices ?? 0}%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-[#1e3a8a]">
                Monolith
              </TableCell>
              <TableCell className="text-red-600 font-medium">
                {month1?.Monolith ?? 0}
              </TableCell>
              <TableCell className="text-emerald-600 font-medium">
                +{month12?.Monolith ?? 0}
              </TableCell>
              <TableCell className="text-emerald-600 font-semibold">
                {month12?.Monolith ?? 0}%
              </TableCell>
            </TableRow>
          </TableBody>
          <TableCaption>
            Valores normalizados para comparar tendencias (verde = ahorro,
            rojo = costo).
          </TableCaption>
        </Table>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Button
          onClick={handleBack}
          variant="outline"
          className="border-[#64748b] text-[#64748b] hover:bg-slate-50 transition-all duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
          <Button
            variant="outline"
            className="border-[#1e3a8a] text-[#1e3a8a] hover:bg-blue-50 transition-all duration-300"
          >
            <Download className="mr-2 h-4 w-4" />
            Descargar Reporte PDF
          </Button>
          <Button
            onClick={handleCopyLink}
            className="bg-white border border-slate-200 text-[#1e3a8a] hover:bg-slate-50 transition-all duration-300"
          >
            <Share2 className="mr-2 h-4 w-4" />
            {copied ? "Link Copiado" : "Compartir con mi Equipo"}
          </Button>
          <Button
            onClick={handleReset}
            className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white px-8 transition-all duration-300"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
