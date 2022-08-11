import React from "react";
import { Container } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { emailVerifyAdmin } from "../../helpers/axiosHelper";
import { Alert } from "react-bootstrap";

//show the spinner first
//Grab the c and e from the query string parameters
//Create an axios function to cal the server

//Create api end point to receive this code
//Check if the combination of the email and code exist in the user table, is so activate the user and send email notification.

const EmailVerification = () => {
  const [queryParams] = useSearchParams();
  const [isPending, setIsPending] = useState(true);
  const [response, setResponse] = useState({});
  useEffect(() => {
    const obj = {
      emailValidationCode: queryParams.get("c"),
      email: queryParams.get("e"),
    };
    //call axios to call the server
    //IIFFY function
    (async () => {
      const result = await emailVerifyAdmin(obj);
      setResponse(result);
      setIsPending(false);
    })();
  }, []);

  return (
    <div>
      <Header />

      <Container className="page-main">
        {isPending && (
          <Card className="mt-5 p-2 m-auto" style={{ width: "20rem" }}>
            <Spinner
              variant="primary"
              animation="border"
              className="m-auto mb-4"
            ></Spinner>
            <h2> Email Verification Process has began,Please wait .....</h2>
          </Card>
        )}
        {response.message && (
          <Alert
            className="mt-5 p-2 m-auto"
            style={{ width: "20rem" }}
            variant={response.status === "success" ? "success" : "danger"}
          >
            {response.message}
          </Alert>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default EmailVerification;
