import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { volumeData, ratingData } from "@/data/mockData";

const tooltipStyle = {
  backgroundColor: "hsl(240 22% 9% / 0.95)",
  border: "1px solid hsl(240 18% 18%)",
  borderRadius: "12px",
  padding: "8px 12px",
  fontSize: "12px",
  backdropFilter: "blur(12px)",
};

export const VolumeChart = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="glass-card p-6 lg:col-span-2"
  >
    <div className="flex items-start justify-between mb-6">
      <div>
        <h3 className="font-display text-lg font-semibold">Review Volume</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Last 10 months · all platforms</p>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary" /> Total
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-pink" /> Positive
        </span>
      </div>
    </div>

    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={volumeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradReviews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(265 89% 66%)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="hsl(265 89% 66%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradPositive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(325 95% 65%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(325 95% 65%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 18% 18%)" vertical={false} />
          <XAxis dataKey="name" stroke="hsl(240 8% 60%)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(240 8% 60%)" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "hsl(265 89% 66%)", strokeWidth: 1, strokeDasharray: "3 3" }} />
          <Area
            type="monotone"
            dataKey="reviews"
            stroke="hsl(265 89% 66%)"
            strokeWidth={2.5}
            fill="url(#gradReviews)"
          />
          <Area
            type="monotone"
            dataKey="positive"
            stroke="hsl(325 95% 65%)"
            strokeWidth={2.5}
            fill="url(#gradPositive)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

export const RatingChart = () => {
  const colors = [
    "hsl(0 85% 62%)",
    "hsl(15 85% 60%)",
    "hsl(38 95% 60%)",
    "hsl(180 70% 55%)",
    "hsl(152 76% 50%)",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-6"
    >
      <div className="mb-6">
        <h3 className="font-display text-lg font-semibold">Rating Distribution</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Breakdown by star rating</p>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ratingData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 18% 18%)" vertical={false} />
            <XAxis dataKey="rating" stroke="hsl(240 8% 60%)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(240 8% 60%)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(265 89% 66% / 0.08)" }} />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {ratingData.map((_, i) => (
                <Cell key={i} fill={colors[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
