import React, { useState, useContext, useEffect } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utility/url.js";

const Booking = ({ tour, avgRating }) => {
  const [remainingSlots, setRemainingSlots] = useState(null);
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { id } = useParams();
  const [validationMsg, setValidationMsg] = useState("");

  console.log(remainingSlots);

  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: "",
    bookAt: "",
  });

  // const checkAvailability = async () => {
  //   try {
  //     const res = await fetch(
  //       `${BASE_URL}/tours/${id}/availability?date=${booking.bookAt}`
  //     );
  //     const data = await res.json();
  //     setRemainingSlots(data.data.remainingSlots);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const checkAvailability = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/tours/${id}/availability?date=${booking.bookAt}`
      );
      const data = await res.json();
      setRemainingSlots(data.data.remainingSlots);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    checkAvailability();
  }, [booking.bookAt]);

  const handleDateChange = (e) => {
    console.log(e.target.value);
    setBooking((prev) => ({ ...prev, bookAt: e.target.value }));
    console.log(booking.bookAt);
    checkAvailability();
  };

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      if (!user || user === undefined || user === null) {
        return setValidationMsg("Please Log In before booking");
      }

      const res = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await res.json();

      if (!res.ok) {
        return setValidationMsg(result.message);
      }
      navigate("/thank-you");
    } catch (error) {
      setValidationMsg(error.message);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (Number(booking.guestSize) > Number(tour.maxGroupSize)) {
      setValidationMsg("Guest size cannot be greater than maximum group size");
      return;
    }

    if (Number(booking.guestSize) <= 0) {
      setValidationMsg("Please set the amount of pax involved");
      return;
    }
    try {
      if (!user || user === undefined || user === null) {
        return setValidationMsg("Please log in");
      }

      const res = await fetch(`${BASE_URL}/bookings/${tour._id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await res.json();

      if (!res.ok) {
        return setValidationMsg(result.message);
      }
      navigate("/thank-you");
    } catch (error) {
      setValidationMsg(error.message);
    }
  };

  useEffect(() => {
    console.log(remainingSlots);
  }, [remainingSlots]);
  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating}{" "}
          ({reviews?.length})
        </span>
      </div>
      <div className="booking__form">
        <h5>Information</h5>
        <Form
          className="booking_info-form"
          onSubmit={handleReview}
        >
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone No."
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              min={new Date().toISOString().slice(0, 10)}
              onChange={handleDateChange}
              onClick={handleChange}
            />
            <input
              type="number"
              placeholder="Guest Size"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
      {remainingSlots === 0 ? (
        <p>Sorry, this tour is fully booked on this date</p>
      ) : remainingSlots ? (
        <p>{remainingSlots} slots available</p>
      ) : null}
      <span className="validation-error">{validationMsg}</span>
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i className="ri-close-line"></i>1 person
            </h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service Charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <button
          className="btn primary__btn w-100 mt-4"
          onClick={handleBooking}
        >
          Book Now!
        </button>
      </div>
    </div>
  );
};

export default Booking;
