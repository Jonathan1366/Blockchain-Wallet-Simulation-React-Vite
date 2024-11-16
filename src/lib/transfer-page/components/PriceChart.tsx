import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

const PriceChart: React.FC = () => {
  return (
    <Box
      id="BalanceAmount"
      sx={(theme) => ({
        width: "100%",
        minHeight: "50vh",
        backgroundColor: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        ...theme.applyStyles("dark", {}),
      })}
    >
      <Accordion
        sx={{
          width: "100%",
          backgroundColor: "#121212",
          color: "white",
          border: "1px solid #333",
          boxShadow: "none",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price Chart</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              width: "100%",
              overflow: "hidden",
            }}
          >
            <gecko-coin-price-chart-widget dark-mode="true" transparent-background="true" initial-currency="usd"></gecko-coin-price-chart-widget>
          </div>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default PriceChart;
