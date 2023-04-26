import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CreateTour = () => {
  const [tour, setTour] = useState({
    title: "",
    desc: "",
    photo: "",
    price: "",
    city: "",
    address: "",
    featured: false,
    maxGroupSize: "",
    bookedSlots: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(tour);
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/tours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(tour),
      });
      if (!response.ok) {
        throw new Error("Failed to create tour");
      }
      navigate("/manager");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setTour({ ...tour, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <h1 className="mt-3">Create Tour</h1>
      <Row>
        <Col md="6">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title:</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={tour.title}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="desc">Description:</Label>
              <Input
                type="textarea"
                id="desc"
                name="desc"
                value={tour.desc}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="photo">Photo:</Label>
              <Input
                type="text"
                id="photo"
                name="photo"
                value={tour.photo}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price:</Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={tour.price}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">City:</Label>
              <Input
                type="text"
                id="city"
                name="city"
                value={tour.city}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address:</Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={tour.address}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="featured"
                  checked={tour.featured}
                  onChange={() =>
                    setTour({ ...tour, featured: !tour.featured })
                  }
                />{" "}
                Featured
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="maxGroupSize">Max Group Size:</Label>
              <Input
                type="number"
                id="maxGroupSize"
                name="maxGroupSize"
                value={tour.maxGroupSize}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="bookedSlots">Bookings per day:</Label>
              <Input
                type="number"
                id="bookedSlots"
                name="bookedSlots"
                value={tour.bookedSlots}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <Button
              color="primary"
              type="submit"
            >
              Create Tour
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTour;
