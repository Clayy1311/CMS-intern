import Sidebar from "@/components/layout/Sidebar";
export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>

  
       <div className="flex min-h-screen w-full">
       <Sidebar/>
       <div className="w-full mr-25">
       {children}
       </div>
  
       </div>
      
       </main>
       
    )
}