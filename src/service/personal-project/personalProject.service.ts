import axios from "axios";

type Project = {
    name: string;
}
export const handleDeletePersonalProject = async(id: string) => {
    const res = await axios.delete(`http://localhost:3001/api/personal-project/${id}`,{
     withCredentials: true
    })
    return res.data;
}

export const handleCreatePersonalProject = async(payload: {name:string}) => {
    const res = await axios.post("http://localhost:3001/api/personal-project/create",payload, {
        withCredentials: true
    })
    return res.data;
}