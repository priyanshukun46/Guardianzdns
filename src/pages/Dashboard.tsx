import { Shield, ShieldCheck, Zap, Ban } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const chartData = [
  { name: "00:00", threats: 45 }, { name: "03:00", threats: 22 }, { name: "06:00", threats: 78 },
  { name: "09:00", threats: 120 }, { name: "12:00", threats: 95 }, { name: "15:00", threats: 150 },
  { name: "18:00", threats: 88 }, { name: "21:00", threats: 65 }, { name: "23:59", threats: 40 },
];

const recentTraffic = [
  { domain: "api.analytics.google.com", device: "MacBook Pro M3", status: "clean" },
  { domain: "malicious-tracker-x.ru", device: "iPhone 15 Pro", status: "blocked" },
  { domain: "updates.apple.com", device: "iPad Air", status: "clean" },
  { domain: "tracking.ad-network.com", device: "Home Assistant Hub", status: "filtered" },
];

const Dashboard = () => {
  const [layers, setLayers] = useState({ malware: true, adblock: true, safesearch: true, privacy: false });
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Network Overview</h1>
        <p className="text-muted-foreground text-sm">Real-time DNS protection status</p>
      </div>

      {/* Hero + Stats row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 surface-container rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 surface-highest rounded-full px-3 py-1 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-primary font-medium">System Active</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-primary leading-tight">
                Your network is<br />fully secured.
              </h2>
              <p className="text-sm text-muted-foreground mt-4 max-w-md">
                GuardianDNS has intercepted 1,429 threats in the last 24 hours across 12 connected devices.
              </p>
            </div>
            <div className="hidden md:flex w-20 h-20 rounded-3xl surface-high items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
          </div>

          <div className="absolute top-4 right-4 text-[10px] text-muted-foreground surface-highest rounded-full px-3 py-1">100%</div>
        </motion.div>

        {/* Side stats */}
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="surface-container rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Blocked Queries</span>
              <Ban className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold text-primary mt-2">24.8%</p>
            <p className="text-xs text-muted-foreground mt-1">+2.4% from last week</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="surface-container rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Response Time</span>
              <Zap className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold text-primary mt-2">14ms</p>
            <p className="text-xs text-muted-foreground mt-1">Ultra-low latency active</p>
          </motion.div>
        </div>
      </div>

      {/* Chart + Protection Layers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 surface-container rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-primary">Threat Activity</h3>
              <p className="text-xs text-muted-foreground">Malware & Phishing attempts over time</p>
            </div>
            <div className="flex gap-1">
              <button className="px-3 py-1 rounded-lg surface-highest text-xs text-primary font-medium">24H</button>
              <button className="px-3 py-1 rounded-lg text-xs text-muted-foreground hover:text-primary">7D</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(0,0%,12%)", border: "none", borderRadius: 12, color: "hsl(0,0%,90%)" }} />
              <Bar dataKey="threats" fill="hsl(0,0%,100%)" radius={[4, 4, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="surface-container rounded-2xl p-6">
          <h3 className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium mb-5">Protection Layers</h3>
          <div className="space-y-5">
            {[
              { key: "malware", icon: Shield, label: "Malware Shield" },
              { key: "adblock", icon: Ban, label: "Ad Blocking" },
              { key: "safesearch", icon: ShieldCheck, label: "Safe Search" },
              { key: "privacy", icon: Zap, label: "Strict Privacy" },
            ].map((l) => (
              <div key={l.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg surface-high flex items-center justify-center">
                    <l.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-primary">{l.label}</span>
                </div>
                <Switch
                  checked={layers[l.key as keyof typeof layers]}
                  onCheckedChange={(v) => setLayers({ ...layers, [l.key]: v })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Traffic */}
      <div className="surface-container rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-primary">Real-time Traffic</h3>
          <button onClick={() => navigate("/history")} className="text-xs text-muted-foreground hover:text-primary transition-colors">View All Logs</button>
        </div>

        <div className="grid grid-cols-[1fr_auto_auto] gap-6 px-1 mb-3">
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Destination</span>
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Device</span>
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Status</span>
        </div>

        <div className="space-y-1">
          {recentTraffic.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-[1fr_auto_auto] gap-6 px-1 py-3 rounded-lg hover:surface-low transition-colors items-center"
            >
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${item.status === "blocked" ? "bg-destructive" : "bg-primary"}`} />
                <span className="text-sm text-primary">{item.domain}</span>
              </div>
              <span className="text-sm text-muted-foreground">{item.device}</span>
              <span className={`text-[10px] uppercase tracking-[0.1em] font-medium px-2.5 py-1 rounded-md ${
                item.status === "blocked" ? "bg-destructive/15 text-destructive" :
                item.status === "filtered" ? "surface-highest text-muted-foreground" :
                "surface-highest text-primary"
              }`}>
                {item.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
