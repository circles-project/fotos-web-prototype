import styles from "./LandingPage.module.css";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import ReactModal from "react-modal";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.tsx";
import EnterUsername from "../Login/EnterUsername.tsx";
import EnterPassword from "../Login/EnterPassword.tsx";
import useAuthStore from "../../state-management/auth/store.ts";

// Landing Page for the application (login page)
function LandingPage() {

  ReactModal.setAppElement('#root');

  // Stage Variables
  const { stages, setIsLoggingIn, reset } = useAuthStore();

  useEffect(() => {
    console.log("Change Detected in Auth Stages: ", stages);
  }, [stages]);

  return (
    <>
      <div className={styles.homeCentering}>
        <h1 style={{}}>FOTOS</h1>
        <h2 style={{ marginTop: "3%" }}>Safe and Encrypted Cloud Storage</h2>
        <Button style={{ marginTop: "3%" }} onClick={() => { setIsLoggingIn(true); }}>
          Login
        </Button>
      </div>

      {/* Logging In Components */}
      <ReactModal isOpen={stages.isLoggingIn} style={{ overlay: { position: "absolute", width: "50%", left: "25%" }, content: { display: "grid" }, }}>
        <EnterUsername />
        <EnterPassword />
        <LoadingScreen active={stages.isLoading} />
        <button onClick={reset} className={styles.cancelBtn}>
          Cancel
        </button>
      </ReactModal>

    </>
  );

}

export default LandingPage;