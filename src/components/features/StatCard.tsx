import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  delta: number;
  trend: "up" | "down";
  icon: LucideIcon;
  accent: "primary" | "success" | "warning" | "destructive";
  suffix?: string;
  index: number;
}

const accentMap = {
  primary: { glow: "shadow-glow", text: "text-primary", bg: "bg-primary/10", grad: "from-primary/20" },
  success: { glow: "shadow-glow-cyan", text: "text-success", bg: "bg-success/10", grad: "from-success/20" },
  warning: { glow: "shadow-glow-pink", text: "text-warning", bg: "bg-warning/10", grad: "from-warning/20" },
  destructive: { glow: "shadow-glow-pink", text: "text-destructive", bg: "bg-destructive/10", grad: "from-destructive/20" },
};

export const StatCard = ({ label, value, delta, trend, icon: Icon, accent, suffix = "", index }: StatCardProps) => {
  const a = accentMap[accent];
  const count = useMotionValue(0);
  const isFloat = value % 1 !== 0;
  const rounded = useTransform(count, (latest) =>
    isFloat ? latest.toFixed(2) : Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.6, ease: "easeOut", delay: index * 0.1 });
    return () => controls.stop();
  }, [value, count, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="glass-card glow-border p-5 group cursor-default"
    >
      <div className={cn("absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl opacity-40 bg-gradient-to-br to-transparent transition-opacity group-hover:opacity-70", a.grad)} />

      <div className="relative flex items-start justify-between mb-4">
        <div className={cn("h-10 w-10 rounded-xl grid place-items-center", a.bg, a.text)}>
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <div
          className={cn(
            "flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-md",
            trend === "up" ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
          )}
        >
          {trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {delta}%
        </div>
      </div>

      <div className="relative space-y-1">
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{label}</div>
        <div className="font-display text-3xl font-bold tracking-tight">
          <motion.span>{rounded}</motion.span>
          <span className="text-muted-foreground text-xl font-normal">{suffix}</span>
        </div>
      </div>
    </motion.div>
  );
};
