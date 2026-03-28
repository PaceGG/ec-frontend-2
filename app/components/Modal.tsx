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

// icons
import CloseIcon from "@mui/icons-material/Close";
import Input from "./Input";
import { useGameNamesForm } from "../hooks/useGameNamesForm";
import { useInputs } from "../hooks/useInputs";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const inputs = useInputs();
  const gameNames = useGameNamesForm(inputs.inputs, inputs.reset);

  const handleClose = () => {
    gameNames.reset();
    onClose();
  };

  const handleConfirm = () => {
    gameNames.submit();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        Add Game{" "}
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
              value={gameNames.mainGameName}
              label={!inputs.inputs.length ? "Game name" : "Game series"}
              name="Game name"
              required
              onChange={(e) => gameNames.setMainGameName(e.target.value)}
            />
            {inputs.inputs.map((input, index) => (
              <Box>
                <TextField
                  key={`game-name-${input.id}`}
                  value={input.value}
                  label={`Game ${index + 1}`}
                  name="Game name"
                  required
                  onChange={(e) => inputs.updateValue(input.id, e.target.value)}
                />
                <Button onClick={() => inputs.removeInput(input.id)}>
                  del
                </Button>
              </Box>
            ))}
            <Button onClick={inputs.addInput}>+ ADD GAME</Button>
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
