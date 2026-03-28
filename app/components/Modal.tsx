import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useGameNamesForm } from "../hooks/useGameNamesForm";
import { InputItem, useInputs } from "../hooks/useInputs";
import { memo, useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GameInputProps {
  input: InputItem;
  index: number;
  updateValue: (id: number, value: string) => void;
  removeInput: (id: number) => void;
}

const GameInput = memo(
  function GameInput({
    input,
    index,
    updateValue,
    removeInput,
  }: GameInputProps) {
    const [localValue, setLocalValue] = useState(input.value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
      updateValue(input.id, e.target.value);
    };

    return (
      <Box>
        <TextField
          value={localValue}
          label={`Game ${index + 1}`}
          name="Game name"
          required
          autoFocus
          onChange={handleChange}
        />
        <Button onClick={() => removeInput(input.id)} color="error">
          del
        </Button>
      </Box>
    );
  },
  (prev, next) => prev.input.value === next.input.value,
);

export default function Modal({ isOpen, onClose }: ModalProps) {
  const inputs = useInputs();
  const gameNames = useGameNamesForm(inputs.inputs, inputs.reset);

  const updateValue = useCallback(inputs.updateValue, [inputs.updateValue]);
  const removeInput = useCallback(inputs.removeInput, [inputs.removeInput]);
  const addInput = useCallback(inputs.addInput, [inputs.addInput]);

  const handleClose = useCallback(() => {
    gameNames.reset();
    onClose();
  }, [gameNames, onClose]);

  const handleConfirm = useCallback(() => {
    gameNames.submit();
    onClose();
  }, [gameNames, onClose]);

  const handleMainGameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!inputs.inputs.length) {
        addInput();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        gameNames.mainGameNameRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} autoFocus>
      <DialogTitle>
        Add Game
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleConfirm();
        }}
      >
        <DialogContent>
          <Box p={1}>
            <TextField
              inputRef={gameNames.mainGameNameRef}
              value={gameNames.mainGameName}
              label={!inputs.inputs.length ? "Game name" : "Game series"}
              name="Game name"
              required
              onChange={(e) => gameNames.setMainGameName(e.target.value)}
              onKeyDown={handleMainGameKeyDown}
            />
            {inputs.inputs.map((input, index) => (
              <GameInput
                key={input.id}
                input={input}
                index={index}
                updateValue={updateValue}
                removeInput={removeInput}
              />
            ))}
            <Button variant="outlined" onClick={addInput}>
              + ADD GAME
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="success" variant="contained" type="submit">
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
