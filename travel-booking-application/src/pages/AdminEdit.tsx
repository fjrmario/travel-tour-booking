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

const AdminEdit = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetch(`${BASE_URL}/tours/${tourId}`, {
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
        setTour(data.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [tourId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/tours/${tourId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tour),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to update booking");
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
      <h1 className="mt-3">Edit Tour</h1>
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
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description:</Label>
              <Input
                type="textarea"
                id="description"
                name="description"
                value={tour.desc}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="photo">Image:</Label>
              <Input
                type="text"
                id="photo"
                name="photo"
                value={tour.photo}
                onChange={handleInputChange}
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
              />
            </FormGroup>
            <FormGroup>
              <Label for="featured">Featured:</Label>
              <Input
                type="select"
                id="featured"
                name="featured"
                value={tour.featured}
                onChange={handleInputChange}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="maxGroupSize">Max Group Size:</Label>
              <Input
                type="number"
                id="maxGroupSize"
                name="maxGroupSize"
                value={tour.maxGroupSize}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="maxGroupSize">Bookings per Day:</Label>
              <Input
                type="number"
                id="bookedSlots"
                name="bookedSlots"
                value={tour.bookedSlots}
                onChange={handleInputChange}
              />
            </FormGroup>
            <Button
              color="primary"
              type="submit"
            >
              Update Tour
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminEdit;
