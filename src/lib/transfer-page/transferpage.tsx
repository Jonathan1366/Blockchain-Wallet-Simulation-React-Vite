import PriceChart from "./components/PriceChart";
import Box from "@mui/material/Box";
import BalanceAmount from "./components/BalanceAmount";
import Marquee from "./components/Marquee";
import { BalanceProvider } from "./context/BalanceContext";

export default function TransferPage() {
  return (
    <div>
      <Box
        sx={{
          width: "100vw", // Full viewport width
          minHeight: "100vh", // Full viewport height
          overflowX: "hidden", // Hide horizontal overflow to prevent scrolling
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // Stack elements from the top
          backgroundColor: "#121212",
        }}
      >
        <Marquee />
        <Box
          sx={{
            width: "100%", // Ensure inner Box takes full width of parent
            maxWidth: "1200px", // Optional: Set a max width for larger screens
            paddingX: 2, // Add padding to prevent content from touching edges
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <BalanceProvider>
            <BalanceAmount />
            <PriceChart />
          </BalanceProvider>
        </Box>
      </Box>
    </div>
  );
}
