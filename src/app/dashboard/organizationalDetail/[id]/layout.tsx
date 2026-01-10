import SidebarOrganization from "@/components/layout/organizational/sidebarOrg";
import Header from "@/components/layout/Header";

export default function OrganizationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
  searchParams: {searchParams: string}
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarOrganization orgId={params.id,params.searchParams} />

      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}

