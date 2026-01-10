"use client";
import Link from "next/link";
import Image from "next/image";

export default function SidebarOrganization({
  orgId,
}: {
  orgId: string;
}) {
  return (
    <aside className="w-64 bg-white border-r shadow-lg pl-4">
      <div className="w-15 bg-white shadow-lg min-h-screen rounded-full fixed">

        <div className="flex items-center flex-col mt-10 space-y-10">
          <div className="mb-15">
            <Image
              src="/sidebar/bg.png"
              alt="Icon User"
              width={20}
              height={20}
            />
          </div>
          <Image
            src="/sidebar/bg-1.png"
            alt="Icon User"
            width={20}
            height={20}
          />
          <Image
            src="/sidebar/all.png"
            alt="Icon User"
            width={20}
            height={20}
          />
          <Image
            src="/sidebar/bg-2.png"
            alt="Icon User"
            width={20}
            height={20}
          />
          <Image
            src="/sidebar/notification.png"
            alt="Icon User"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="flex justify-center ml-13 p-8 flex-col space-y-8">
      <h1 className="text-[#3A7AC3]">CMS CMLABS</h1>
      <div className="text-gray-500 text-light text-sm ml-2 ">
          Project
      </div>
      <div className="text-gray-500 text-light text-sm ml-2">
         Collaborator
      </div>
      <div className="text-gray-500 text-light text-sm ml-2">
          Setting
      </div>

      </div>
    
    </aside>
  );
}
