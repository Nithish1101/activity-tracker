import React from "react";
import { Spinner, Container } from "react-bootstrap";
import "./Message.css";

export function Loading() {
  return (
    <Container className="state">
      <Spinner animation="grow" />
    </Container>
  );
}

export function Error(props) {
  return (
    <Container className="state">
      <h3>{props.message}</h3>
    </Container>
  );
}
