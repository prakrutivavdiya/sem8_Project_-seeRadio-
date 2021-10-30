import React from "react";
import Modal from "react-modal";
import { Row, Col, Label } from "reactstrap";
import { BsXSquareFill } from "react-icons/bs";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    padding: "0px",
    bottom: "auto",
    width: "60%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function PersonDetailModal({ modalIsOpen, closeModal, person, companyData }) {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div style={{ width: "100%", backgroundColor: "#09b7ec" }}>
          <div style={{ padding: "10px" }}>
            <h3>
              {person.firstName} {person.lastName}
              <span style={{ float: "right" }}>
                <BsXSquareFill
                  style={{ cursor: "pointer" }}
                  onClick={closeModal}
                />
              </span>
            </h3>
          </div>
        </div>
        <Row style={{ padding: "10px" }}>
          <Col>
            <Label className="font-weight-bold">Company Name</Label>
            <p>{companyData.companyName}</p>
          </Col>

          <Col>
            <Label className="font-weight-bold">Role</Label>
            <p>{person.roleCode}</p>
          </Col>
        </Row>

        <Row style={{ padding: "10px" }}>
          <Col className="text-muted">
            <h5>Contact Details</h5>
            <hr></hr>
          </Col>
        </Row>
        <Row style={{ padding: "10px" }}>
          <Col>
            <Label className="font-weight-bold">Address</Label>
            <p>New Jercey, USA</p>
          </Col>

          <Col>
            <Label className="font-weight-bold">Email</Label>
            <p>{person.email}</p>
            <Label className="font-weight-bold">Phone</Label>
            <p>{person.phone}</p>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default PersonDetailModal;
