"use client";
import Image from "next/image";
import Link from "next/link";

export default function SidebarDashboard() {
    return(
        <div>
             <div className="text-xl font-bold mb-8 text-blue-700 flex flex-row justify-center pr-20 gap-2">
        <Image
          src="/sidebar/bg-sidebar.png"
          alt="sidebar log"
          width={34}
          height={34}
        />

        <h1 className="text-[#3A7AC3] items-center mt-1">
          CMLABS
        </h1>
      </div>
      {/* dashboard */}
      <div className="flex justify-center py-2 rounded rounded-full gap-4 pr-9">
        <Image
        className="bg-[#3A7AC3]"
          src="/sidebar/dashboard.png"
          alt="Dahsboard icon"
          width={25}
          height={25}
        />

        <div className="text-[#3A7AC3]">
          Dashboard
        </div>
      </div>

      {/* organiaztion */}
      <div className="text-[#3A7AC3] py-5 text-sm">
        Organizational
      </div>
       <div className="flex justify-center text-[#3A7AC3] text-md gap-3 pr-8"> 
        <Image
        src="/sidebar/user2.png"
        alt="user Icon"
        width={30}
        height={30}
        />
        <Link href="/dashboard/organizational">
        Organizational
        </Link>
       </div>
       {/* personal project */}
       <div className="py-5 text-[#3A7AC3] text-sm">
        Personal Project
       </div>
       <div className="flex justify-center gap-3 text-[#3A7AC3] pr-8">
        <Image
        src="/sidebar/project.png"
        alt="Project Icon"
        width={30}
        height={30}>
          
        </Image>
        personal Project
       </div>
        </div>
    )
}