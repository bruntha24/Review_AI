import { motion } from "framer-motion";
import { Sparkles, AlertTriangle, ThumbsUp, Lightbulb, ArrowRight, TrendingUp } from "lucide-react";
import { aiInsights } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const AIInsights = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="space-y-4"
  >
    {/* Header card */}
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] p-5 bg-gradient-to-br from-primary/20 via-pink/10 to-transparent">
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-cosmic opacity-30 blur-3xl animate-glow-pulse" />
      <div className="relative flex items-start gap-3">
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-10 rounded-xl bg-gradient-cosmic grid place-items-center shadow-glow shrink-0"
        >
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </motion.div>
        <div>
          <div className="font-display text-lg font-semibold">AI Insights</div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Auto-generated from <span className="text-foreground font-medium">24,813</span> reviews this month
          </p>
        </div>
      </div>
    </div>

    {/* Complaints */}
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-destructive/15 grid place-items-center">
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </div>
        <h3 className="font-display text-sm font-semibold">Common Complaints</h3>
      </div>
      <div className="space-y-2">
        {aiInsights.complaints.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + i * 0.05 }}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary/50 transition-colors group cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{c.title}</div>
              <div className="text-[11px] text-muted-foreground">{c.count} mentions</div>
            </div>
            <span className="text-[11px] font-semibold text-destructive bg-destructive/10 px-2 py-0.5 rounded-md flex items-center gap-1">
              <TrendingUp className="h-2.5 w-2.5" />
              {c.change}
            </span>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Highlights */}
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-success/15 grid place-items-center">
          <ThumbsUp className="h-4 w-4 text-success" />
        </div>
        <h3 className="font-display text-sm font-semibold">Positive Highlights</h3>
      </div>
      <div className="space-y-2">
        {aiInsights.highlights.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 + i * 0.05 }}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary/50 transition-colors group cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{h.title}</div>
              <div className="text-[11px] text-muted-foreground">{h.count} mentions</div>
            </div>
            <span className="text-[11px] font-semibold text-success bg-success/10 px-2 py-0.5 rounded-md flex items-center gap-1">
              <TrendingUp className="h-2.5 w-2.5" />
              {h.change}
            </span>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Suggested actions */}
    <div className="relative overflow-hidden glass-card p-5">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink to-transparent" />
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-pink/15 grid place-items-center">
          <Lightbulb className="h-4 w-4 text-pink" />
        </div>
        <h3 className="font-display text-sm font-semibold">Suggested Actions</h3>
      </div>
      <div className="space-y-2">
        {aiInsights.actions.map((action, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 + i * 0.07 }}
            whileHover={{ x: 4 }}
            className="w-full flex items-start gap-3 p-3 rounded-xl bg-secondary/40 hover:bg-secondary/70 border border-white/[0.04] hover:border-pink/30 transition-all text-left group"
          >
            <span className={cn(
              "shrink-0 h-5 w-5 rounded-full grid place-items-center text-[10px] font-bold mt-0.5",
              "bg-gradient-cosmic text-primary-foreground"
            )}>
              {i + 1}
            </span>
            <span className="flex-1 text-xs leading-relaxed text-foreground/85">{action}</span>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-pink transition-colors mt-0.5 shrink-0" />
          </motion.button>
        ))}
      </div>
    </div>
  </motion.div>
);
