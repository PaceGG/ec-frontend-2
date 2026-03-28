import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

// icons
import CloseIcon from "@mui/icons-material/Close";
import Input from "./Input";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        Add Game{" "}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Input />
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="contained" onClick={onClose}>
          Cancel
        </Button>
        <Button color="success" variant="contained" onClick={onClose}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
