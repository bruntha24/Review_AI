import { motion } from "framer-motion";
import { Calendar, Filter, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const platforms = [
  { id: "all", label: "All" },
  { id: "amazon", label: "Amazon" },
  { id: "flipkart", label: "Flipkart" },
  { id: "shopify", label: "Shopify" },
];

const ratings = ["All", "5★", "4★", "3★", "2★", "1★"];

export const Filters = () => {
  const [platform, setPlatform] = useState("all");
  const [rating, setRating] = useState("All");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card p-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
    >
      {/* Title */}
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
        <Filter className="h-3.5 w-3.5" />
        Filters
      </div>

      {/* Platform Filters (Scrollable on Mobile) */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/60 border border-white/[0.06] min-w-max">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className={cn(
                "relative px-3 h-8 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
                platform === p.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {platform === p.id && (
                <motion.div
                  layoutId="activePlatform"
                  className="absolute inset-0 rounded-lg bg-gradient-cosmic shadow-glow"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filters (Scrollable on Mobile) */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/60 border border-white/[0.06] min-w-max">
          <Star className="h-3.5 w-3.5 text-warning ml-1.5" />
          {ratings.map((r) => (
            <button
              key={r}
              onClick={() => setRating(r)}
              className={cn(
                "relative px-3 h-8 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
                rating === r
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {rating === r && (
                <motion.div
                  layoutId="activeRating"
                  className="absolute inset-0 rounded-lg bg-secondary"
                />
              )}
              <span className="relative">{r}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Date Button */}
      <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 h-10 rounded-xl bg-secondary/60 border border-white/[0.06] hover:border-primary/40 text-xs font-medium transition-colors">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        Last 30 days
      </button>
    </motion.div>
  );
};