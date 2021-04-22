import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
import numeral from "numeral";

function InfoBox({ title, cases, total, color, ...props }) {
  return (
    <Card className={`infoBox ${color}`} {...props}>
      <CardContent>
        <Typography className="infoBox_title">{title}</Typography>
        <h2 className="infoBox_cases">+{numeral(cases).format("0a")}</h2>
        <Typography className="infoBox_total">
          {numeral(total).format("0.0a")} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
