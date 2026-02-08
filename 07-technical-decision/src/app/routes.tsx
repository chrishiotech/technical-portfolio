import { createBrowserRouter } from "react-router";
import { WizardLayout } from "./components/WizardLayout";
import { ProjectOverview } from "./components/ProjectOverview";
import { TechnicalRequirements } from "./components/TechnicalRequirements";
import { BusinessGoals } from "./components/BusinessGoals";
import { Results } from "./components/Results";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: WizardLayout,
    children: [
      { index: true, Component: ProjectOverview },
      { path: "technical", Component: TechnicalRequirements },
      { path: "business", Component: BusinessGoals },
      { path: "results", Component: Results },
    ],
  },
]);
