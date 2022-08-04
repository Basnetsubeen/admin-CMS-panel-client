import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <div>
      <Container className="bg-dark py-5 text-light text-center">
        &copy; Copy right all reserved 2022 || Made with 💕 by Me{" "}
        <a href="#">Subin Basnet</a>
      </Container>
    </div>
  );
};

export default Footer;
