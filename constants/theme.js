import { Dimensions } from "react-native";
//expo font
const { width, height } = Dimensions.get("window");
export const COLORS = {
  blue: "#0573ff",
  gray: "#f5f5f5",
  gray1: "#C7C8CC", //đậm
  gray2: "#DBDFEA",
  while: "#ffffff",
  black: "#000000",
  secondaryWhite: "#F7F7FC",
};

export const SIZES = {
  // global sizes

  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,
  padding3: 16,
  marginHorizontal: 20,
  // font sizes
  lineHeight: 0,
  h1: 60,
  h2: 30,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 22,
  body3: 18,
  body4: 16,
  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: {
    fontFamily: "Roboto",
    fontSize: SIZES.lineHeight,
  },
  h1: {
    fontFamily: "Roboto",
    fontSize: SIZES.h1,
    fontWeight: "bold",
  },
  h2: {
    fontFamily: "Roboto",
    fontSize: SIZES.h2,
    fontWeight: "bold",
  },
  h3: {
    fontFamily: "Roboto",
    fontSize: SIZES.h3,
    fontWeight: "bold",
  },
  h4: {
    fontFamily: "Roboto",
    fontSize: SIZES.h4,
    fontWeight: "bold",
  },
  body1: {
    fontFamily: "Roboto",
    fontSize: SIZES.body1,
  },
  body2: {
    fontFamily: "Roboto",
    fontSize: SIZES.body2,
  },
  body3: {
    fontFamily: "Roboto",
    fontSize: SIZES.body3,
  },
  body4: {
    fontFamily: "Roboto",
    fontSize: SIZES.body4,
  },
};
const appTheme = { COLORS, SIZES, FONTS };
export default appTheme;
