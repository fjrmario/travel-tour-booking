import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Table } from "reactstrap";

import { useFetch } from "../hooks/useFetch";
import { BASE_URL } from "../utility/url";

import "../styles/personal.css";

const PersonalTour = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

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
        setBookings(data.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const handleDelete = async (bookingId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/bookings/manage/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
      // Update the bookings list by filtering out the deleted booking
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (bookingId) => {
    navigate(`/manage/edits/${bookingId}`);
  };

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <h6>No bookings found</h6>
      ) : (
        <Table striped>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Guest Size</th>
              <th>Tour Name</th>
              <th>Booked At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.fullName}</td>
                <td>{booking.guestSize}</td>
                <td>{booking.tourName}</td>
                <td>
                  {new Date(booking.bookAt).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Delete
                  </Button>{" "}
                  <Button onClick={() => handleEdit(booking._id)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default PersonalTour;
