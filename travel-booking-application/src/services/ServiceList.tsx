import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const ServiceList = () => {
  const servicesData = [
    {
      imageUrl: weatherImg,
      title: "Calculate Weather",
      desc: "Lorem ipsum dolor sit amet, consectetur adip",
    },
    {
      imageUrl: guideImg,
      title: "Best Tour Guide",
      desc: "Lorem ipsum dolor sit amet, consectetur adip",
    },
    {
      imageUrl: customizationImg,
      title: "Customization",
      desc: "Lorem ipsum dolor sit amet, consectetur adip",
    },
  ];

  return (
    <>
      {servicesData.map((item, index) => (
        <Col
          lg="3"
          key={index}
          md="6"
          sm="12"
          className="mb-4"
        >
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
