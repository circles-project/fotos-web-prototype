import { createBrowserRouter } from "react-router-dom";
// import ErrorPage from "./pages/ErrorPage";
import PhotoFullScreen from "./pages/PhotoFullScreen/PhotoFullScreen";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage/LandingPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    // errorElement: <ErrorPage />,
    children: [
        // TODO: Look up what element is and what index is and connect router to the rest of the app
      { index: true, element: <HomePage /> },
      { path: 'photos/:slug', element: <PhotoFullScreen /> }
    ]
  }
]);

export default router;