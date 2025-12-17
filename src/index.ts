import express from "express";
import dotenv from "dotenv";
import authUser from "./routes/auth.routes";
import userData from "./routes/data.user.routes";
import profile from "./routes/profile.routes";
import home from "./routes/home.routes";
import coockieParser from "cookie-parser";
import { Request, Response } from "express";
import { authMiddleware } from "./middlewares/auth.middleware";
import { organizationAccess } from "./middlewares/organizationMiddleware";
import organizationsRoutes from "./routes/organizations.routes";
import projectsRoutes from "./routes/projects.routes";
import collaboratorsRoutes from "./routes/collaborators.routes";
import personalProjectsRoutes from "./routes/personalProjects.routes";
import organizationsContentModelsRoutes from "./routes/contentMangement/projectsOrganizations/contentModels.routes";
import organizationsContentFieldsRoutes from "./routes/contentMangement/projectsOrganizations/contentField.routes";
import organizationContentEntriesRoutes from "./routes/contentMangement/projectsOrganizations/contentEntries.routes";
import organizationContentSEORoutes from "./routes/contentMangement/projectsOrganizations/contentSEO.routes";
import personalContentModelsRoute from "./routes/contentMangement/personalProjects/contentModels.routes";
import personalFieldRoute from "./routes/contentMangement/personalProjects/contentFields.routes";
import personalEntriesRoutes from "./routes/contentMangement/personalProjects/contentEntries.routes";
import personalContentSEORoutes from "./routes/contentMangement/personalProjects/contentSEO.routes";
import publishingWorkflowRoutes from "./routes/contentMangement/projectsOrganizations/publishingWorkflow.routes";
import cors from 'cors'; 
const app = express();

app.use(express.json());
app.use(coockieParser());
app.use(cors({
     origin: 'http://localhost:3000',
       credentials: true
}))

dotenv.config();
app.get("/", (req: Request, res:Response) => {
    res.send("Halo")
});

app.use("/api/auth", authUser);
app.use("/api/g", authMiddleware,userData);
app.use("/api/dashboard", authMiddleware, profile, home);

//Organizations //projects //Collaborators //personalProjects
app.use("/api",authMiddleware, organizationsRoutes, projectsRoutes, collaboratorsRoutes, personalProjectsRoutes)

app.use("/api",authMiddleware, organizationsContentModelsRoutes, organizationsContentFieldsRoutes, organizationContentEntriesRoutes, organizationContentSEORoutes, personalContentModelsRoute, personalFieldRoute, personalEntriesRoutes,personalContentSEORoutes, publishingWorkflowRoutes )
const PORT = process.env.PORT || 3001;



app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`)
});
