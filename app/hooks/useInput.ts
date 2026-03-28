import { useState, ChangeEvent } from "react";

export function useInput(initialValue: string = "") {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setValue(e.target.value);
  };

  const reset = (): void => {
    setValue(initialValue);
  };

  return {
    value,
    onChange,
    reset,
  };
}
