import { useState } from "react";
import { ShieldCheck, Plus, Trash2, Search, Globe } from "lucide-react";
import { motion } from "framer-motion";

const initialWhitelist = [
  { id: "1", domain: "internal.corp.local", note: "Static Priority", addedAt: "2026-03-20" },
  { id: "2", domain: "api.guardian.io", note: "Admin Access", addedAt: "2026-03-18" },
  { id: "3", domain: "google.com", note: "Search Engine", addedAt: "2026-03-15" },
  { id: "4", domain: "wikipedia.org", note: "Encyclopedia", addedAt: "2026-03-12" },
];

const Whitelist = () => {
  const [items, setItems] = useState(initialWhitelist);
  const [newDomain, setNewDomain] = useState("");
  const [search, setSearch] = useState("");

  const addDomain = () => {
    if (!newDomain.trim()) return;
    setItems([{ id: Date.now().toString(), domain: newDomain, note: "Custom", addedAt: new Date().toISOString().split("T")[0] }, ...items]);
    setNewDomain("");
  };

  const removeDomain = (id: string) => setItems(items.filter((i) => i.id !== id));
  const filtered = items.filter((i) => i.domain.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" /> Trust Zone
        </h1>
        <p className="text-muted-foreground text-sm">Domains that bypass all filtering rules</p>
      </div>

      <div className="surface-container rounded-2xl p-6">
        <h3 className="font-semibold text-primary mb-4">Trusted Domains</h3>

        {/* Add domain */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="domain.com"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addDomain()}
              className="w-full surface-lowest rounded-xl pl-9 pr-4 py-2.5 text-sm text-primary placeholder:text-muted-foreground ghost-border focus:outline-none focus:border-primary/50"
            />
          </div>
          <button onClick={addDomain} className="w-10 h-10 rounded-xl surface-highest flex items-center justify-center text-primary hover:opacity-80 transition-opacity">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search trusted domains..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full surface-lowest rounded-xl pl-9 pr-4 py-2.5 text-sm text-primary placeholder:text-muted-foreground ghost-border focus:outline-none"
          />
        </div>

        {/* List */}
        <div className="space-y-1">
          {filtered.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between py-3 px-3 rounded-xl hover:surface-low transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg surface-high flex items-center justify-center">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">{item.domain}</p>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{item.note}</p>
                </div>
              </div>
              <button onClick={() => removeDomain(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
          {filtered.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">No domains found</p>}
        </div>
      </div>
    </div>
  );
};

export default Whitelist;
