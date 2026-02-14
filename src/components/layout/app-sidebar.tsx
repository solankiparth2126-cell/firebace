"use client"

import { LayoutDashboard, ReceiptText, NotebookTabs, LogOut, Settings, Wallet, FileUp, ShieldAlert, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  { title: "Transactions", icon: ReceiptText, url: "/transactions" },
  { title: "Ledgers", icon: NotebookTabs, url: "/ledgers" },
  { title: "Import Statement", icon: FileUp, url: "/import" },
]

export function AppSidebar() {
  const pathname = usePathname()
  
  // Simulation: We assume the user is an admin if they've interacted with admin features
  // In a real app, this would come from a useUser() hook with roles
  const isAdmin = true 

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight group-data-[collapsible=icon]:hidden">MoneyFlow</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="text-orange-600 font-bold uppercase text-[10px]">Admin Controls</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === '/admin'} 
                    tooltip="Admin Panel"
                    className="hover:bg-orange-50 hover:text-orange-700"
                  >
                    <Link href="/admin">
                      <ShieldAlert className="text-orange-600" />
                      <span className="font-semibold">Master Admin</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout" className="text-destructive hover:text-destructive">
              <Link href="/login">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}