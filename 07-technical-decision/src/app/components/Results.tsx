import {
  ArrowLeft,
  CheckCircle2,
  Download,
  RotateCcw,
  Share2,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import contentDual from "../../../content-dual.json";
import { wizardStore } from "../store";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function Results() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(wizardStore.getData());
  const [audience, setAudience] = useState<"human" | "technical">("human");
  const [copied, setCopied] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false); // Optional loading state

  useEffect(() => {
    const unsubscribe = wizardStore.subscribe(() => {
      setFormData(wizardStore.getData());
    });
    return unsubscribe;
  }, []);

  const calculateRecommendation = () => {
    // Microservices score based on various factors
    const microservicesScore =
      (formData.scalability * 0.3 +
        formData.performance * 0.2 +
        formData.expertiseLevel * 0.2 +
        formData.flexibility * 0.3) /
      100;

    // Monolith score based on inverse factors
    const monolithScore =
      (formData.timeToMarket * 0.4 +
        formData.cost * 0.3 +
        (100 - formData.scalability) * 0.2 +
        (100 - formData.expertiseLevel) * 0.1) /
      100;

    const recommended =
      microservicesScore > monolithScore ? "microservices" : "monolith";
    const confidence = Math.round(
      Math.max(microservicesScore, monolithScore) * 100,
    );

    return { recommended, confidence };
  };

  const { recommended, confidence } = calculateRecommendation();

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    const element = document.getElementById("report-content"); // Back to report-content only

    if (!element) {
      setIsGeneratingPDF(false);
      return;
    }

    try {
      // 1. Create a temporary clone of element to clean it up before capturing
      const clone = element.cloneNode(true) as HTMLElement;
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px"; // Move off-screen
      container.style.top = "0";
      container.style.width = "1200px"; // Fixed width for PDF
      container.appendChild(clone);
      document.body.appendChild(container);

      // 2. Replace only problematic colors, keep layout intact
      const replaceAllStyles = (element: Element) => {
        const htmlEl = element as HTMLElement;

        // Get computed style to check for oklch/oklab
        const computedStyle = window.getComputedStyle(htmlEl);

        // Check and replace background color
        const bgColor = computedStyle.backgroundColor;
        if (
          bgColor &&
          (bgColor.includes("oklch") || bgColor.includes("oklab"))
        ) {
          htmlEl.style.backgroundColor = "#ffffff";
        }

        // Check and replace text color
        const textColor = computedStyle.color;
        if (
          textColor &&
          (textColor.includes("oklch") || textColor.includes("oklab"))
        ) {
          htmlEl.style.color = "#000000";
        }

        // Recursively process children
        Array.from(element.children).forEach((child) =>
          replaceAllStyles(child as Element),
        );
      };

      // 3. Remove all <style> tags that might contain oklch
      Array.from(clone.querySelectorAll("style")).forEach((style: Element) =>
        (style as HTMLElement).remove(),
      );

      // 4. Keep layout classes, remove only color-related classes
      Array.from(clone.querySelectorAll("*")).forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        const classList = htmlEl.className;

        if (classList && typeof classList === "string") {
          // Keep layout classes, remove only color-related ones
          const safeClasses = classList
            .split(" ")
            .filter((cls) => {
              // Remove classes that might contain oklch/oklab colors
              return (
                !cls.includes("bg-") &&
                !cls.includes("text-") &&
                !cls.includes("border-") &&
                !cls.includes("shadow-")
              );
            })
            .join(" ");
          htmlEl.className = safeClasses;
        }
      });

      // Apply the style replacement
      replaceAllStyles(clone);

      console.log("2. Creating canvas snapshot...");

      const canvas = await html2canvas(clone, {
        scale: 1.5, // Reduced scale to fit in one page
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        allowTaint: true,
        width: 1200, // Fixed width for PDF
        height: 1600, // Approximate height for A4 ratio
        // Additional options to prevent color parsing issues
        ignoreElements: (element) => {
          // Ignore elements that might cause issues
          return element.tagName === "STYLE" || element.tagName === "LINK";
        },
      });

      // Clean up the clone
      document.body.removeChild(container);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
      pdf.save("reporte-arquitectura.pdf");
    } catch (error) {
      console.error("❌ ERROR generating PDF:", error);
      alert("Hubo un error al generar el PDF. Por favor intenta de nuevo.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        "https://07-technical-decision.vercel.app/",
      );
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
    <div id="report-content" className="space-y-6">
      {/* ... (Keep all your existing JSX content: Header, Charts, Tables, etc.) ... */}

      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-10 transition-all duration-300 ease-out hover:shadow-md">
        {/* ... existing content ... */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1e3a8a] mb-2">
            Architecture Recommendation
          </h2>
          <p className="text-sm sm:text-base text-[#64748b]">
            Based on your inputs, here's our analysis and recommendation
          </p>
        </div>

        {/* Recommendation Badge */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-gradient-to-r from-blue-50 to-slate-50 border-2 border-[#1e3a8a] rounded-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 transition-all duration-300 ease-out">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-[#1e3a8a] text-white rounded-full p-3 sm:p-4 shadow-sm">
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-[#64748b] mb-1">
                Recommended Architecture
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <h3 className="text-xl sm:text-3xl font-semibold text-[#1e3a8a] capitalize">
                  {calculateRecommendation().recommended}
                </h3>
                <Badge className="bg-[#1e3a8a]/10 text-[#1e3a8a] border border-[#1e3a8a]/20 text-xs sm:text-sm">
                  Primary Choice
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-left lg:text-right">
            <p className="text-xs sm:text-sm text-[#64748b] mb-1">
              Confidence Score
            </p>
            <div className="flex items-baseline gap-1 lg:justify-end">
              <span className="text-2xl sm:text-4xl font-semibold text-[#1e3a8a]">
                {calculateRecommendation().confidence}
              </span>
              <span className="text-lg sm:text-xl text-[#64748b]">%</span>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-slate-50 rounded-lg p-4 sm:p-6 border border-slate-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-sm">
            <h4 className="text-xs sm:text-sm font-medium text-[#64748b] mb-2">
              Project: {formData.projectName || "Unnamed Project"}
            </h4>
            <p className="text-xs text-[#64748b]">
              Team: {formData.teamSize || "Not specified"}
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 sm:p-6 border border-slate-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-sm">
            <h4 className="text-xs sm:text-sm font-medium text-[#64748b] mb-2">
              Expected Load
            </h4>
            <p className="text-xs text-[#64748b]">
              {formData.userLoad || "Not specified"}
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 sm:p-6 border border-slate-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-sm">
            <h4 className="text-xs sm:text-sm font-medium text-[#64748b] mb-2">
              Top Priority
            </h4>
            <p className="text-xs text-[#64748b]">
              {formData.timeToMarket >= formData.cost &&
              formData.timeToMarket >= formData.flexibility
                ? "Time to Market"
                : formData.cost >= formData.flexibility
                  ? "Cost Efficiency"
                  : "Flexibility"}
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Comparison Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-10 transition-all duration-300 ease-out hover:shadow-md">
        <h3 className="text-lg sm:text-xl font-semibold text-[#1e3a8a] mb-4 sm:mb-6">
          Architecture Comparison
        </h3>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[320px]">
            <ResponsiveContainer width="100%" height={150}>
              <BarChart
                data={[
                  { category: "Scalability", Microservices: 95, Monolith: 60 },
                  { category: "Speed", Microservices: 65, Monolith: 90 },
                  { category: "Cost", Microservices: 60, Monolith: 85 },
                  { category: "Flexibility", Microservices: 90, Monolith: 55 },
                  { category: "Maintenance", Microservices: 70, Monolith: 75 },
                ]}
                margin={{ top: 5, right: 10, left: 5, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" />
                <XAxis
                  dataKey="category"
                  stroke="#64748b"
                  angle={-45}
                  textAnchor="end"
                  height={50}
                  fontSize={9}
                  tick={{ fontSize: 9 }}
                />
                <YAxis stroke="#64748b" fontSize={9} tick={{ fontSize: 9 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                    fontSize: 10,
                    padding: 6,
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
                  iconSize={10}
                />
                <Bar
                  dataKey="Microservices"
                  fill="#1e3a8a"
                  radius={[2, 2, 0, 0]}
                />
                <Bar dataKey="Monolith" fill="#64748b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ROI Projection Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-10 transition-all duration-300 ease-out hover:shadow-md">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#1e3a8a]" />
          <h3 className="text-lg sm:text-xl font-semibold text-[#1e3a8a]">
            ROI Projection
          </h3>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[320px]">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart
                data={[
                  { month: "M1", Microservices: -50, Monolith: -30 },
                  { month: "M3", Microservices: -40, Monolith: -10 },
                  { month: "M6", Microservices: -20, Monolith: 20 },
                  { month: "M9", Microservices: 10, Monolith: 40 },
                  { month: "M12", Microservices: 45, Monolith: 55 },
                  { month: "M18", Microservices: 85, Monolith: 70 },
                  { month: "M24", Microservices: 130, Monolith: 85 },
                ]}
                margin={{ top: 5, right: 10, left: 5, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  fontSize={9}
                  tick={{ fontSize: 9 }}
                />
                <YAxis stroke="#64748b" fontSize={9} tick={{ fontSize: 9 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                    fontSize: 10,
                    padding: 6,
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
                  iconSize={10}
                />
                <Line
                  type="monotone"
                  dataKey="Microservices"
                  stroke="#1e3a8a"
                  strokeWidth={1.5}
                  dot={{ fill: "#1e3a8a", r: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="Monolith"
                  stroke="#64748b"
                  strokeWidth={1.5}
                  dot={{ fill: "#64748b", r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ROI Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-10 transition-all duration-300 ease-out hover:shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#1e3a8a]">
              ROI Summary (12-Month Projection)
            </h3>
            <p className="text-sm text-[#64748b]">
              Visualiza ahorro vs costo con enfoque financiero claro.
            </p>
          </div>
          <Badge className="bg-[#1e3a8a]/10 text-[#1e3a8a] border border-[#1e3a8a]/20 text-xs sm:text-sm">
            12 meses
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="text-xs sm:text-sm">
                  Arquitectura
                </TableHead>
                <TableHead className="text-xs sm:text-sm">
                  Inversión Inicial
                </TableHead>
                <TableHead className="text-xs sm:text-sm">
                  Ahorro Operativo
                </TableHead>
                <TableHead className="text-xs sm:text-sm">
                  ROI 12 Meses
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-[#1e3a8a] text-xs sm:text-sm">
                  Microservices
                </TableCell>
                <TableCell className="text-red-600 font-medium text-xs sm:text-sm">
                  -50
                </TableCell>
                <TableCell className="text-emerald-600 font-medium text-xs sm:text-sm">
                  +45
                </TableCell>
                <TableCell className="text-emerald-600 font-semibold text-xs sm:text-sm">
                  45%
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-[#1e3a8a] text-xs sm:text-sm">
                  Monolith
                </TableCell>
                <TableCell className="text-red-600 font-medium text-xs sm:text-sm">
                  -30
                </TableCell>
                <TableCell className="text-emerald-600 font-medium text-xs sm:text-sm">
                  +55
                </TableCell>
                <TableCell className="text-emerald-600 font-semibold text-xs sm:text-sm">
                  55%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={handleBack}
          variant="outline"
          className="border-[#64748b] text-[#64748b] hover:bg-slate-50 transition-all duration-300 text-sm sm:text-base"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
          {/* 4. ADD onClick={handleDownloadPDF} HERE */}
          <Button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            variant="outline"
            className="border-[#1e3a8a] text-[#1e3a8a] hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base"
          >
            <Download className="mr-2 h-4 w-4" />
            {isGeneratingPDF ? "Generando..." : "Descargar Reporte PDF"}
          </Button>

          <Button
            onClick={handleCopyLink}
            className="bg-white border border-slate-200 text-[#1e3a8a] hover:bg-slate-50 transition-all duration-300 text-sm sm:text-base"
          >
            <Share2 className="mr-2 h-4 w-4" />
            {copied ? "Link Copiado" : "Compartir con mi Equipo"}
          </Button>
          <Button
            onClick={handleReset}
            className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white px-6 sm:px-8 transition-all duration-300 text-sm sm:text-base"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
