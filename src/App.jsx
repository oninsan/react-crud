import { useEffect, useState } from "react";
import { Table, Col } from "reactstrap";
import ViewDetail from "./Components/ViewDetail";
import UpdateDept from "./Components/UpdateDept";
import CreateDeptForm from "./Components/CreateDeptForm";
import DeptItem from "./Components/DeptItem";

const App = () => {
  const [depts, setDepts] = useState([]);
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const toggle = () => setModal(!modal);
  const toggleUpdateModal = () => setUpdateModal(!updateModal);

  const getDepts = async () => {
    try {
      const response = await fetch("http://localhost:5134/api/Department");
      const data = await response.json();
      setDepts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async (newName) => {
    try {
      const dataToPost = {
        name: newName,
      };

      await fetch("http://localhost:5134/api/Department", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToPost),
      });
      await getDepts();
    } catch (error) {
      console.log(error);
    }
  };

  const updateDeptName = (id, deptName) => {
    const dataToPost = {
      id: id,
      name: deptName,
    };
    depts.map(async (dept) => {
      if (dept.id === id) {
        try {
          await fetch("http://localhost:5134/api/Department/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToPost),
          });
          getDepts();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const deleteDept = async (id) => {
    try {
      await fetch("http://localhost:5134/api/Department/" + id, {
        method: "DELETE",
      });
      getDepts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDepts();
  }, []);

  return (
    <>
      <div className="container mt-2">
        {modal ? (
          <ViewDetail
            toggled={modal}
            untoggle={toggle}
            currName={currentName}
            currentId={currentId}
          />
        ) : (
          ""
        )}
        {updateModal ? (
          <UpdateDept
            toggled={updateModal}
            untoggle={toggleUpdateModal}
            updateDeptName={updateDeptName}
            currentId={currentId}
            // currentName={currentName}
          />
        ) : (
          ""
        )}

        {/* <Button>Hello</Button> */}
        <CreateDeptForm submit={submit} />
        <Col>
          <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {depts.map((dept) => (
                <DeptItem
                  {...dept}
                  key={dept.id}
                  toggleViewModal={toggle}
                  toggleUpdateModal={toggleUpdateModal}
                  deleteDept={deleteDept}
                  setCurrentName={setCurrentName}
                  updateDeptName={updateDeptName}
                  setCurrentId={setCurrentId}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      </div>
    </>
  );
};

export default App;
