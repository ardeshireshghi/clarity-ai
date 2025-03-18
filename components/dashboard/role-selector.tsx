"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { UserRole } from "@/lib/types";

interface RoleSelectorProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roleLabels: Record<UserRole, string> = {
  "engineering-manager": "Engineering Manager",
  "product-manager": "Product Manager",
  "director": "Director/VP",
};

export function RoleSelector({ currentRole, onRoleChange }: RoleSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="glass-card text-default bg-white/30 w-[200px] justify-between border-0">
          {roleLabels[currentRole]}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(roleLabels).map(([role, label]) => (
          <DropdownMenuItem
            key={role}
            onClick={() => onRoleChange(role as UserRole)}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}