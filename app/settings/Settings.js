import React, { createContext, useState, useEffect, useContext } from "react";

import { additionalCirclesArray } from "../data/circlesData";

const SettingsContext = createContext();

let ws = new WebSocket(
  `ws://${process.env.EXPO_PUBLIC_IP}:${process.env.EXPO_PUBLIC_P0RT}`
);
ws.onopen = () => {
  ws.send(`login ${process.env.EXPO_PUBLIC_MISM_API_KEY}`);
};

ws.onclose = (e) => {
  console.log(e.code, e.reason);
};

export const SettingsProvider = ({ children }) => {
  const [islandWork, setIslandWork] = useState(false);
  const [synchronousWork, setSynchronousWork] = useState(true);
  const [windTurbinePercentage, setWindTurbinePercentage] = useState(0);
  const [linearLoadPercentage, setLinearLoadPercentage] = useState(0);
  const [nonLinearLoadPercentage, setNonlinearLoadPercentage] = useState(0);
  const [inverterGeneratedPower, setInverterGeneratedPower] = useState(0);
  const [manualSettings, setManualSettings] = useState(false);
  const [liveData, setLiveData] = useState({});
  const [allProfiles, setAllProfiles] = useState([]);

  let currentDataProfile = `data_${islandWork}_${windTurbinePercentage}_${linearLoadPercentage}_${nonLinearLoadPercentage}_${inverterGeneratedPower}`;

  ws.onmessage = (e) => {
    try {
      const json = JSON.parse(e.data);

      const [, island, windTurbine, linearLoad, nonlinearLoad, inverter] =
        json.profile.split(`_`);
      setIslandWork(island == `true` ? true : false);
      setSynchronousWork(island == `true` ? false : true);
      setWindTurbinePercentage(parseInt(windTurbine));
      setLinearLoadPercentage(parseInt(linearLoad));
      setNonlinearLoadPercentage(parseInt(nonlinearLoad));
      setInverterGeneratedPower(parseInt(inverter));

      setLiveData(json.data);
    } catch (error) {}
  };

  const getAllProfiles = async () => {
    try {
      const response = await fetch(
        `http://${process.env.EXPO_PUBLIC_IP}:${process.env.EXPO_PUBLIC_P0RT}/profiles?api_key=${process.env.EXPO_PUBLIC_MISM_API_KEY}`
      );
      const json = await response.json();

      setAllProfiles(json.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProfiles();
  }, []);

  const changeProfile = (newProfile) => {
    if (allProfiles.includes(newProfile)) {
      fetch(
        `http://${process.env.EXPO_PUBLIC_IP}:${process.env.EXPO_PUBLIC_P0RT}/profile?api_key=${process.env.EXPO_PUBLIC_MISM_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profile: newProfile,
          }),
        }
      );
    }
  };

  const arrows = {};
  for (let additionalCircle of additionalCirclesArray) {
    arrows[additionalCircle.text] = {
      direction: `none`,
    };
    if (
      `arrowValidationValue` in additionalCircle &&
      additionalCircle.arrowValidationValue in liveData
    ) {
      const values = liveData[additionalCircle.arrowValidationValue].values;
      if (`greaterThan` in additionalCircle) {
        if (values[values.length - 1] > additionalCircle.greaterThan.value) {
          arrows[additionalCircle.text].direction =
            additionalCircle.greaterThan.direction;
        }
      }
      if (`lessThan` in additionalCircle) {
        if (values[values.length - 1] < additionalCircle.lessThan.value) {
          arrows[additionalCircle.text].direction =
            additionalCircle.lessThan.direction;
        }
      }
    } else {
      if (additionalCircle.text == `Turbina wiatrowa`) {
        if (windTurbinePercentage > 0) {
          arrows[additionalCircle.text].direction = `inside`;
        }
      } else if (additionalCircle.text == `Obciążenie liniowe`) {
        if (linearLoadPercentage > 0) {
          arrows[additionalCircle.text].direction = `outside`;
        }
      } else if (additionalCircle.text == `Obciążenie nieliniowe`) {
        if (nonLinearLoadPercentage > 0) {
          arrows[additionalCircle.text].direction = `outside`;
        }
      }
    }
  }

  const values = {
    islandWork,
    setIslandWork,
    synchronousWork,
    setSynchronousWork,
    windTurbinePercentage,
    setWindTurbinePercentage,
    linearLoadPercentage,
    setLinearLoadPercentage,
    nonLinearLoadPercentage,
    setNonlinearLoadPercentage,
    inverterGeneratedPower,
    setInverterGeneratedPower,
    manualSettings,
    setManualSettings,
    currentDataProfile,
    liveData,
    allProfiles,
    changeProfile,
    arrows,
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
