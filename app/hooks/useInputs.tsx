import { useRef, useState } from "react";

export interface InputItem {
  id: number;
  value: string;
}

export function useInputs() {
  const [inputs, setInputs] = useState<InputItem[]>([]);
  const inputRefs = useRef<Map<number, HTMLInputElement>>(new Map());
  const nextId = useRef(1);

  const addInput = () => {
    const newInput = {
      id: nextId.current++,
      value: "",
    };

    setInputs((prev) => [...prev, newInput]);
  };

  const removeInput = (id: number) => {
    inputRefs.current.delete(id);

    setInputs((prev) => prev.filter((input) => input.id !== id));
  };

  const updateValue = (id: number, value: string) => {
    setInputs((prev) =>
      prev.map((input) => (input.id === id ? { ...input, value } : input)),
    );
  };

  const reset = () => {
    setInputs([]);
    nextId.current = 1;
    inputRefs.current.clear();
  };

  return {
    inputs,
    addInput,
    removeInput,
    updateValue,
    inputRefs,
    reset,
  };
}
