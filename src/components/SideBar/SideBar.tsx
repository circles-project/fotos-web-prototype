import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';

// Sidebar for the /photos main homescreen
const SideBar = () => {
    return (
        <Sidebar rootStyles={{position: "fixed", top: 0}} className={styles.sideBar}>
            <Menu className={styles.content}>
                <MenuItem component={<Link to="/Photos"/>}> All Photos </MenuItem>
            </Menu>
            <Menu>
                {/*add albums to this tab?*/}
                <SubMenu label="Albums">
                    <MenuItem> In Progress </MenuItem>
                    <MenuItem> In Progress </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    )
}

export default SideBar;
