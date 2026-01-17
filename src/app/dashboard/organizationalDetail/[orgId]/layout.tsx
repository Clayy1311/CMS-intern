import SidebarOrganization from "@/components/layout/organizational/sidebarOrg";
import Header from "@/components/layout/Header";

export default async function OrganizationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ orgId: string }>;
  
}) {
  const { orgId } = await params; // 🔥 WAJIB
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarOrganization orgId={orgId} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
