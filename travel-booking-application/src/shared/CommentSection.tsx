import React from "react";
import "./commentSection.css";

import { Container, Row, Col } from "reactstrap";

const CommentSection = ({ title }) => {
  return (
    <section className="common__section">
      <video
        src="https://www.shutterstock.com/shutterstock/videos/1047988699/preview/stock-footage-thousands-of-floating-fire-paper-lanterns-in-the-night-sky-with-reflection-in-the-pool-at-yee-peng.webm"
        autoPlay
        loop
        muted
        className="bg-video"
      ></video>
      <Container>
        <Row>
          <Col lg="12">
            <h1>{title}</h1>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CommentSection;
