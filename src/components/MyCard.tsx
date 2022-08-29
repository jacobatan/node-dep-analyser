import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function MyCard({ word }: any) {
  return (
    <Box className="flex justify-between w-full">
      <Typography variant="body1" className="w-full">
        - {word}
      </Typography>
    </Box>
  );
}
