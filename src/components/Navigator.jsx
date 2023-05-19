import {Sidebar, Menu, MenuItem, useProSidebar, sidebarClasses} from "react-pro-sidebar";
import {NavLink} from "react-router-dom";
import {GiCakeSlice, GiNoodles} from "react-icons/gi";
import {BsHouseDoorFill, BsList} from "react-icons/bs"
import {FaSignInAlt, FaSignOutAlt, FaCarrot} from "react-icons/fa";

const Navigator = () => {
    const {collapseSidebar, toggleSidebar} = useProSidebar();

    return (
        <div style={{display: "flex", height: "100%"}}>
            <Sidebar rootStyles={{
                    [`.${sidebarClasses.container}`]: {
                    backgroundColor: 'white',
                    },
            }}>
                <Menu menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                         // only apply styles on first level elements of the tree
                        if (level === 0)
                        return {
                        color: disabled ? '#f5d9ff' : '#d359ff',
                        backgroundColor: active ? '#eecef9' : undefined,
                        };
                        },
                }}>
                    {/* <MenuItem icon={<BsList/>} button={ <button onClick={() => collapseSidebar()}>Collapse</button>}></MenuItem> */}
                    <MenuItem icon={<BsHouseDoorFill/>} routerLink={<NavLink to={'/'}/>}>Home</MenuItem>
                    <MenuItem icon={<GiNoodles/>} routerLink={<NavLink to={'/category/Jelo'}/>}>Jela</MenuItem>
                    <MenuItem icon={<FaCarrot/>} routerLink={<NavLink to={'/category/Salata'}/>}>Salate</MenuItem>
                    <MenuItem icon={<GiCakeSlice/>} routerLink={<NavLink to={'/category/Deserti'}/>}>Deserti</MenuItem>
                    <MenuItem icon={<FaSignInAlt/>} routerLink={<button></button>}>Sign In</MenuItem>
                    <MenuItem icon={<FaSignOutAlt/>} routerLink={<button></button>}>Sign Out</MenuItem>
                </Menu>
            </Sidebar>
            <main>
                <button onClick={() => collapseSidebar()}>Collapse</button>
            </main>
        </div>
    )
}

export default Navigator;
