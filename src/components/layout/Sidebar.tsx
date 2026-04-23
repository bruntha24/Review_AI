import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, MessagesSquare, BarChart3, Brain, Settings, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "reviews", label: "Reviews", icon: MessagesSquare, badge: "248" },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "insights", label: "AI Insights", icon: Brain, glow: true },
  { id: "settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const [active, setActive] = useState("dashboard");

  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 248 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="sticky top-16 hidden md:flex flex-col h-[calc(100vh-4rem)] border-r border-white/[0.06] bg-sidebar/40 backdrop-blur-xl shrink-0"
    >
      <div className="flex-1 p-3 space-y-1 overflow-hidden">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActive(item.id)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 2 }}
              className={cn(
                "relative w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-medium transition-colors group",
                isActive
                  ? "text-foreground bg-secondary/80"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-xl bg-gradient-cosmic opacity-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {isActive && (
                <motion.div
                  layoutId="activeNavBar"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-gradient-cosmic shadow-glow"
                />
              )}
              <div className={cn(
                "relative grid place-items-center h-7 w-7 rounded-lg shrink-0 transition-all",
                isActive ? "bg-gradient-cosmic text-primary-foreground shadow-glow" : "bg-secondary/60 group-hover:bg-secondary",
                item.glow && !isActive && "ring-1 ring-pink/30"
              )}>
                <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
              </div>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex-1 text-left whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!collapsed && item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-primary/20 text-primary font-semibold">
                  {item.badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Upgrade card */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="m-3 relative overflow-hidden rounded-2xl border border-white/[0.08] p-4 bg-gradient-to-br from-primary/20 via-pink/10 to-transparent"
          >
            <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-cosmic opacity-30 blur-2xl" />
            <div className="relative">
              <div className="text-xs font-display font-semibold mb-1">Unlock AI Pro</div>
              <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
                Auto-respond, deep trends, & predictive insights.
              </p>
              <button className="w-full h-8 rounded-lg bg-gradient-cosmic text-xs font-semibold text-primary-foreground shadow-glow hover:shadow-glow-pink transition-shadow">
                Upgrade
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={onToggle}
        className="m-3 mt-0 h-9 grid place-items-center rounded-xl bg-secondary/60 hover:bg-secondary border border-white/[0.06] text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Collapse sidebar"
      >
        <motion.div animate={{ rotate: collapsed ? 180 : 0 }}>
          <ChevronLeft className="h-4 w-4" />
        </motion.div>
      </button>
    </motion.aside>
  );
};
