import CreateUser from "./createuser";
import Modal from "react-bootstrap/Modal";
import React from "react";
import Button from "react-bootstrap/Button";

export default function createusermodal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Please create a new User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateUser />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
