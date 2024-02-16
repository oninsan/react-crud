import { Button } from "reactstrap";

const DeptItem = ({
  id,
  name,
  toggleUpdateModal,
  toggleViewModal,
  deleteDept,
  setCurrentName,
  setCurrentId,
}) => {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>
        <Button
          size="sm"
          color="danger"
          className="mx-2"
          onClick={() => {
            deleteDept(id);
          }}
        >
          Delete
        </Button>
        <Button
          size="sm"
          onClick={() => {
            toggleViewModal();
            setCurrentName(name);
          }}
        >
          View
        </Button>
        <Button
          color="success"
          size="sm"
          className="mx-2"
          onClick={() => {
            toggleUpdateModal();
            setCurrentName(name);
            setCurrentId(id);
          }}
        >
          Update
        </Button>
      </td>
    </tr>
  );
};

export default DeptItem;
