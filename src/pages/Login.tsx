import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex surface-base">
      {/* Left - Branding */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-full surface-container flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-bold text-primary tracking-tight">GuardianDNS</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-primary leading-[1.1] tracking-tight">
              The Silent<br />
              <span className="text-on-surface-variant">Sentinel.</span>
            </h1>
            <p className="text-on-surface-variant text-base mt-6 max-w-md leading-relaxed">
              Advanced network resolution engineered for privacy.
              Experience architectural-grade security through
              subtractive elegance and deep tonal control.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <div className="surface-container rounded-2xl p-6 flex-1 ghost-border">
            <p className="text-2xl font-bold text-primary">99.9%</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">Uptime Guard</p>
          </div>
          <div className="surface-container rounded-2xl p-6 flex-1 ghost-border">
            <p className="text-2xl font-bold text-primary">0.2ms</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">Query Latency</p>
          </div>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="surface-container-low rounded-3xl p-8 ghost-border space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary">Access Vault</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Secure authentication required for network access.
              </p>
            </div>

            {/* Google */}
            <button
              onClick={() => navigate("/home")}
              className="w-full py-3 rounded-xl surface-highest text-sm font-medium text-primary flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Or Email</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Identity</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="operator@network.local"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full surface-lowest rounded-xl pl-10 pr-4 py-3 text-sm text-primary placeholder:text-muted-foreground ghost-border focus:outline-none focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Passkey</label>
                  <button type="button" className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-primary">Forgotten?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full surface-lowest rounded-xl pl-10 pr-10 py-3 text-sm text-primary placeholder:text-muted-foreground ghost-border focus:outline-none focus:border-primary/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl gradient-silver text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Sign In to Dashboard
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              New operator?{" "}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Provision account
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Encrypted Session</span>
            </div>
            <span className="text-[10px] text-muted-foreground">V2.4.0-STABLE</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
