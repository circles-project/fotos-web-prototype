// TODO: Need to properly setup and establish routes
import { createBrowserRouter } from "react-router-dom";
// import ErrorPage from "./pages/ErrorPage";
import PhotoFullScreen from "./pages/PhotoFullScreen/PhotoFullScreen";
import Photos from "./pages/Photos/Photos";
import LandingPage from "./pages/LandingPage/LandingPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    // errorElement: <ErrorPage />,
    children: [
        // TODO: Look up what element is and what index is and connect router to the rest of the app
      { index: true, element: <Photos /> },
      { path: 'photos/:slug', element: <PhotoFullScreen /> }
    ]
  }
]);

export default router;