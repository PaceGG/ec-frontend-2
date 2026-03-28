import { useState } from "react";
import { InputItem } from "./useInputs";
import ec from "../api";

export function useGameNamesForm(inputs: InputItem[], resetInputs: () => void) {
  const [mainGameName, setMainGameName] = useState("");

  const reset = () => {
    setMainGameName("");
    resetInputs();
  };

  const submit = () => {
    if (!inputs.length) {
      ec.postGame(mainGameName);
    } else {
      ec.postGames(
        mainGameName,
        inputs.map((i) => i.value),
      );
    }

    reset();
  };

  return {
    mainGameName,
    setMainGameName,
    reset,
    submit,
  };
}
