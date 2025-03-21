'use client';

import {
  BarChart2,
  Home,
  Settings,
  Users,
  FolderKanban,
  GitPullRequest,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navigation = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: Home,
    description: 'Project metrics and insights',
  },
  {
    name: 'Projects',
    href: '/projects',
    icon: FolderKanban,
    description: 'Manage active projects',
  },
  {
    name: 'Insights',
    href: '/insights',
    icon: BarChart2,
    description: 'Analytics and trends',
  },
  {
    name: 'Pull Requests',
    href: '/pull-requests',
    icon: GitPullRequest,
    description: 'Review code changes',
  },
  {
    name: 'Team',
    href: '/team',
    icon: Users,
    description: 'Manage team members',
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Configure preferences',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background">
      <nav className="space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-secondary transition-colors',
                isActive && 'bg-secondary text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground">
                  {item.description}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}