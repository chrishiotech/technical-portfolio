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
  const [isDownloaded, setIsDownloaded] = useState(false); // Downloaded state to prevent multiple clicks

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
    // Prevent multiple downloads
    if (isDownloaded) {
      return;
    }

    setIsGeneratingPDF(true);

    try {
      // Create a custom PDF layout instead of cloning DOM
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "1200px";
      container.style.fontFamily = "system-ui, -apple-system, sans-serif";
      container.style.backgroundColor = "#ffffff";
      container.style.padding = "40px";
      container.style.boxSizing = "border-box";

      // Custom PDF content with NO oklch colors
      container.innerHTML = `
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #1e3a8a; font-size: 32px; font-weight: 700; margin: 0;">
            Technical Decision Framework
          </h1>
          <div style="width: 80px; height: 4px; background: #1e3a8a; margin: 20px auto;"></div>
          <p style="color: #64748b; font-size: 16px; margin: 0;">
            Architecture Analysis Report
          </p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #1e3a8a;">
          <h2 style="color: #1e3a8a; font-size: 24px; font-weight: 600; margin: 0 0 20px 0;">
            🏗️ Architecture Recommendation
          </h2>
          <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
            <div style="background: #1e3a8a; color: white; padding: 15px 25px; border-radius: 8px; font-size: 20px; font-weight: 600;">
              ${recommended === "microservices" ? "MICROSERVICES" : "MONOLITH"}
            </div>
            <div style="background: #f1f5f9; color: #1e3a8a; padding: 10px 20px; border-radius: 20px; font-size: 14px; font-weight: 500;">
              Confidence: ${confidence}%
            </div>
          </div>
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0;">
            Based on your project requirements and business goals, our analysis recommends this architecture approach for optimal performance and scalability.
          </p>
        </div>
        
        <!-- ROI Projection Chart -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1e3a8a; font-size: 20px; font-weight: 600; margin: 0 0 20px 0;">
            📈 ROI Projection (24-Month Forecast)
          </h3>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div style="height: 200px; position: relative; display: flex; align-items: center; justify-content: center;">
              <div style="text-align: center; width: 100%;">
                <p style="color: #1e3a8a; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
                  📊 Proyección de Retorno de Inversión
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 20px;">
                  <div style="text-align: center;">
                    <div style="color: #1e3a8a; font-size: 24px; font-weight: 700; margin-bottom: 10px;">
                      Microservices
                    </div>
                    <div style="color: #64748b; font-size: 18px; margin-bottom: 5px;">
                      Inversión inicial: -50
                    </div>
                    <div style="color: #16a34a; font-size: 18px; margin-bottom: 5px;">
                      Ahorro 24 meses: +130
                    </div>
                    <div style="color: #16a34a; font-size: 20px; font-weight: 600;">
                      ROI: 160%
                    </div>
                  </div>
                  <div style="text-align: center;">
                    <div style="color: #64748b; font-size: 24px; font-weight: 700; margin-bottom: 10px;">
                      Monolith
                    </div>
                    <div style="color: #dc2626; font-size: 18px; margin-bottom: 5px;">
                      Inversión inicial: -30
                    </div>
                    <div style="color: #16a34a; font-size: 18px; margin-bottom: 5px;">
                      Ahorro 24 meses: +85
                    </div>
                    <div style="color: #16a34a; font-size: 20px; font-weight: 600;">
                      ROI: 183%
                    </div>
                  </div>
                </div>
                <p style="color: #64748b; font-size: 14px; text-align: center; margin: 0;">
                  Basado en análisis de costos y beneficios proyectados a 24 meses
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- ROI Projection Chart (Visual) -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1e3a8a; font-size: 20px; font-weight: 600; margin: 0 0 20px 0;">
            📊 ROI Projection Chart (24-Month Visual)
          </h3>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div style="height: 200px; position: relative;">
              <!-- HTML5 Canvas Chart -->
              <canvas id="roi-chart" width="800" height="200" style="width: 100%; height: 100%;"></canvas>
            </div>
          </div>
        </div>
        
        <!-- ROI Summary Table -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1e3a8a; font-size: 20px; font-weight: 600; margin: 0 0 20px 0;">
            📈 ROI Summary (12-Month Projection)
          </h3>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="background: #e2e8f0;">
                  <th style="padding: 12px; text-align: left; color: #1e3a8a; font-weight: 600; border-bottom: 2px solid #1e3a8a;">Architecture</th>
                  <th style="padding: 12px; text-align: left; color: #1e3a8a; font-weight: 600; border-bottom: 2px solid #1e3a8a;">Initial Investment</th>
                  <th style="padding: 12px; text-align: left; color: #1e3a8a; font-weight: 600; border-bottom: 2px solid #1e3a8a;">Operational Savings</th>
                  <th style="padding: 12px; text-align: left; color: #1e3a8a; font-weight: 600; border-bottom: 2px solid #1e3a8a;">ROI 12 Months</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px; color: #1e3a8a; font-weight: 600;">Microservices</td>
                  <td style="padding: 12px; color: #dc2626; font-weight: 500;">-50</td>
                  <td style="padding: 12px; color: #16a34a; font-weight: 500;">+45</td>
                  <td style="padding: 12px; color: #16a34a; font-weight: 600;">45%</td>
                </tr>
                <tr>
                  <td style="padding: 12px; color: #1e3a8a; font-weight: 600;">Monolith</td>
                  <td style="padding: 12px; color: #dc2626; font-weight: 500;">-30</td>
                  <td style="padding: 12px; color: #16a34a; font-weight: 500;">+55</td>
                  <td style="padding: 12px; color: #16a34a; font-weight: 600;">55%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1e3a8a; font-size: 20px; font-weight: 600; margin: 0 0 20px 0;">
            📊 Analysis Summary
          </h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <h4 style="color: #1e3a8a; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
                Project Details
              </h4>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0;">
                <strong>Project:</strong> ${formData.projectName || "Unnamed Project"}
              </p>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0;">
                <strong>Team Size:</strong> ${formData.teamSize || "Not specified"}
              </p>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0;">
                <strong>Expected Load:</strong> ${formData.userLoad || "Not specified"}
              </p>
            </div>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <h4 style="color: #1e3a8a; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
                Business Priorities
              </h4>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0;">
                <strong>Top Priority:</strong> ${formData.flexibility > formData.cost ? "Flexibility" : formData.cost > formData.scalability ? "Cost Efficiency" : "Scalability"}
              </p>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0;">
                <strong>Budget Range:</strong> ${formData.cost > 3 ? "High" : formData.cost > 1 ? "Medium" : "Low"}
              </p>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0;">
                <strong>Timeline:</strong> ${formData.timeToMarket > 3 ? "Long-term" : formData.timeToMarket > 1 ? "Medium-term" : "Short-term"}
              </p>
            </div>
          </div>
        </div>
        
        <div style="background: #1e3a8a; color: white; padding: 30px; border-radius: 12px; text-align: center; margin-top: 40px;">
          <p style="font-size: 18px; font-weight: 600; margin: 0;">
            📋 Generated by Technical Decision Framework
          </p>
          <p style="font-size: 14px; margin: 10px 0 0 0; opacity: 0.9;">
            Christian Aguirre • Architecture Consulting
          </p>
        </div>
      `;

      document.body.appendChild(container);

      // Wait for DOM to be ready, then draw the chart
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Draw the chart on the canvas
      const canvas = container.querySelector("#roi-chart") as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Clear canvas
          ctx.clearRect(0, 0, 800, 200);

          // Set styles
          ctx.font = "12px system-ui, sans-serif";
          ctx.strokeStyle = "#e2e8f0";
          ctx.lineWidth = 1;

          // Draw grid lines
          ctx.beginPath();
          ctx.moveTo(50, 20);
          ctx.lineTo(750, 20);
          ctx.moveTo(50, 60);
          ctx.lineTo(750, 60);
          ctx.moveTo(50, 100);
          ctx.lineTo(750, 100);
          ctx.moveTo(50, 140);
          ctx.lineTo(750, 140);
          ctx.moveTo(50, 180);
          ctx.lineTo(750, 180);
          ctx.stroke();

          // Draw labels
          ctx.fillStyle = "#64748b";
          ctx.textAlign = "end";
          ctx.fillText("100", 40, 25);
          ctx.fillText("50", 40, 65);
          ctx.fillText("0", 40, 105);
          ctx.fillText("50", 40, 145);
          ctx.fillText("100", 40, 185);

          ctx.textAlign = "center" as CanvasTextAlign;
          ctx.fillText("M1", 100, 195);
          ctx.fillText("M3", 200, 195);
          ctx.fillText("M6", 300, 195);
          ctx.fillText("M9", 400, 195);
          ctx.fillText("M12", 500, 195);
          ctx.fillText("M18", 600, 195);
          ctx.fillText("M24", 700, 195);

          // Draw Microservices line
          ctx.beginPath();
          ctx.strokeStyle = "#1e3a8a";
          ctx.lineWidth = 3;
          ctx.moveTo(100, 140);
          ctx.lineTo(200, 120);
          ctx.lineTo(300, 100);
          ctx.lineTo(400, 110);
          ctx.lineTo(500, 80);
          ctx.lineTo(600, 60);
          ctx.lineTo(700, 40);
          ctx.stroke();

          // Draw Monolith line
          ctx.beginPath();
          ctx.strokeStyle = "#64748b";
          ctx.lineWidth = 3;
          ctx.moveTo(100, 120);
          ctx.lineTo(200, 110);
          ctx.lineTo(300, 120);
          ctx.lineTo(400, 130);
          ctx.lineTo(500, 140);
          ctx.lineTo(600, 120);
          ctx.lineTo(700, 100);
          ctx.stroke();

          // Draw legend
          ctx.fillStyle = "#1e3a8a";
          ctx.fillRect(550, 25, 15, 3);
          ctx.fillStyle = "#1e3a8a";
          ctx.font = "bold 12px system-ui, sans-serif";
          ctx.textAlign = "left";
          ctx.fillText("Microservices", 570, 28);

          ctx.fillStyle = "#64748b";
          ctx.fillRect(550, 40, 15, 3);
          ctx.fillStyle = "#64748b";
          ctx.fillText("Monolith", 570, 43);
        }
      }

      const pdfCanvas = await html2canvas(container, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: 1200,
        height: 1600,
        logging: false,
        allowTaint: true,
        // Ignore ALL elements that might cause color parsing issues
        ignoreElements: (element) => {
          return (
            element.tagName === "STYLE" ||
            element.tagName === "LINK" ||
            element.tagName === "SCRIPT" ||
            element.tagName === "META" ||
            element.tagName === "HEAD"
          );
        },
      });

      const imgData = pdfCanvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
      pdf.save("reporte-arquitectura.pdf");

      // Mark as downloaded
      setIsDownloaded(true);
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
            disabled={isGeneratingPDF || isDownloaded}
            variant="outline"
            className={`border-[#1e3a8a] text-[#1e3a8a] hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base ${
              isDownloaded ? "bg-green-50 border-green-600 text-green-700" : ""
            }`}
          >
            <Download className="mr-2 h-4 w-4" />
            {isGeneratingPDF
              ? "Generando..."
              : isDownloaded
                ? "✓ Archivo Descargado"
                : "Descargar Reporte PDF"}
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
