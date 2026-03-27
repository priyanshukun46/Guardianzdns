import { LayoutDashboard, BarChart3, Layers, Ban, CheckCircle, Monitor, HelpCircle, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/home", icon: LayoutDashboard },
  { title: "Statistics", url: "/statistics", icon: BarChart3 },
  { title: "Categories", url: "/catalog", icon: Layers },
  { title: "Blocklist", url: "/blocklist", icon: Ban },
  { title: "Whitelist", url: "/whitelist", icon: CheckCircle },
  { title: "Devices", url: "/devices", icon: Monitor },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar">
        {/* Logo */}
        <div className="p-5 pb-8">
          <h1 className={`font-extrabold tracking-tight text-primary ${collapsed ? "text-sm" : "text-base"}`}>
            {collapsed ? "G" : "GUARDIANDNS"}
          </h1>
          {!collapsed && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
              Secure Network
            </p>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/home"}
                      className="hover:bg-sidebar-accent transition-colors rounded-lg"
                      activeClassName="bg-sidebar-accent text-primary font-semibold"
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom section */}
        <div className="mt-auto p-3 space-y-1">
          {/* Upgrade */}
          {/* Upgrade removed */}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-primary hover:bg-sidebar-accent transition-colors">
                  <HelpCircle className="w-4 h-4" />
                  {!collapsed && <span>Support</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-primary hover:bg-sidebar-accent transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  {!collapsed && <span>Sign Out</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
