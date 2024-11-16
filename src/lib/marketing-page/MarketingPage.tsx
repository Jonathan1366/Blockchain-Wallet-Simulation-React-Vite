import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppAppBar from "./components/AppBar";
import Hero from "./components/Hero";
import Highlights from "./components/HightLights";
import Features from "./components/Feature";
import Footer from "./components/Footer";
import AppTheme from "./shared-theme/AppTheme";
import LogoCollection from "./components/LogoCollection";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import { Box } from "@mui/material";

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Box display="flex" flexDirection="column" alignItems="center" width="100%">
        <Hero />
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </AppTheme>
  );
}
