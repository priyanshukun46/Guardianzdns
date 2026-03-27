import { useState } from "react";
import { Ban, Plus, Trash2, Search } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

const initialLists = [
  { id: "1", name: "Steven-Black/Hosts", enabled: true },
  { id: "2", name: "AdGuard DNS Filter", enabled: true },
  { id: "3", name: "Dandelion Spambot", enabled: false },
];

const initialBlocklist = [
  { id: "1", domain: "malware-site.xyz", category: "Malware", addedAt: "2026-03-20" },
  { id: "2", domain: "adult-content.com", category: "Adult", addedAt: "2026-03-18" },
  { id: "3", domain: "phishing-bank.net", category: "Phishing", addedAt: "2026-03-15" },
  { id: "4", domain: "gambling-online.io", category: "Gambling", addedAt: "2026-03-12" },
  { id: "5", domain: "spam-ads.click", category: "Spam", addedAt: "2026-03-10" },
  { id: "6", domain: "tracking-scripts.net", category: "Tracking", addedAt: "2026-03-08" },
];

const Blocklist = () => {
  const [lists, setLists] = useState(initialLists);
  const [items, setItems] = useState(initialBlocklist);
  const [newDomain, setNewDomain] = useState("");
  const [search, setSearch] = useState("");

  const addDomain = () => {
    if (!newDomain.trim()) return;
    setItems([{ id: Date.now().toString(), domain: newDomain, category: "Custom", addedAt: new Date().toISOString().split("T")[0] }, ...items]);
    setNewDomain("");
  };

  const removeDomain = (id: string) => setItems(items.filter((i) => i.id !== id));
  const filtered = items.filter((i) => i.domain.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Ban className="w-5 h-5" /> Ad-Block Core
        </h1>
        <p className="text-muted-foreground text-sm">Manage blocklists and custom blocked domains</p>
      </div>

      {/* Filter lists */}
      <div className="surface-container rounded-2xl p-6">
        <h3 className="font-semibold text-primary mb-4">Active Lists</h3>
        <div className="space-y-3">
          {lists.map((list) => (
            <div key={list.id} className="flex items-center justify-between py-2">
              <span className={`text-sm ${list.enabled ? "text-primary" : "text-muted-foreground"}`}>{list.name}</span>
              <Switch checked={list.enabled} onCheckedChange={(v) => setLists(lists.map(l => l.id === list.id ? { ...l, enabled: v } : l))} />
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2.5 rounded-xl surface-highest text-sm font-medium text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors">
          Manage Lists
        </button>
      </div>

      {/* Custom domains */}
      <div className="surface-container rounded-2xl p-6">
        <h3 className="font-semibold text-primary mb-4">Custom Blocked Domains</h3>

        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search or add domain..."
              value={newDomain || search}
              onChange={(e) => { setNewDomain(e.target.value); setSearch(e.target.value); }}
              onKeyDown={(e) => e.key === "Enter" && addDomain()}
              className="w-full surface-lowest rounded-xl pl-9 pr-4 py-2.5 text-sm text-primary placeholder:text-muted-foreground ghost-border focus:outline-none focus:border-primary/50"
            />
          </div>
          <button onClick={addDomain} className="px-4 py-2.5 rounded-xl gradient-silver text-primary-foreground text-sm font-medium flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="space-y-0.5">
          {filtered.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between py-3 px-1 rounded-lg hover:surface-low transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                <span className="text-sm font-medium text-primary">{item.domain}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{item.category}</span>
                <span className="text-xs text-muted-foreground">{item.addedAt}</span>
                <button onClick={() => removeDomain(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">No domains found</p>}
        </div>
      </div>
    </div>
  );
};

export default Blocklist;
