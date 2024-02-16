import { Form, Button, Col } from "reactstrap";
import { useState } from "react";

const CreateDeptForm = ({ submit }) => {
  const [deptName, setDeptName] = useState("");

  const OnSubmit = (e) => {
    e.preventDefault();
    submit(deptName);
    setDeptName("");
  };
  return (
    <>
      <h1>Department List</h1>
      <Col>
        <Form onSubmit={OnSubmit} className="d-flex mb-2">
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
    </>
  );
};

export default CreateDeptForm;
