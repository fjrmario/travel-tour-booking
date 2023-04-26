import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Button } from "reactstrap";
import { BASE_URL } from "../utility/url";

const ManageTours = () => {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/bookings/admin/manage/bookings`, {
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
        setTours(data.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const handleDelete = async (tourId) => {
    try {
      const response = await fetch(`${BASE_URL}/tours/${tourId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to delete tour");
      }
      // Update the tours list by filtering out the deleted tour
      setTours((prevTours) => prevTours.filter((tour) => tour._id !== tourId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (tourId) => {
    navigate(`/manager/edit/${tourId}`);
  };

  const handleCreate = (tourId) => {
    navigate(`/manager/is/creating`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1>Manage Tours</h1>
            <Button
              color="success"
              onClick={handleCreate}
            >
              Create Tour
            </Button>
          </div>
          <Table striped>
            <thead>
              <tr>
                <th>Title</th>
                <th>Address</th>
                <th>City</th>
                <th>Featured</th>
                <th>Max Group Size</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour._id}>
                  <td>{tour.title}</td>
                  <td>{tour.address}</td>
                  <td>{tour.city}</td>
                  <td>{tour.featured ? "Yes" : "No"}</td>
                  <td>{tour.maxGroupSize}</td>
                  <td>{tour.price}</td>
                  <td>
                    <Button
                      color="warning"
                      onClick={() => handleEdit(tour._id)}
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => handleDelete(tour._id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageTours;
