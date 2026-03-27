import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User, Eye, EyeOff, Shield, Zap, Filter } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  const strength = password.length > 12 ? "Authoritative" : password.length > 8 ? "Moderate" : password.length > 0 ? "Weak" : "";

  return (
    <div className="min-h-screen flex surface-base">
      {/* Left - Features */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">GuardianDNS</h1>
          <p className="text-muted-foreground text-sm mt-1">The Silent Sentinel of your digital perimeter.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4 max-w-lg"
        >
          {[
            { icon: Shield, title: "Encrypted Queries", desc: "DNS-over-TLS ensures your browsing habits remain yours alone." },
            { icon: Zap, title: "Ultra-Low Latency", desc: "Global anycast network delivering sub-10ms response times." },
            { icon: Filter, title: "Smart Blocklists", desc: "Automatically neutralize 2M+ known malicious domains." },
          ].map((f, i) => (
            <div key={i} className={`surface-container rounded-2xl p-6 ghost-border ${i === 2 ? "col-span-1" : ""}`}>
              <div className="w-10 h-10 rounded-xl surface-high flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-primary text-sm">{f.title}</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{f.desc}</p>
            </div>
          ))}
          <div className="surface-container rounded-2xl p-6 ghost-border flex items-end">
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Zero Trust Standard</p>
          </div>
        </motion.div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full surface-highest ghost-border" />)}
          </div>
          <p className="text-xs text-muted-foreground">Trusted by 50k+ security engineers worldwide.</p>
        </div>
      </div>

      {/* Right - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm space-y-6"
        >
          <div>
            <h2 className="text-3xl font-bold text-primary">Begin Protection</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Create your administrative identity to secure your network.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Full Identity</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  placeholder="Johnathan Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full surface-lowest rounded-xl pl-10 pr-4 py-3 text-sm text-primary placeholder:text-muted-foreground ghost-border focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="admin@network.local"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full surface-lowest rounded-xl pl-10 pr-4 py-3 text-sm text-primary placeholder:text-muted-foreground ghost-border focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Master Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full surface-lowest rounded-xl pl-10 pr-10 py-3 text-sm text-primary placeholder:text-muted-foreground ghost-border focus:outline-none focus:border-primary/50"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-1 flex-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-0.5 flex-1 rounded-full ${i <= (password.length > 12 ? 4 : password.length > 8 ? 3 : 1) ? "bg-primary" : "bg-border"}`} />
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-foreground">Strength: {strength}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl gradient-silver text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Establish Connection →
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already an administrator?{" "}
            <Link to="/" className="text-primary font-semibold hover:underline">Sign In</Link>
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Enterprise Auth</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 rounded-xl surface-highest text-sm font-medium text-primary flex items-center justify-center gap-2 hover:opacity-90">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                Google
              </button>
              <button className="flex-1 py-2.5 rounded-xl surface-highest text-sm font-medium text-primary flex items-center justify-center gap-2 hover:opacity-90">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
