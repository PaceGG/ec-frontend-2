import { useState } from "react";

interface InputItem {
  id: number;
  value: string;
}

export function useGameNamesForm(inputs: InputItem[], resetInputs: () => void) {
  const [mainGameName, setMainGameName] = useState("");

  const reset = () => {
    setMainGameName("");
    resetInputs();
  };

  const submit = () => {
    if (!inputs.length) {
      console.log(`Post Game: ${mainGameName}`);
    } else {
      console.log(`Post Game Series: ${mainGameName}`);
      console.log(inputs.map((i) => i.value));
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
