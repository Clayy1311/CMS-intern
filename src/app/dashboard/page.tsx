// src/app/dashboard/page.tsx
// Server Component (Default)

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Row 1: Cards Overview (4 Kartu) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow border border-gray-100">
                        <h3 className="font-medium text-gray-800">Total Personal Project</h3>
                        <p className="text-3xl font-bold mt-1">240</p>
                        <p className="text-xs text-green-500 mt-2">80% ▲ 1 hour ago</p>
                    </div>
                ))}
            </div>

            {/* Row 2: Project Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow h-80">
                    <h2 className="font-semibold mb-4">Project Deadlines (Placeholder Chart)</h2>
                </div>
                <div className="bg-white p-6 rounded-lg shadow h-80">
                    <h2 className="font-semibold mb-4">Project Details (Placeholder Bar Chart)</h2>
                </div>
            </div>
            
            {/* Row 3: Activity and Organization List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow h-48">
                    <h2 className="font-semibold mb-4">Recently Activity</h2>
                </div>
                <div className="bg-white p-6 rounded-lg shadow h-48">
                    <h2 className="font-semibold mb-4">List Organization</h2>
                </div>
            </div>
        </div>
    );
}