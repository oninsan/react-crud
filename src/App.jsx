import { useEffect, useState } from "react";
import { Button, Table, Col, Form, Modal } from "reactstrap";
import ViewDetail from "./Components/ViewDetail";
import UpdateDept from "./Components/UpdateDept";
const App = () => {
  const [depts, setDepts] = useState([]);
  const [deptName, setDeptName] = useState("");
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

  const submit = async (e) => {
    e.preventDefault();

    try {
      const dataToPost = {
        name: deptName,
      };

      await fetch("http://localhost:5134/api/Department", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToPost),
      });
      setDeptName("");
      await getDepts();
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
            currentName={currentName}
          />
        ) : (
          ""
        )}

        {/* <Button>Hello</Button> */}
        <h1>Department List</h1>
        <Col>
          <Form onSubmit={submit} className="d-flex mb-2">
            <input
              type="text"
              placeholder="Dept name"
              value={deptName}
              onChange={(e) => {
                setDeptName(e.target.value);
              }}
              className="form-control me-2"
            />
            <Button color="primary">Submit</Button>
          </Form>
        </Col>

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
                <tr key={dept.id}>
                  <th scope="row">{dept.id}</th>
                  <td>{dept.name}</td>
                  <td>
                    <Button
                      size="sm"
                      color="danger"
                      className="mx-2"
                      onClick={() => {
                        deleteDept(dept.id);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        toggle();
                        setCurrentName(dept.name);
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
                        setCurrentName(dept.name);
                        setCurrentId(dept.id);
                      }}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </div>
    </>
  );
};

export default App;
