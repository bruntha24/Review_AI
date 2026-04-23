export type Sentiment = "Positive" | "Neutral" | "Negative";
export type Platform = "Amazon" | "Flipkart" | "Shopify";

export interface Review {
  id: string;
  author: string;
  avatar: string;
  platform: Platform;
  rating: number;
  date: string;
  text: string;
  sentiment: Sentiment;
  keywords: { text: string; tone: "positive" | "negative" }[];
  product: string;
}

export const stats = [
  { label: "Total Reviews", value: 24813, delta: 12.4, trend: "up" as const, accent: "primary" },
  { label: "Average Rating", value: 4.32, delta: 0.18, trend: "up" as const, accent: "warning", suffix: "/5" },
  { label: "Positive Sentiment", value: 72, delta: 4.6, trend: "up" as const, accent: "success", suffix: "%" },
  { label: "Negative Sentiment", value: 14, delta: 2.1, trend: "down" as const, accent: "destructive", suffix: "%" },
];

export const volumeData = [
  { name: "Jan", reviews: 1240, positive: 880 },
  { name: "Feb", reviews: 1580, positive: 1100 },
  { name: "Mar", reviews: 1820, positive: 1320 },
  { name: "Apr", reviews: 2100, positive: 1480 },
  { name: "May", reviews: 2480, positive: 1820 },
  { name: "Jun", reviews: 2780, positive: 2050 },
  { name: "Jul", reviews: 3120, positive: 2310 },
  { name: "Aug", reviews: 3460, positive: 2580 },
  { name: "Sep", reviews: 3210, positive: 2400 },
  { name: "Oct", reviews: 3780, positive: 2840 },
];

export const ratingData = [
  { rating: "1★", count: 412 },
  { rating: "2★", count: 680 },
  { rating: "3★", count: 1840 },
  { rating: "4★", count: 6920 },
  { rating: "5★", count: 14961 },
];

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Aarav Sharma",
    avatar: "AS",
    platform: "Amazon",
    rating: 5,
    date: "2h ago",
    product: "AuraPods Pro",
    text: "Absolutely love these earbuds! The noise cancellation is incredible and the sound quality is crystal clear. Battery life easily lasts a full workday and the case feels premium.",
    sentiment: "Positive",
    keywords: [
      { text: "noise cancellation", tone: "positive" },
      { text: "sound quality", tone: "positive" },
    ],
  },
  {
    id: "r2",
    author: "Priya Mehta",
    avatar: "PM",
    platform: "Flipkart",
    rating: 2,
    date: "5h ago",
    product: "AuraPods Pro",
    text: "Late delivery and the packaging was damaged on arrival. Product itself works fine but the whole experience felt rushed and unprofessional. Expected better for the price.",
    sentiment: "Negative",
    keywords: [
      { text: "late delivery", tone: "negative" },
      { text: "damaged packaging", tone: "negative" },
    ],
  },
  {
    id: "r3",
    author: "Karan Patel",
    avatar: "KP",
    platform: "Shopify",
    rating: 4,
    date: "8h ago",
    product: "Glow Hydra Serum",
    text: "Skin feels noticeably smoother after two weeks. The texture is light and absorbs quickly. Would love a larger bottle option as it runs out fast.",
    sentiment: "Positive",
    keywords: [{ text: "smooth texture", tone: "positive" }],
  },
  {
    id: "r4",
    author: "Sneha Iyer",
    avatar: "SI",
    platform: "Amazon",
    rating: 1,
    date: "1d ago",
    product: "Nimbus Backpack",
    text: "Bad quality stitching came undone within a week. The zipper is already jammed. Definitely not worth the money — looks great in photos but feels cheap in person.",
    sentiment: "Negative",
    keywords: [
      { text: "bad quality", tone: "negative" },
      { text: "broken zipper", tone: "negative" },
    ],
  },
  {
    id: "r5",
    author: "Rohan Das",
    avatar: "RD",
    platform: "Shopify",
    rating: 5,
    date: "1d ago",
    product: "Ember Coffee Maker",
    text: "Brews the perfect cup every morning. Sleek design fits beautifully on the counter and cleanup is a breeze. Customer service was also super responsive.",
    sentiment: "Positive",
    keywords: [
      { text: "great design", tone: "positive" },
      { text: "responsive support", tone: "positive" },
    ],
  },
  {
    id: "r6",
    author: "Ananya Roy",
    avatar: "AR",
    platform: "Flipkart",
    rating: 3,
    date: "2d ago",
    product: "AuraPods Pro",
    text: "Decent product overall but the touch controls are inconsistent. Sometimes a tap registers as a long press. Sound is good for the price point though.",
    sentiment: "Neutral",
    keywords: [{ text: "inconsistent controls", tone: "negative" }],
  },
];

export const aiInsights = {
  complaints: [
    { title: "Late delivery", count: 142, change: "+18%" },
    { title: "Damaged packaging", count: 96, change: "+12%" },
    { title: "Inconsistent touch controls", count: 64, change: "+7%" },
    { title: "Stitching quality", count: 38, change: "+4%" },
  ],
  highlights: [
    { title: "Crystal-clear sound quality", count: 312, change: "+24%" },
    { title: "Premium build & feel", count: 248, change: "+19%" },
    { title: "Responsive customer support", count: 184, change: "+15%" },
    { title: "Long battery life", count: 156, change: "+11%" },
  ],
  actions: [
    "Audit fulfillment partners in Tier-2 cities to reduce late deliveries.",
    "Switch to reinforced packaging for AuraPods Pro shipments.",
    "Push firmware update to fix touch-control sensitivity.",
    "Feature 5-star sound quality reviews on product page.",
  ],
};
