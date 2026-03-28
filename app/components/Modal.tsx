import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>title</DialogTitle>
      <DialogContent>inputs</DialogContent>
      <DialogActions>actions</DialogActions>
    </Dialog>
  );
}
