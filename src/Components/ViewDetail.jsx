import { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ViewDetail = ({ toggled, untoggle, currentId }) => {
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
      <ModalBody>{deptName}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={untoggle}>
          Do Something
        </Button>
        <Button color="secondary" onClick={untoggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default ViewDetail;
