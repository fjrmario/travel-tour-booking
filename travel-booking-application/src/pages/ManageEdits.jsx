import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utility/url";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const ManageEdits = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [validationMsg, setValidationMsg] = useState("");

  const [bookings, setBookings] = useState({
    fullName: "",
    email: "",
    tourName: "",
    guestSize: "",
    bookAt: "",
  });

  useEffect(() => {
    fetch(`${BASE_URL}/bookings/manage/bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  useEffect(() => {
    console.log(bookings);
  }, [bookings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${BASE_URL}/bookings/manage/bookings/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookings),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        setValidationMsg(error);
      } else {
        navigate("/manage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setBookings({ ...bookings, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <h1 className="mt-3">Edit Booking</h1>
      <Row>
        <Col md="6">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="guestSize">Guest Size:</Label>
              <Input
                type="number"
                id="guestSize"
                name="guestSize"
                value={bookings.guestSize}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="bookAt">Booking Date:</Label>
              <Input
                type="date"
                id="bookAt"
                name="bookAt"
                value={bookings.bookAt}
                onChange={handleInputChange}
              />
            </FormGroup>
            <div className="validation-error">{validationMsg.message}</div>
            <Button
              color="primary"
              type="submit"
            >
              Update Booking
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageEdits;
