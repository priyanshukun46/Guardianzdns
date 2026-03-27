import { Monitor, Smartphone, Tablet, Laptop, RefreshCw, Shield, EyeOff, Zap, RotateCcw, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { motion } from "framer-motion";

const initialDevices = [
  { id: "1", name: "MBP-Security-01", os: "macOS Ventura", type: "laptop", ip: "192.168.1.45", status: "active", queries: 14202 },
  { id: "2", name: "Guardian-Mobile", os: "iOS 17.2", type: "phone", ip: "192.168.1.12", status: "active", queries: 4120 },
  { id: "3", name: "Home-Desktop", os: "Windows 11", type: "desktop", ip: "192.168.1.10", status: "active", queries: 8940 },
  { id: "4", name: "iPad-Family", os: "iPadOS 17", type: "tablet", ip: "192.168.1.18", status: "idle", queries: 2310 },
];

const privacyToggles = [
  { key: "stealth", icon: EyeOff, label: "Stealth Mode", desc: "Hide node identity from LAN", defaultOn: false },
  { key: "dnssec", icon: Shield, label: "DNSSEC", desc: "Enforce cryptographic keys", defaultOn: true },
  { key: "retention", icon: RotateCcw, label: "Log Retention", desc: "Clear after 24 hours", defaultOn: true },
];

const iconMap: Record<string, typeof Monitor> = { tablet: Tablet, laptop: Laptop, desktop: Monitor, phone: Smartphone };

const ManageDevices = () => {
  const [privacy, setPrivacy] = useState<Record<string, boolean>>(
    Object.fromEntries(privacyToggles.map(t => [t.key, t.defaultOn]))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">System Control</h1>
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">Network Authority Dashboard</p>
        </div>
        <button className="px-4 py-2 rounded-xl ghost-border text-sm font-medium text-primary hover:surface-highest transition-colors">
          Deploy Update
        </button>
      </div>

      {/* Hero + Security Rating */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 surface-container rounded-2xl p-8 relative">
          <div className="inline-flex items-center gap-2 surface-highest rounded-full px-3 py-1 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-primary font-medium">System Active</span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-primary leading-tight">
                Shielding {initialDevices.length} connected<br />nodes across the secure<br />perimeter.
              </h2>
              <p className="text-sm text-muted-foreground mt-4 max-w-md">
                Your DNS filtering is currently operating with 99.9% efficiency, intercepting 2.4k malicious requests in the last hour.
              </p>
            </div>
            <div className="hidden md:flex w-16 h-16 rounded-2xl surface-high items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="surface-container rounded-2xl p-6 text-center">
          <div className="w-20 h-20 rounded-full ghost-border flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl font-bold text-primary">98</span>
          </div>
          <h3 className="font-semibold text-primary">Security Rating</h3>
          <p className="text-xs text-muted-foreground mt-1">Optimal Protection Configuration</p>
          <div className="flex justify-center gap-6 mt-5">
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Latency</span>
              <p className="text-lg font-bold text-primary">12ms</p>
            </div>
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Uptime</span>
              <p className="text-lg font-bold text-primary">100%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Privacy Toggles + Critical Override */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {initialDevices.map((device, i) => {
            const Icon = iconMap[device.type] || Monitor;
            return (
              <motion.div key={device.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
                className="surface-container rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group hover:border-primary/20 border border-transparent transition-colors">
                {/* Background glow effect */}
                <div className="absolute -inset-24 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl surface-high shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full surface-highest border border-white/5">
                    <div className={`w-1.5 h-1.5 rounded-full ${device.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`} />
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">{device.status}</span>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="font-bold text-primary text-lg truncate mb-1">{device.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs font-medium text-muted-foreground">{device.os}</p>
                    <p className="text-[11px] font-mono text-muted-foreground/60">{device.ip}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="surface-container rounded-2xl p-6">
            <h3 className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium mb-5">Privacy Toggles</h3>
            <div className="space-y-5">
              {privacyToggles.map((t) => (
                <div key={t.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg surface-high flex items-center justify-center">
                      <t.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="text-sm text-primary">{t.label}</span>
                      <p className="text-[10px] text-muted-foreground">{t.desc}</p>
                    </div>
                  </div>
                  <Switch checked={privacy[t.key]} onCheckedChange={(v) => setPrivacy({ ...privacy, [t.key]: v })} />
                </div>
              ))}
            </div>
          </div>

          <div className="surface-container rounded-2xl p-6" style={{ borderLeft: "2px solid hsl(0 72% 55%)" }}>
            <h3 className="text-[10px] uppercase tracking-[0.15em] text-destructive font-medium mb-3">Critical Overrides</h3>
            <button className="w-full py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              Flush All DNS Cache
            </button>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">Warning: This will disrupt network resolution temporarily.</p>
          </div>
        </div>
      </div>

      {/* Active Nodes */}
      <div className="surface-container rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-primary">Active Nodes</h3>
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3" /> Refresh: 2m ago
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-6 px-1 mb-3">
          {["Node Device", "IP Address", "Status", "Queries"].map(h => (
            <span key={h} className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">{h}</span>
          ))}
        </div>

        <div className="space-y-1">
          {initialDevices.map((device, i) => {
            const Icon = iconMap[device.type] || Monitor;
            return (
              <motion.div key={device.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="grid grid-cols-[1fr_auto_auto_auto] gap-6 px-1 py-4 rounded-lg hover:surface-low transition-colors items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg surface-high flex items-center justify-center">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">{device.name}</p>
                    <p className="text-[10px] text-muted-foreground">{device.os}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground font-mono">{device.ip}</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground uppercase">{device.status}</span>
                </div>
                <span className="text-sm font-bold text-primary text-right">{device.queries.toLocaleString()}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageDevices;
