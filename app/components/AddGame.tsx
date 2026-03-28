"use client";
import { Button } from "@mui/material";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";

export default function AddGame() {
  const addGameModal = useModal();

  return (
    <>
      <Button variant="contained" onClick={addGameModal.open}>
        Add game
      </Button>
      <Modal isOpen={addGameModal.isOpen} onClose={addGameModal.close} />
    </>
  );
}
