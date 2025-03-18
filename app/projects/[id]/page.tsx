import { Suspense } from "react";
import { ProjectPageClient } from "./project-page-client";

// Static generation config
export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { id: 'phoenix' },
    { id: 'atlas' },
    { id: 'nexus' }
  ];
}

export default function ProjectPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectPageClient />
    </Suspense>
  );
}