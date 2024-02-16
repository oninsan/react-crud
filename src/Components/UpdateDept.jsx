import { useState } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const UpdateDept = ({
  toggled,
  untoggle,
  updateDeptName,
  currentId,
  currentName,
}) => {
  const [newName, setNewName] = useState(currentName);
  return (
    <Modal isOpen={toggled} toggle={untoggle}>
      <ModalHeader toggle={untoggle}>Modal title</ModalHeader>
      <ModalBody>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            updateDeptName(currentId, newName);
            untoggle();
            setNewName("");
          }}
        >
          Update
        </Button>
        <Button color="secondary" onClick={untoggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateDept;
