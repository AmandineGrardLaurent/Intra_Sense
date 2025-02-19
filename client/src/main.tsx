// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import AdminPage from "./pages/adminPages/profileAdminPage/ProfileAdminPage";
import UsersListPage from "./pages/adminPages/usersListPage/UsersListPage";
import DecisionDetailPage from "./pages/decisionDetailPage/DecisionDetailPage";
import DecisionFormPage from "./pages/decisionFormPage/DecisionFormPage";
import AllDecisionsPage from "./pages/decisionsPage/AllDecisionsPage";
import ArchivedDecisionsPage from "./pages/decisionsPage/ArchivedDecisionsPage";
import MyDecisionsPage from "./pages/decisionsPage/MyDecisionsPage";
import ParticipatingDecisionsPage from "./pages/decisionsPage/ParticipatingDecisionsPage";
import RunningDecisionsPage from "./pages/decisionsPage/RunningDecisionsPage";
import ErrorPage from "./pages/errorPage/ErrorPage";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import RegisterPage from "./pages/registerPage/RegisterPage";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!

const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <App />, // Renders the App component for the home page
    children: [
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/homepage",
        element: <HomePage />,
      },
      {
        path: "/decisionslist/:id",
        element: <DecisionDetailPage />,
      },
      {
        path: "/participatingdecisions",
        element: <ParticipatingDecisionsPage />,
      },
      {
        path: "/mydecisions",
        element: <MyDecisionsPage />,
      },
      {
        path: "/runningdecisions",
        element: <RunningDecisionsPage />,
      },
      {
        path: "/archiveddecisions",
        element: <ArchivedDecisionsPage />,
      },
      {
        path: "/alldecisions",
        element: <AllDecisionsPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/admin/profile",
        element: <AdminPage />,
      },
      {
        path: "/decisionformpage",
        element: <DecisionFormPage />,
      },
      {
        path: "/admin/userslist",
        element: <UsersListPage />,
      },
    ],
  },

  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
