import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import resistorSvg from "../assets/svgs/resistorSvg.js";
import thyristorSvg from "../assets/svgs/thyristorSvg.js";
import inverterSvg from "../assets/svgs/inverterSvg.js";

const circleSize = 100;
const circleRadius = 125;
const lineRadius = 62.5;

const middleCircle = {
  text: `Falownik`,
  icon: <SvgXml xml={inverterSvg} />,
};

const additionalCirclesArray = [
  {
    text: `Sieć dystrybucyjna`,
    icon: (
      <MaterialCommunityIcons
        name="transmission-tower"
        size={48}
        color="#047AF8"
      />
    ),
    arrowValidationValue: `PAC_Pa`,
    lessThan: { value: 0, direction: `outside` },
    greaterThan: { value: 0, direction: `inside` },
  },
  {
    text: `Turbina wiatrowa`,
    icon: (
      <MaterialCommunityIcons name="wind-turbine" size={64} color="#047AF8" />
    ),
  },
  {
    text: `Zasobnik energii`,
    icon: (
      <MaterialCommunityIcons name="car-battery" size={48} color="#047AF8" />
    ),
    arrowValidationValue: `FRONIUS_STATUS_Q`,
    lessThan: { value: 0, direction: `inside` },
    greaterThan: { value: 0, direction: `outside` },
  },
  {
    text: `Obciążenie liniowe`,
    icon: <SvgXml xml={resistorSvg} />,
  },
  {
    text: `Obciążenie nieliniowe`,
    icon: <SvgXml xml={thyristorSvg} />,
  },
  {
    text: `Ogniwa fotowoltaiczne`,
    icon: <FontAwesome5 name="solar-panel" size={40} color="#047AF8" />,
    arrowValidationValue: `FRONIUS_STATUS_DCA`,
    greaterThan: { value: 0, direction: `inside` },
  },
];

export {
  circleSize,
  circleRadius,
  lineRadius,
  middleCircle,
  additionalCirclesArray,
};
