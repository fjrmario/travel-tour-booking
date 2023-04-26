import React, { useRef, useState } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";

import { BASE_URL } from "../utility/url.js";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const [showValidationError, setShowValidationError] = useState(false);
  const locationRef = useRef("");
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === "" || maxGroupSize === "") {
      setValidationErrorMessage("All fields are required");
      setShowValidationError(true);
      document.querySelector(".search__bar").classList.add("shake");
      return;
    } else {
      setValidationErrorMessage("");
      setShowValidationError(false);
      document.querySelector(".search__bar").classList.remove("shake");
    }

    if (maxGroupSize <= 0) {
      setValidationErrorMessage("Max people should not be less than 0");
      setShowValidationError(true);
      return;
    } else {
      setValidationErrorMessage("");
      setShowValidationError(false);
    }

    const res = await fetch(
      `${BASE_URL}/tours/search/getTourBySearch?city=${location}&maxGroupSize=${maxGroupSize}`
    );

    if (!res.ok) alert("something went wrong");

    const result = await res.json();

    navigate(`/tours/search?city=${location}&maxGroupSize=${maxGroupSize}`, {
      state: result.data,
    });
  };

  return (
    <Col lg="12">
      <div className={`search__bar ${showValidationError ? "shake" : ""}`}>
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="where are you going?"
                ref={locationRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input
                type="number"
                placeholder="0"
                ref={maxGroupSizeRef}
              />
            </div>
          </FormGroup>
          <span
            className="search__icon"
            type="submit"
            onClick={searchHandler}
          >
            <i className="ri-search-line"></i>
          </span>
        </Form>
        {validationErrorMessage && (
          <div className="validation-error">{validationErrorMessage}</div>
        )}
      </div>
    </Col>
  );
};

export default SearchBar;
