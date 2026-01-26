export default function PlanPage() {
    return (
      <main className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1 */}
          <div className="border rounded-lg p-4 flex flex-col gap-3">
            <h1 className="text-[#6257B0] font-bold text-lg">
              Free / Demo
            </h1>
  
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold">$100</span>
              <span className="text-sm text-gray-500">/month</span>
            </div>
  
            <p className="text-sm text-gray-600">
              Suitable for individuals to demo and explore cmlabs CMS
            </p>
  
            <button className="mt-2 flex items-center justify-center rounded-md bg-[#6257B0] text-white py-2">
              Get Started
            </button>
  
            <p className="font-semibold mt-4">Include feature</p>
  
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>1 user</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>5k personal</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>500k per month</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>100 files</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>EO integration</span>
              </li>
            </ul>
          </div>
  
          {/* Card lainnya */}
          <div className="border rounded-lg p-4">Profesional    </div>
          <div className="border rounded-lg p-4">3</div>
          <div className="border rounded-lg p-4">4</div>
  
        </div>
      </main>
    );
  }
  