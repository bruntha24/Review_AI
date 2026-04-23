import { motion } from "framer-motion";
import { Star, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { reviews, type Review, type Platform, type Sentiment } from "@/data/mockData";
import { cn } from "@/lib/utils";

const platformStyle: Record<Platform, string> = {
  Amazon: "bg-warning/15 text-warning border-warning/30",
  Flipkart: "bg-accent/15 text-accent border-accent/30",
  Shopify: "bg-success/15 text-success border-success/30",
};

const sentimentStyle: Record<Sentiment, { dot: string; text: string; bg: string }> = {
  Positive: { dot: "bg-success", text: "text-success", bg: "bg-success/10" },
  Neutral: { dot: "bg-muted-foreground", text: "text-muted-foreground", bg: "bg-muted/30" },
  Negative: { dot: "bg-destructive", text: "text-destructive", bg: "bg-destructive/10" },
};

const Stars = ({ count }: { count: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={cn(
          "h-3.5 w-3.5",
          i <= count ? "fill-warning text-warning" : "fill-muted/40 text-muted/40"
        )}
      />
    ))}
  </div>
);

const ReviewCard = ({ review, index }: { review: Review; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const truncated = review.text.length > 160;
  const sent = sentimentStyle[review.sentiment];

  const renderText = () => {
    let text = expanded || !truncated ? review.text : review.text.slice(0, 160) + "…";
    const parts: React.ReactNode[] = [text];

    review.keywords.forEach((kw) => {
      const next: React.ReactNode[] = [];

      parts.forEach((part) => {
        if (typeof part !== "string") return next.push(part);

        const split = part.split(new RegExp(`(${kw.text})`, "i"));

        split.forEach((s, i) => {
          if (s.toLowerCase() === kw.text.toLowerCase()) {
            next.push(
              <mark
                key={`${kw.text}-${i}-${Math.random()}`}
                className={cn(
                  "rounded px-1 py-0.5 mx-0.5 text-xs font-medium border",
                  kw.tone === "negative"
                    ? "text-destructive border-destructive/30 bg-destructive/10"
                    : "text-success border-success/30 bg-success/10"
                )}
              >
                {s}
              </mark>
            );
          } else {
            next.push(s);
          }
        });
      });

      parts.length = 0;
      parts.push(...next);
    });

    return parts;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="glass-card glow-border p-5 group"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-aurora grid place-items-center text-xs font-semibold text-primary-foreground">
          {review.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold">{review.author}</span>
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md border", platformStyle[review.platform])}>
              {review.platform}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <Stars count={review.rating} />
            <span className="text-[11px] text-muted-foreground">
              · {review.product} · {review.date}
            </span>
          </div>
        </div>

        <div className={cn("flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-semibold", sent.bg, sent.text)}>
          <span className={cn("h-1.5 w-1.5 rounded-full", sent.dot)} />
          {review.sentiment}
        </div>

        <button className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 grid place-items-center rounded-lg hover:bg-secondary text-muted-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <p className="text-sm text-foreground/85 leading-relaxed">
        {renderText()}
      </p>

      {truncated && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs font-semibold text-primary hover:text-primary-glow"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </motion.div>
  );
};

export const ReviewsFeed = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="lg:col-span-2 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">Recent Reviews</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Live feed across all connected platforms
          </p>
        </div>

        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs font-semibold text-primary hover:text-primary-glow"
        >
          {showAll ? "Show less ↑" : "View all →"}
        </button>
      </div>

      {/* ✅ KEY CHANGE HERE */}
      <div
        className={cn(
          "space-y-3 pr-1 transition-all duration-300",
          showAll ? "h-auto overflow-visible" : "max-h-[820px] overflow-y-auto scrollbar-thin"
        )}
      >
        {visibleReviews.map((r, i) => (
          <ReviewCard key={r.id} review={r} index={i} />
        ))}
      </div>
    </motion.div>
  );
};