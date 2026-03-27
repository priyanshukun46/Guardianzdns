import { Gamepad2, Share2, Tv, Ban, Dice5, Search, ShieldCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  { id: "gaming", name: "Gaming", description: "Block game servers and launcher traffic network-wide.", icon: Gamepad2, defaultOn: true },
  { id: "social", name: "Social Media", description: "Restrict access to platforms like Facebook, X, and TikTok.", icon: Share2, defaultOn: true },
  { id: "streaming", name: "Streaming", description: "Filter high-bandwidth video and audio streaming services.", icon: Tv, defaultOn: false },
  { id: "adult", name: "Adult Content", description: "Force safety filters and block all identified adult domains.", icon: Ban, defaultOn: true },
  { id: "gambling", name: "Gambling", description: "Restrict access to online casinos and betting sites.", icon: Dice5, defaultOn: true },
];

const Catalog = () => {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map((c) => [c.id, c.defaultOn]))
  );
  const activeCount = Object.values(toggles).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Category Control</h1>
          <p className="text-muted-foreground text-sm">Define the boundaries of your digital environment.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Search categories..." className="surface-highest rounded-xl pl-9 pr-4 py-2 text-sm text-primary placeholder:text-muted-foreground focus:outline-none w-56" />
        </div>
      </div>

      {/* Hero status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 surface-container rounded-2xl p-8">
          <div className="inline-flex items-center gap-2 surface-highest rounded-full px-3 py-1 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-primary font-medium">System Status: Active</span>
          </div>
          <h2 className="text-3xl font-bold text-primary leading-tight">
            Your shield is set to <span className="text-primary">Strict</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-md">
            Comprehensive filtering is enabled across all network nodes. High-risk categories are automatically mitigated.
          </p>
          <div className="mt-6">
            <button className="px-5 py-2.5 rounded-xl surface-highest text-sm font-medium text-primary hover:opacity-80 transition-opacity">
              Change Mode
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="surface-container rounded-2xl p-6">
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Active Blockage</span>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-4xl font-bold text-primary">{activeCount * 4}</p>
            <span className="text-base text-muted-foreground">Categories</span>
            <span className="text-[10px] uppercase tracking-[0.1em] surface-highest text-muted-foreground px-2 py-0.5 rounded-md ml-auto">Global</span>
          </div>
          <div className="w-full h-0.5 bg-primary mt-6 rounded-full" />
          <p className="text-xs text-muted-foreground mt-3">
            72% of predefined risk categories are currently being intercepted by the DNS resolver.
          </p>
        </motion.div>
      </div>

      {/* Category Cards */}
      <div>
        <h3 className="font-semibold text-primary mb-4">Category Filtering</h3>
        <p className="text-xs text-muted-foreground mb-5">Toggle entire network segments on or off.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="surface-container rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl surface-high flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <Switch
                  checked={toggles[cat.id]}
                  onCheckedChange={(v) => setToggles({ ...toggles, [cat.id]: v })}
                />
              </div>
              <h4 className="font-semibold text-primary text-sm">{cat.name}</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{cat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
