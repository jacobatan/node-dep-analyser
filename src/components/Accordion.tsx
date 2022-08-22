import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MyCard from "./MyCard";

export default function SimpleAccordion({ stuffs }: any) {
  return (
    <div className="w-full">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Up to date! ✔️</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {stuffs.map(
            (
              stuff: {
                pkgName: any;
                outDated: any;
              },
              i: number
            ) =>
              !stuff.outDated && (
                <MyCard
                  key={stuff.pkgName + stuff.outDated}
                  word={stuff.pkgName}
                />
              )
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Outdated! ❌</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {stuffs.map(
            (stuff: { pkgName: any; outDated: any }) =>
              stuff.outDated && (
                <MyCard
                  key={stuff.pkgName + stuff.outDated}
                  word={stuff.pkgName}
                />
              )
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
