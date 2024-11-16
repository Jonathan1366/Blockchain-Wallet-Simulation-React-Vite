import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Sitemark from "./SistemarkIcon";
import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";
import Menu from "@mui/material/Menu";
import { SlideProps } from "@mui/material/Slide";
import { Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "none",
  border: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.2)",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  boxShadow: theme.shadows[5],
  padding: "10px 10px",
  backgroundSize: "none",
  overflow: "hidden",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(5),
  },
}));

export default function AppAppBar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openFeaturesMenu = Boolean(anchorEl);
  const theme = useTheme();
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleFeatureClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFeatureCLose = () => {
    setAnchorEl(null);
  };

  const handleTransferClick = () => {
    setAnchorEl(null);
    navigate("/transferpage");
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        bgcolor: "transparent",
        backgroundImage: "none",
      }}
    >
      <Box sx={{ maxWidth: "lg", mx: "auto", width: "100%" }}>
        <StyledToolbar
          variant="dense"
          disableGutters
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
            paddingRight: 0,
            paddingLeft: 0,
          }}
        >
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}>
            <Sitemark />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button id="features-button" variant="text" color="info" size="small" onClick={handleFeatureClick} aria-controls={openFeaturesMenu ? "features-menu" : undefined} aria-haspopup="true" aria-expanded={openFeaturesMenu ? "true" : undefined}>
                Features
              </Button>
              <Menu
                id="features-menu"
                anchorEl={anchorEl}
                open={openFeaturesMenu}
                onClose={handleFeatureCLose}
                MenuListProps={{
                  "aria-labelledby": "features-button",
                }}
                TransitionComponent={Fade}
                transitionDuration={200}
                TransitionProps={
                  {
                    direction: "down",
                  } as SlideProps
                }
              >
                <MenuItem onClick={handleTransferClick}>Transfer</MenuItem>
                <MenuItem onClick={handleFeatureCLose}>Wallet</MenuItem>
                <MenuItem onClick={handleFeatureCLose}>Market</MenuItem>
                <MenuItem onClick={handleFeatureCLose}>Formula</MenuItem>
              </Menu>
              <Button variant="text" color="info" size="small">
                Testimonials
              </Button>
              <Button variant="text" color="info" size="small">
                Highlights
              </Button>
              <Button variant="text" color="info" size="small">
                Pricing
              </Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                FAQ
              </Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                Blog
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Button color="primary" variant="text" size="small">
              Sign in
            </Button>
            <Button color="secondary" variant="contained" size="small">
              Sign up
            </Button>
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Box>
    </AppBar>
  );
}
