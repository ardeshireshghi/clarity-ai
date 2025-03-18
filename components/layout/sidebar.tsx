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
    <aside className="fixed left-0 top-28 h-[calc(100vh-7rem)] mx-4">
      <div className="glass-panel h-full w-64">
        <nav className="space-y-2 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:text-foreground hover:bg-white/10 transition-colors',
                  isActive && 'bg-white/10 text-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <div>
                  <div>{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
