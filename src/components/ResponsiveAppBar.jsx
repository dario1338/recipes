import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { auth } from "./firebase";
import { useAuthState} from "react-firebase-hooks/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { deepPurple } from '@mui/material/colors';
import SearchRecipe from "../components/SearchRecipe";
import {useState, useEffect} from "react";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, loading] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/");
}

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DeliciousRecepies
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem>
                <NavLink to={'/'} >Home</NavLink>
              </MenuItem>
              <MenuItem>
              <NavLink to={'/category/Jelo'} >Jela</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to={'/category/Salata'} >Salate</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to={'/category/Deserti'} >Deserti</NavLink>
              </MenuItem>
              {!!user && <MenuItem><NavLink to={'/add-recipe'}>Add Recipe</NavLink></MenuItem>}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DeliciousRecepies
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          
            {<>
                <Button>
                    <NavLink to={'/'} >
                        Home
                    </NavLink>
                </Button>

                <Button>
                    <NavLink to={'/category/Jelo'} >
                       Jela
                    </NavLink>
                </Button>

                <Button>
                    <NavLink to={'/category/Salata'} >
                        Salate
                    </NavLink>
                </Button>

                <Button>
                    <NavLink to={'/category/Deserti'} >
                        Deserti
                    </NavLink>
                </Button>
                {!!user && <Button><NavLink to={'/add-recipe'}>Add Recipe</NavLink></Button>}
              </>
            }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          {!user && <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />                
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <NavLink to={'/signin'}>Sign In</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to={'/signup'}>Sign Up</NavLink>
                </MenuItem>
              </Menu>
            </div>
            }

            {!!user && <div>
            <Tooltip title="Open settings">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {console.log(user)}
                <Avatar sx={{ bgcolor: deepPurple[500] }} >{Array.from(user.email)[0]}</Avatar>
              </IconButton>
            </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logout} >Log Out</MenuItem>
              </Menu>
            </div>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export const NavLink = styled(Link)`
  color: #ADD8E6;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 2rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #000000;
  }
`;
export default ResponsiveAppBar;
