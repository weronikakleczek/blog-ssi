import { amber, brown, grey, lightBlue, lightGreen, red, teal } from "@mui/material/colors";

export enum BlogCategory {
  TECH,
  SPORT,
  FASHION,
  LIFESTYLE,
  LITERATURE,
  CARS,
  TUTORIAL,
  OTHER,
}


const colors: Record<string, string> = {
  TECH: grey[700],
  SPORT: lightGreen[500],
  FASHION: amber[300],
  LIFESTYLE: teal[100],
  LITERATURE: brown[200],
  CARS: red[600],
  TUTORIAL: lightBlue[400],
  OTHER: grey[100],
};

export default colors;