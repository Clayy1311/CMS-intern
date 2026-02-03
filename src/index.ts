import express from "express";
import dotenv from "dotenv";
import authUser from "./routes/auth.routes";
import userData from "./routes/data.user.routes";
import profile from "./routes/profile.routes";
import home from "./routes/home.routes";
import coockieParser from "cookie-parser";
import { Request, Response } from "express";
import { authMiddleware } from "./middlewares/auth.middleware";
import { subscriptionMiddleware } from "./middlewares/subscription.middleware";
import { superAdminGuard } from "./middlewares/roleGuard.middleware";
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
import organizationPublishingWorkflowRoutes from "./routes/contentMangement/projectsOrganizations/publishingWorkflow.routes";
import personalPublishingWorkflowRoutes from "./routes/contentMangement/personalProjects/publishingWorkflow.routes";
import subscriptionRoutes from "./routes/subscription.routes";
import superAdminRoutes from "./routes/superAdmin/manageUser.routes";
import stripeRoutes from "./routes/stripe.routes";
import dashboardRoutes from "./routes/dashboard.routes"
import { stripeWebhook } from "./controllers/stripe.controller";
import { handlegetAllPlans } from "./controllers/stripe.controller";
import { stripe } from "./lib/strip";
import prisma from "./db";
import cors from 'cors'; 
const app = express();


app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);
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
app.use("/api",authMiddleware, subscriptionMiddleware, organizationsRoutes, projectsRoutes, collaboratorsRoutes, personalProjectsRoutes, dashboardRoutes)

app.use("/api",authMiddleware, subscriptionMiddleware, organizationsContentModelsRoutes, organizationsContentFieldsRoutes,  organizationContentSEORoutes, personalContentModelsRoute, personalFieldRoute, personalContentSEORoutes, organizationPublishingWorkflowRoutes, personalPublishingWorkflowRoutes, organizationContentEntriesRoutes, personalEntriesRoutes )


app.get("/plans", handlegetAllPlans)
app.use("/payment", authMiddleware, subscriptionRoutes, stripeRoutes);

//super admin routes 

app.use("/super-admin", authMiddleware, superAdminGuard, superAdminRoutes);
const PORT = process.env.PORT || 3001;



app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`)
});

app.get("/billing/success", async (req, res) => {
  const sessionId = req.query.session_id as string;

  
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const subscriptionId = session.subscription as string;

  const sub = await prisma.subscriptions.findUnique({
    where: { stripeSubscriptionId: subscriptionId }
  });

 
  if (sub?.invoiceUrl) {
     res.send(`
      <h2>Payment Successful!</h2>
      <p>Thank you for your payment. You can check your invoice in email or You can view your invoice below:</p>
      <a href="${sub.invoiceUrl}">Detail Invoice</a>`);
  } else {
    
  }
});