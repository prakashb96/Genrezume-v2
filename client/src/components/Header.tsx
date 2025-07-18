import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Menu, User, LogOut } from "lucide-react";

export default function Header() {
  const { user } = useAuth();
  const [location] = useLocation();

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="text-white text-sm" />
            </div>
            <span className="text-xl font-bold text-textprimary">Genrezume</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/templates" className="text-slate-600 hover:text-textprimary transition-colors">
              Templates
            </Link>
            <Link href="/examples" className="text-slate-600 hover:text-textprimary transition-colors">
              Examples
            </Link>
            <Link href="/tips" className="text-slate-600 hover:text-textprimary transition-colors">
              Tips
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/builder">
                  <Button>Resume Builder</Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profileImageUrl || ""} alt={`${user.firstName} ${user.lastName}` || ""} />
                        <AvatarFallback>
                          {user.firstName?.charAt(0) || user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem className="flex flex-col items-start">
                      <div className="font-medium">{`${user.firstName || ""} ${user.lastName || ""}`.trim() || "User"}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={() => window.location.href = "/api/login"}>
                  Sign In
                </Button>
              </div>
            )}
          </nav>

          <Button variant="ghost" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
