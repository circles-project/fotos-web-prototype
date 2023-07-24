import { Container, Navbar } from "react-bootstrap";
import UploadButton from "../UploadButton/UploadButton";
import styles from "./NavBar.module.css";

// Navigation bar component for the /photos main homescreen
const NavBar = () => {
  return (
    <Navbar className={styles.navBar}>
      <Container className={styles.navbarContent}>
        <Navbar.Brand href="#home">Futo Photos</Navbar.Brand>
          <div className={styles.uploadButtonContainer}>
            <UploadButton />
          </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
