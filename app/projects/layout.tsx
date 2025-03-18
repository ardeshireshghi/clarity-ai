import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <Sidebar />
      <main className="pl-72 pt-28 pr-4">
        {children}
      </main>
    </div>
  );
}