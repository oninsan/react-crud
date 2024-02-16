import { useState, useEffect } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const UpdateDept = ({ toggled, untoggle, updateDeptName, currentId }) => {
  const [deptName, setDeptName] = useState("");

  const getDeptName = async (currentId) => {
    try {
      const response = await fetch(
        "http://localhost:5134/api/Department/" + currentId
      );
      const data = await response.json();
      setDeptName(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    isMounted ? getDeptName(currentId) : setDeptName(deptName);
    return () => {
      isMounted = false;
    };
  }, [currentId]);

  return (
    <Modal isOpen={toggled} toggle={untoggle}>
      <ModalHeader toggle={untoggle}>Modal title</ModalHeader>
      <ModalBody>
        <input
          type="text"
          value={deptName}
          onChange={(e) => setDeptName(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            updateDeptName(currentId, deptName);
            untoggle();
            setDeptName("");
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
