import { Button } from "reactstrap";
import { useEffect, useState } from "react";

const DeptItem = ({
  id,
  name,
  toggleUpdateModal,
  toggleViewModal,
  deleteDept,
  setCurrentName,
  setCurrentId,
}) => {
  const [deptName, setDeptName] = useState("");
  const getDeptName = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:5134/api/Department/" + id
      );
      const data = await response.json();
      setDeptName(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    isMounted ? getDeptName(id) : setDeptName(deptName);
    return () => {
      isMounted = false;
    };
  }, [id]);

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
            setCurrentId(id);
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
