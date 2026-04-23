import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, Truck, Bell, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertLevel = "critical" | "warning" | "success";

interface SmartAlert {
  id: string;
  level: AlertLevel;
  icon: typeof AlertTriangle;
  title: string;
  description: string;
  time: string;
}

const alerts: SmartAlert[] = [
  {
    id: "a1",
    level: "critical",
    icon: AlertTriangle,
    title: "Spike in negative reviews detected",
    description: "Negative sentiment up 32% in the last 24 hours — mostly tied to AuraPods Pro shipments.",
    time: "12 min ago",
  },
  {
    id: "a2",
    level: "success",
    icon: TrendingUp,
    title: "Positive feedback increased for Glow Hydra Serum",
    description: "5-star reviews up 24% this week. Customers love the lightweight texture and fast absorption.",
    time: "2 hours ago",
  },
  {
    id: "a3",
    level: "warning",
    icon: Truck,
    title: "Delivery complaints up by 18%",
    description: "Repeat mentions of late delivery and damaged packaging across Tier-2 cities on Flipkart.",
    time: "5 hours ago",
  },
];

const levelStyles: Record<AlertLevel, { dot: string; iconBg: string; iconText: string; ring: string; badge: string; label: string }> = {
  critical: {
    dot: "bg-destructive",
    iconBg: "bg-destructive/15",
    iconText: "text-destructive",
    ring: "hover:border-destructive/40 hover:shadow-[0_0_30px_-10px_hsl(var(--destructive)/0.6)]",
    badge: "bg-destructive/10 text-destructive",
    label: "Critical",
  },
  warning: {
    dot: "bg-warning",
    iconBg: "bg-warning/15",
    iconText: "text-warning",
    ring: "hover:border-warning/40 hover:shadow-[0_0_30px_-10px_hsl(var(--warning)/0.6)]",
    badge: "bg-warning/10 text-warning",
    label: "Warning",
  },
  success: {
    dot: "bg-success",
    iconBg: "bg-success/15",
    iconText: "text-success",
    ring: "hover:border-success/40 hover:shadow-[0_0_30px_-10px_hsl(var(--success)/0.6)]",
    badge: "bg-success/10 text-success",
    label: "Positive",
  },
};

export const SmartAlerts = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    aria-labelledby="smart-alerts-heading"
    className="space-y-4"
  >
    <div className="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-pink opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink" />
          </span>
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
            Real-time monitoring
          </span>
        </div>
        <h2 id="smart-alerts-heading" className="font-display text-xl font-semibold tracking-tight flex items-center gap-2">
          <Bell className="h-5 w-5 text-pink" />
          Smart Alerts
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Proactive signals surfaced from review trends across all platforms.
        </p>
      </div>
      <button className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 h-9 rounded-lg border border-white/[0.08] hover:border-white/20">
        Configure alerts
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {alerts.map((alert, i) => {
        const styles = levelStyles[alert.level];
        const Icon = alert.icon;
        return (
          <motion.article
            key={alert.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            className={cn(
              "glass-card p-5 relative overflow-hidden border border-white/[0.06] transition-all cursor-pointer group",
              styles.ring,
            )}
          >
            <span className={cn("absolute top-0 left-0 h-full w-1", styles.dot)} aria-hidden />

            <div className="flex items-start gap-3">
              <div className={cn("h-10 w-10 rounded-xl grid place-items-center shrink-0", styles.iconBg)}>
                <Icon className={cn("h-5 w-5", styles.iconText)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md", styles.badge)}>
                    {styles.label}
                  </span>
                  <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", styles.dot)} />
                </div>
                <h3 className="font-display text-sm font-semibold leading-snug text-foreground">
                  {alert.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                  {alert.description}
                </p>
                <div className="flex items-center gap-1.5 mt-3 text-[11px] text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{alert.time}</span>
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  </motion.section>
);
