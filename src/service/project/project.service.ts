import axios from "axios";


interface Project {
    name: string
}

export const handleCreateProject = async (data: Project) => {
    const res = await fetch("http://localhost:3001/api/projects/12", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
    return await res.json();
}
export const hanldeUpdateProject = async (
    organizationId: string,
    projectId: string,
    payload: { name: string }
  ) => {
    const res = await fetch(
      `http://localhost:3001/api/organization/${organizationId}/project/${projectId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Update project gagal");
    }
  
    return res.json();
  };


  export const handleDeleteProject = async(idOrg: string,id: string) => {
    const res = await axios.delete(`http://localhost:3001/api/organization/${idOrg}/project/${id}`,{
        withCredentials: true   
    })
     return res.data;
  }
  

// export const hangldeUpdateProject = (
//     organizationId: string,
//     projectId: string,
//     payload: { name: string }
//   ) => {
//     return axios.put(
//       `/organization/${organizationId}/project/${projectId}`,
//       payload,
//       { withCredentials: true }
//     );
//   };
