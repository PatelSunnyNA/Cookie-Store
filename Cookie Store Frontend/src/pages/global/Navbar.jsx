import * as React from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { Badge, Grid } from "@mui/material";
import CookieIcon from "@mui/icons-material/Cookie";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {

  ShoppingBagOutlined,

} from "@mui/icons-material";

import { setIsCartOpen } from "../../state";
function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const DrawerButton = ({ href, icon, text }) => {
    const theme = useTheme();
    return (
      <Box>
        <Button
          color="primary"
          variant="text"
          startIcon={icon}
          sx={{
            color: theme.palette.text.primary,
            mx: 1.5,
          }}
        >
          <Link to={href} style={{ textDecoration: "none" }}>
            <Box>
              <Typography sx={{ color: theme.palette.text.primary }}>
                {text}
              </Typography>
            </Box>
          </Link>
        </Button>
      </Box>
    );
  };
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textalign: "center",
      }}
    >
      <Grid container item xs={12} direction="column" alignContent="center">
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "2rem",
              }}
            >
              Sunny Patel
            </Typography>
          </Grid>
        <Grid item xs={12}>
          <DrawerButton href="/" icon={<HomeIcon />} text="home" />
        </Grid>
        <Grid item xs={12}>
          <DrawerButton
            href="/cookies"
            icon={<CookieIcon />}
            text="Cookies"
          />
        </Grid>
      </Grid>
    </Box>
  );

  const NavbarButton = ({ href, icon, text }) => {
    const theme = useTheme();
    return (
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Button
          color="primary"
          variant="text"
          startIcon={icon}
          onClick={()=>navigate(href)}
          sx={{
            color: theme.palette.text.primary,
            mx: 1.5,
          }}
        >
            <Typography sx={{ color: theme.palette.text.primary }}>
              {text}
            </Typography>
        </Button>
      </Box>
    );
  };

  const NavbarLogo = () => {
    const theme = useTheme();
    return (
      <Box sx={{ alignItems: "center" }}>
          <Button
            color="primary"
            variant="text"
            disableRipple
            startIcon={<CookieIcon />}
            onClick={()=>navigate("/")}
            sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
              color: theme.palette.text.primary,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: "1rem",
                flexGrow: 1,
                display: { xs: "block", md: "block" },
              }}
            >
              Cookie Shop
            </Typography>
          </Button>
      </Box>
    );
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <AppBar
        component="nav"
        color="default"
        position="fixed"
        sx={{
          border: 0,
          height: "55px",
          boxShadow:
            "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <NavbarLogo />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NavbarButton href="/" icon={<HomeIcon />} text="Home" />
            <NavbarButton
              href="/cookies"
              icon={<DeveloperBoardIcon />}
              text="Cookies"
            />
            <Badge
              badgeContent={cart.length}
              color="secondary"
              invisible={cart.length === 0}
              sx={{
                "& .MuiBadge-badge": {
                  right: 8,
                  top: 5,
                  padding: "0 4px",
                  height: "14px",
                  minWidth: "13px",
                },
              }}
            >
              <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                <ShoppingBagOutlined />
              </IconButton>
            </Badge>

            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          anchor="top"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;
