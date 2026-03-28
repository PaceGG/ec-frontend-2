import { TextField } from "@mui/material";
import { useInput } from "../hooks/useInput";

export default function Input() {
  const input = useInput();

  return <TextField value={input.value} onChange={input.onChange} />;
}
