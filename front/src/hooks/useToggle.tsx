import { useState } from "react";

type ToggleType = [value: boolean, toggleValue: (value?: boolean) => void];

export const useToggle = (defaultValue: boolean) => {
  const [value, setValue] = useState(defaultValue);

  const toggleValue = (value?: boolean) => {
    setValue((currentValue) =>
      typeof value === "boolean" ? value : !currentValue,
    );
  };

  const returnValues: ToggleType = [value, toggleValue];
  return returnValues;
};
