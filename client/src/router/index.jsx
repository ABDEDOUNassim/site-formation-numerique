import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { HomePage } from "../pages/HomePage";
import { StructuresPage } from "../pages/StructuresPage";
import { FormationPage } from "../pages/FormationPage";
import { ProgrammePage } from "../pages/ProgrammePage";
import { ModalitesPage } from "../pages/ModalitesPage";
import { ContactPage } from "../pages/ContactPage";
import { DownloadsPage } from "../pages/DownloadsPage";
import { YouthHomePage } from "../pages/YouthHomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { SecureSignupGamePage } from "../pages/SecureSignupGamePage";
import { ReflexCardsGamePage } from "../pages/ReflexCardsGamePage";
import { MessageJourneyGamePage } from "../pages/MessageJourneyGamePage";
import { StoriesPage } from "../pages/StoriesPage";
import { StoryDetailPage } from "../pages/StoryDetailPage";
import { MyStoriesPage } from "../pages/MyStoriesPage";
import { TutorialsPage } from "../pages/TutorialsPage";
import { TutorialDetailPage } from "../pages/TutorialDetailPage";
import { CodeLabPage } from "../pages/CodeLabPage";
import { ProgressPage } from "../pages/ProgressPage";
import { VideoTutorialPage } from "../pages/VideoTutorialPage";
import { VideoTutorialAccountPage } from "../pages/VideoTutorialAccountPage";
import { VideoTutorialsHubPage } from "../pages/VideoTutorialsHubPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppShell />,
      children: [
      { index: true, element: <HomePage /> },
      {
        path: "structures",
        element: <StructuresPage />,
        children: [
          { path: "formation", element: <FormationPage /> },
          { path: "programme", element: <ProgrammePage /> },
          { path: "modalites", element: <ModalitesPage /> },
          { path: "contact", element: <ContactPage /> },
          { path: "downloads", element: <DownloadsPage /> }
        ]
      },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "jeunes", element: <YouthHomePage /> },
      {
        path: "jeunes/games/secure-signup",
        element: (
          <ProtectedRoute role="child">
            <SecureSignupGamePage />
          </ProtectedRoute>
        )
      },
      {
        path: "jeunes/games/reflex-cards",
        element: (
          <ProtectedRoute role="child">
            <ReflexCardsGamePage />
          </ProtectedRoute>
        )
      },
      {
        path: "jeunes/games/message-journey",
        element: (
          <ProtectedRoute role="child">
            <MessageJourneyGamePage />
          </ProtectedRoute>
        )
      },
      { path: "jeunes/stories", element: <StoriesPage /> },
      { path: "jeunes/stories/:id", element: <StoryDetailPage /> },
      {
        path: "jeunes/my-stories",
        element: (
          <ProtectedRoute role="child">
            <MyStoriesPage />
          </ProtectedRoute>
        )
      },
      { path: "jeunes/tutorials", element: <TutorialsPage /> },
      { path: "jeunes/tutorials/:id", element: <TutorialDetailPage /> },
      { path: "jeunes/tutorials/video/cyberharcelement", element: <VideoTutorialPage /> },
      { path: "jeunes/tutorials/video/securise-compte", element: <VideoTutorialAccountPage /> },
      { path: "jeunes/tutorials/videos", element: <VideoTutorialsHubPage /> },
      {
        path: "jeunes/code-lab",
        element: (
          <ProtectedRoute role="child">
            <CodeLabPage />
          </ProtectedRoute>
        )
      },
      {
        path: "jeunes/progress",
        element: (
          <ProtectedRoute role="child">
            <ProgressPage />
          </ProtectedRoute>
        )
      }
      ]
    }
  ],
  {
    future: {
      v7_startTransition: true
    }
  }
);
