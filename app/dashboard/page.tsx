'use client';

import { useState } from 'react';
import { DashboardFilters, UserRole } from '@/lib/types';
import { RoleSelector } from '@/components/dashboard/role-selector';
import { QuickFilters } from '@/components/dashboard/quick-filters';
import { EngineeringManagerView } from '@/components/dashboard/role-views/engineering-manager-view';
import { ProductManagerView } from '@/components/dashboard/role-views/product-manager-view';
import { DirectorView } from '@/components/dashboard/role-views/director-view';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  // const [role, setRole] = useState<UserRole>('engineering-manager');
  // const [filters, setFilters] = useState<DashboardFilters>({
  //   timeRange: 'week',
  // });

  // return (
  //   <div className="p-8">
  //     <div className="max-w-7xl mx-auto space-y-8">
  //       <div className="flex items-center justify-between">
  //         <div>
  //           <h1 className="text-3xl font-bold mb-2">Project Overview</h1>
  //           <p className="text-foreground">
  //             Monitor project health and team performance
  //           </p>
  //         </div>
  //         <Link href="/projects">
  //           <Button className="glass-button">
  //             <Plus className="h-4 w-4 mr-2" />
  //             New Project
  //           </Button>
  //         </Link>
  //       </div>

  //       <div className="flex items-center justify-between">
  //         <RoleSelector currentRole={role} onRoleChange={setRole} />
  //         <QuickFilters filters={filters} onFiltersChange={setFilters} />
  //       </div>
  //       {role === 'engineering-manager' && <EngineeringManagerView />}
  //       {role === 'product-manager' && <ProductManagerView />}
  //       {role === 'director' && <DirectorView />}
  //     </div>
  //   </div>
  // );

  return null;
}
