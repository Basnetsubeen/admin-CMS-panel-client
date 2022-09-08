import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";

export const RequestOTP = ({ handleOnOtpRequest }) => {
  const emailRef = useRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleOnOtpRequest(emailRef.current.value);
  };
  return (
    <Container>
      <div className="form">
        <h2>Request OTP</h2>
        <hr />
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              ref={emailRef}
              label="Email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required="true"
            />
          </Form.Group>

          <Form.Group className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Request OTP
            </Button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};
