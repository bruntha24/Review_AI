import { useState } from "react";
import { motion } from "framer-motion";
import { MessagesSquare, Star, Smile, Frown } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { TopNav } from "@/components/layout/TopNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/features/StatCard";
import { VolumeChart, RatingChart } from "@/components/features/Charts";
import { Filters } from "@/components/features/Filters";
import { ReviewsFeed } from "@/components/features/ReviewsFeed";
import { AIInsights } from "@/components/features/AIInsights";
import { SmartAlerts } from "@/components/features/SmartAlerts";
import { stats } from "@/data/mockData";

const icons = [MessagesSquare, Star, Smile, Frown];

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);

  // 📄 Advanced PDF Generation
  const handleGenerateReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const timestamp = new Date().toLocaleString();

    // --- 1. BRANDED HEADER ---
    doc.setFillColor(15, 23, 42); 
    doc.rect(0, 0, pageWidth, 45, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("ReviewAI", 20, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    doc.text("EXECUTIVE PERFORMANCE REPORT", 20, 33);
    doc.text(`PREPARED FOR: BRUNTHA`, pageWidth - 20, 25, { align: "right" });
    doc.text(`GENERATED: ${timestamp}`, pageWidth - 20, 33, { align: "right" });

    // --- 2. SUMMARY SECTION ---
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(16);
    doc.text("Key Metrics Overview", 20, 60);

    // FIX: Explicitly convert all values to Strings
    const tableData = stats.map((s) => [
      String(s.label),
      String(s.value) + (s.suffix || ""),
      String(s.delta),
      String(s.trend).toUpperCase()
    ]);

    autoTable(doc, {
      startY: 65,
      head: [["Metric Category", "Current Value", "Change (24h)", "Trend Status"]],
      body: tableData,
      theme: "grid",
      headStyles: { 
        fillColor: [79, 70, 229], 
        fontSize: 11,
        fontStyle: "bold",
        halign: "center" 
      },
      styles: { fontSize: 10, cellPadding: 6 },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 50 },
        1: { halign: "center" },
        2: { halign: "center" },
        3: { halign: "center" },
      },
      didParseCell: (data) => {
        // SAFE CHECK: Ensure we are in the body and checking the "Change" column (index 2)
        if (data.section === "body" && data.column.index === 2) {
          const val = data.cell.raw;
          // Convert to string and check safely
          if (val && typeof val === 'string') {
            if (val.includes("+")) {
              data.cell.styles.textColor = [22, 163, 74]; // Green
            } else if (val.includes("-")) {
              data.cell.styles.textColor = [220, 38, 38]; // Red
            }
          }
        }
      }
    });

    // --- 3. AI INSIGHTS CARD ---
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    
    doc.setFillColor(245, 247, 255);
    doc.roundedRect(20, finalY, pageWidth - 40, 40, 3, 3, "F");
    
    doc.setFontSize(12);
    doc.setTextColor(79, 70, 229);
    doc.setFont("helvetica", "bold");
    doc.text("AI Intelligence Summary", 26, finalY + 12);
    
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.setFont("helvetica", "normal");
    const aiSummary = "Overall sentiment is trending 12% higher than last week. Amazon reviews show peak positivity between 6 PM - 9 PM. Recommendation: Respond to the 4 flagged 'Critical' alerts to maintain your 4.8-star average.";
    const splitText = doc.splitTextToSize(aiSummary, pageWidth - 60);
    doc.text(splitText, 26, finalY + 22);

    // --- 4. FOOTER ---
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("ReviewAI · Confidential Data Report · reviewai.io", pageWidth / 2, pageHeight - 10, { align: "center" });

    doc.save(`ReviewAI_Executive_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav onToggleSidebar={() => setCollapsed(!collapsed)} />

      <div className="flex">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 space-y-6">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
                  Live · Synced 2 min ago
                </span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Welcome back, <span className="gradient-text-aurora">Bruntha</span>
              </h1>

              <p className="text-sm text-muted-foreground mt-1.5">
                Here's what your customers are saying across{" "}
                <span className="text-foreground">3 platforms</span> today.
              </p>
            </div>

            <button
              onClick={handleGenerateReport}
              className="group relative px-5 h-10 rounded-xl bg-gradient-cosmic text-sm font-semibold text-primary-foreground shadow-glow hover:shadow-glow-pink transition-all"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-cosmic opacity-50 blur-md group-hover:blur-lg transition-all -z-10" />
              Generate Report
            </button>
          </motion.div>

          {/* Stats Section */}
          <section className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Performance Overview
                </h2>
                <p className="text-xs text-muted-foreground">
                  Real-time KPI summary across platforms
                </p>
              </div>

              <div className="text-[11px] text-muted-foreground bg-secondary/40 px-3 py-1 rounded-full border">
                Last updated: just now
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: i * 0.08,
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                  }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border bg-card/60 backdrop-blur-md shadow-sm hover:shadow-lg transition-all"
                >
                  <StatCard
                    label={s.label}
                    value={s.value}
                    delta={s.delta}
                    trend={s.trend}
                    icon={icons[i]}
                    accent={s.accent as never}
                    suffix={s.suffix}
                    index={i}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <VolumeChart />
            <RatingChart />
          </div>

          <Filters />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ReviewsFeed />
            <AIInsights />
          </div>

          <SmartAlerts />

          <footer className="pt-4 pb-2 text-center text-[11px] text-muted-foreground">
            ReviewAI · Built for modern eCommerce teams
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;