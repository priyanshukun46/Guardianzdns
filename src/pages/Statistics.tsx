import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Shield, Zap, Download } from "lucide-react";
import { motion } from "framer-motion";

const dailyData = [
  { name: "Mon", blocked: 1800 }, { name: "Tue", blocked: 2200 }, { name: "Wed", blocked: 1950 },
  { name: "Thu", blocked: 3600 }, { name: "Fri", blocked: 2800 }, { name: "Sat", blocked: 3100 }, { name: "Sun", blocked: 2400 },
];

const trafficLogs = [
  { time: "14:22:01", domain: "api.analytics-tracker.net", device: 'MacBook Pro 16"', result: "blocked", latency: "--" },
  { time: "14:21:58", domain: "github.com", device: "Main Desktop", result: "resolved", latency: "8ms" },
  { time: "14:21:45", domain: "s3.amazonaws.com", device: "iPhone 15 Pro", result: "resolved", latency: "14ms" },
  { time: "14:20:12", domain: "pixel.google.com", device: "Smart TV (Kitchen)", result: "blocked", latency: "--" },
  { time: "14:19:55", domain: "notion.so", device: 'MacBook Pro 16"', result: "resolved", latency: "11ms" },
];

const Statistics = () => {
  const [timeRange, setTimeRange] = useState<"24h" | "7d">("7d");

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-primary tracking-tight uppercase leading-none">
            Network<br />Activity
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-md">
            Real-time analysis of your network's security posture and traffic distribution over the last 24 hours.
          </p>
        </div>
        <div className="flex gap-1">
          <button onClick={() => setTimeRange("24h")} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${timeRange === "24h" ? "surface-highest text-primary" : "text-muted-foreground hover:text-primary"}`}>
            Last 24h
          </button>
          <button onClick={() => setTimeRange("7d")} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${timeRange === "7d" ? "surface-highest text-primary" : "text-muted-foreground hover:text-primary"}`}>
            7 Days
          </button>
        </div>
      </div>

      {/* Stats + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 surface-container rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Blocked Requests</span>
              <div className="flex items-baseline gap-3 mt-1">
                <p className="text-3xl font-bold text-primary">14,802</p>
                <span className="text-xs text-muted-foreground">↗ 12.4%</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dailyData}>
              <XAxis dataKey="name" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(0,0%,12%)", border: "none", borderRadius: 12, color: "hsl(0,0%,90%)" }} />
              <Bar dataKey="blocked" fill="hsl(0,0%,100%)" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="surface-container rounded-2xl p-6">
            <Shield className="w-5 h-5 text-primary mb-3" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">System Health</span>
            <p className="text-2xl font-bold text-primary mt-1">Optimal</p>
            <div className="w-full h-0.5 bg-primary mt-4 rounded-full" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="surface-container rounded-2xl p-6">
            <Zap className="w-5 h-5 text-primary mb-3" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Avg Response Time</span>
            <p className="text-2xl font-bold text-primary mt-1">12<span className="text-base font-normal text-muted-foreground ml-1">ms</span></p>
            <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
              "Exceeds 98% of global ISP resolution speeds."
            </p>
          </motion.div>
        </div>
      </div>

      {/* Traffic Logs */}
      <div className="surface-container rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-primary">Recent Traffic Logs</h3>
          <button className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1.5">
            Export CSV <Download className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-6 px-1 mb-3">
          {["Timestamp", "Target Domain", "Device", "Result", "Latency"].map(h => (
            <span key={h} className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">{h}</span>
          ))}
        </div>

        <div className="space-y-0.5">
          {trafficLogs.map((log, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-6 px-1 py-3 rounded-lg hover:surface-low transition-colors items-center">
              <span className="text-xs text-muted-foreground font-mono">{log.time}</span>
              <span className="text-sm font-medium text-primary">{log.domain}</span>
              <span className="text-sm text-muted-foreground">{log.device}</span>
              <span className={`text-[10px] uppercase tracking-[0.1em] font-medium px-2.5 py-1 rounded-md ${
                log.result === "blocked" ? "bg-destructive/15 text-destructive" : "surface-highest text-muted-foreground"
              }`}>
                {log.result}
              </span>
              <span className="text-xs text-muted-foreground text-right w-12">{log.latency}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid hsl(0 0% 15%)" }}>
          <span className="text-xs text-muted-foreground">Showing 5 of 1,244 entries</span>
          <div className="flex gap-3">
            <button className="text-xs text-muted-foreground">Previous</button>
            <button className="text-xs text-primary font-medium">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
