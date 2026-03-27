import { Search, Download, Ban, Shield } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const historyData = [
  { domain: "google.com", time: "10:42:01", status: "resolved", device: "MacBook Pro M3", latency: "6ms" },
  { domain: "youtube.com", time: "10:38:22", status: "resolved", device: "iPad Air", latency: "9ms" },
  { domain: "adult-site.xyz", time: "10:35:14", status: "blocked", device: "iPad Air", latency: "--" },
  { domain: "khanacademy.org", time: "10:20:45", status: "resolved", device: "MacBook Pro M3", latency: "12ms" },
  { domain: "phishing-bank.net", time: "10:15:33", status: "blocked", device: "iPhone 15 Pro", latency: "--" },
  { domain: "wikipedia.org", time: "10:02:11", status: "resolved", device: "Main Desktop", latency: "8ms" },
  { domain: "spam-ads.click", time: "09:55:48", status: "blocked", device: "Smart TV", latency: "--" },
  { domain: "instagram.com", time: "09:50:22", status: "resolved", device: "iPhone 15 Pro", latency: "14ms" },
  { domain: "malware-site.xyz", time: "09:42:05", status: "blocked", device: "Main Desktop", latency: "--" },
  { domain: "github.com", time: "09:30:18", status: "resolved", device: "MacBook Pro M3", latency: "7ms" },
];

const BrowseHistory = () => {
  const [search, setSearch] = useState("");
  const filtered = historyData.filter((h) => h.domain.includes(search.toLowerCase()) || h.device.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Traffic Logs</h1>
          <p className="text-muted-foreground text-sm">Complete DNS query history across all devices</p>
        </div>
        <button className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors">
          Export CSV <Download className="w-3 h-3" />
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          placeholder="Search by domain or device..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full surface-highest rounded-xl pl-9 pr-4 py-2.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      <div className="surface-container rounded-2xl p-6">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-6 px-1 mb-3">
          {["Timestamp", "Target Domain", "Device", "Result", "Latency"].map(h => (
            <span key={h} className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">{h}</span>
          ))}
        </div>

        <div className="space-y-0.5">
          {filtered.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-6 px-1 py-3 rounded-lg hover:surface-low transition-colors items-center">
              <span className="text-xs text-muted-foreground font-mono">{item.time}</span>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${item.status === "blocked" ? "bg-destructive" : "bg-primary"}`} />
                <span className="text-sm font-medium text-primary">{item.domain}</span>
              </div>
              <span className="text-sm text-muted-foreground">{item.device}</span>
              <span className={`text-[10px] uppercase tracking-[0.1em] font-medium px-2.5 py-1 rounded-md ${
                item.status === "blocked" ? "bg-destructive/15 text-destructive" : "surface-highest text-muted-foreground"
              }`}>
                {item.status}
              </span>
              <span className="text-xs text-muted-foreground text-right w-12">{item.latency}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid hsl(0 0% 15%)" }}>
          <span className="text-xs text-muted-foreground">Showing {filtered.length} entries</span>
          <div className="flex gap-3">
            <button className="text-xs text-muted-foreground">Previous</button>
            <button className="text-xs text-primary font-medium">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseHistory;
