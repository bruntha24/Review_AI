import { motion } from "framer-motion";
import {
  Sparkles,
  Search,
  Bell,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Menu,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";

interface TopNavProps {
  onToggleSidebar: () => void;
}

export const TopNav = ({ onToggleSidebar }: TopNavProps) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-background/70 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">

        {/* LEFT: Logo + Menu */}
        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden h-10 w-10 grid place-items-center rounded-xl bg-secondary/60 border border-white/[0.06]"
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Logo */}
          <button
            onClick={onToggleSidebar}
            className="flex items-center gap-2.5 group"
          >
            <motion.div
              whileHover={{ rotate: 12, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-cosmic shadow-glow"
            >
              <Sparkles className="h-4.5 w-4.5 text-primary-foreground" />
              <div className="absolute inset-0 rounded-xl bg-gradient-cosmic opacity-50 blur-md -z-10" />
            </motion.div>

            <div className="hidden sm:block text-left">
              <div className="font-display text-lg font-bold">
                Review<span className="gradient-text">AI</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Intelligence
              </div>
            </div>
          </button>
        </div>

        {/* CENTER: Search (desktop) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-auto">
          <div className="relative group w-full">
            <div className="relative flex items-center gap-2 px-4 h-10 rounded-xl bg-secondary/60 border border-white/[0.06] focus-within:border-primary/40 transition-colors">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search reviews, products..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <kbd className="px-1.5 h-5 rounded bg-background/60 border text-[10px] text-muted-foreground">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH TOGGLE */}
        <button
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          className="md:hidden h-10 w-10 grid place-items-center rounded-xl bg-secondary/60 border border-white/[0.06]"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 ml-auto">

          {/* Bell */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative h-10 w-10 grid place-items-center rounded-xl bg-secondary/60 border border-white/[0.06]"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-pink animate-pulse" />
          </motion.button>

          {/* USER MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 pl-1.5 pr-2.5 h-10 rounded-xl bg-secondary/60 border border-white/[0.06]">
                <div className="h-7 w-7 rounded-lg bg-gradient-aurora grid place-items-center text-xs font-semibold text-primary-foreground">
                  AK
                </div>
                <div className="hidden md:block text-left leading-tight">
                  <div className="text-xs font-medium">Bruntha</div>
                  <div className="text-[10px] text-muted-foreground">
                    Pro Plan
                  </div>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 glass-card">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* MOBILE SEARCH DROPDOWN */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center gap-2 px-4 h-10 rounded-xl bg-secondary/60 border border-white/[0.06]">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>
      )}
    </header>
  );
};