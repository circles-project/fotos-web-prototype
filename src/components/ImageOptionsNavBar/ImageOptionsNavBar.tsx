import { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import styles from "./ImageOptionsNavBar.module.css";
import DeleteButton from "../DeleteButton/DeleteButton";
import BackButton from "../BackButton/BackButton";

// Navbar that appears when the user is in full screen photo viewing screen and provides photo options (go back, delete, etc.)
const ImageOptionsNavBar = () => {
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    let timer: number | NodeJS.Timeout;

    const hideNavbar = () => {
      setNavbarVisible(false);
    };

    const resetTimer = () => {
      if (timer) {
        clearTimeout(timer);
      }

      setNavbarVisible(true);

      timer = setTimeout(hideNavbar, 3000); // Adjust the duration here (in milliseconds)
    };

    // Event listeners to handle user interactions
    const handleInteraction = () => {
      setNavbarVisible(true); // Set to true to show the navbar on user interaction
      resetTimer();
    };

    // Set up event listeners for user interactions
    document.addEventListener("mousemove", handleInteraction);
    document.addEventListener("keydown", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    // Start the initial timer on component mount
    resetTimer();

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener("mousemove", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Navbar className={`${styles.navBar} ${!navbarVisible && styles.hidden}`}>
      <Container className={styles.navbarContent}>
        <BackButton style={{marginRight: "1rem"}}/>
        <DeleteButton />
      </Container>
    </Navbar>
  );
};

export default ImageOptionsNavBar;
