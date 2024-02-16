import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ViewDetail = ({ toggled, untoggle, currName }) => {
  return (
    <Modal isOpen={toggled} toggle={untoggle}>
      <ModalHeader toggle={untoggle}>Modal title</ModalHeader>
      <ModalBody>{currName}</ModalBody>
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
