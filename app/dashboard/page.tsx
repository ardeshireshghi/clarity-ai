'use client';

import { useState } from 'react';
import { DashboardFilters, UserRole } from '@/lib/types';
import { RoleSelector } from '@/components/dashboard/role-selector';
import { QuickFilters } from '@/components/dashboard/quick-filters';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

// Use dynamic imports with no SSR for role views
const EngineeringManagerView = dynamic(
  () => import('@/components/dashboard/role-views/engineering-manager-view').then(mod => mod.EngineeringManagerView),
  { ssr: false }
);

const ProductManagerView = dynamic(
  () => import('@/components/dashboard/role-views/product-manager-view').then(mod => mod.ProductManagerView),
  { ssr: false }
);

const DirectorView = dynamic(
  () => import('@/components/dashboard/role-views/director-view').then(mod => mod.DirectorView),
  { ssr: false }
);

export default function Dashboard() {
  const [role, setRole] = useState<UserRole>('engineering-manager');
  const [filters, setFilters] = useState<DashboardFilters>({
    timeRange: 'week',
  });

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Project Overview</h1>
            <p className="text-foreground">
              Monitor project health and team performance
            </p>
          </div>
          <Link href="/projects/">
            <Button className="glass-button">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <RoleSelector currentRole={role} onRoleChange={setRole} />
          <QuickFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        <div className="role-view-container">
          {role === 'engineering-manager' && <EngineeringManagerView />}
          {role === 'product-manager' && <ProductManagerView />}
          {role === 'director' && <DirectorView />}
        </div>
      </div>
    </div>
  );
}
