import { Organization } from "@/types/organization";

export const handleCreateOrganization = async (
  data: Organization
) => {
  try {
    const res = await fetch(
      "http://localhost:3001/api/resources/organizations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // penting kalau pakai cookie auth
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to create organization");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};
