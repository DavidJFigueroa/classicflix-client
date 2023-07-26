import React from "react";
import {Button, Form, Row, Container, Card, Col} from "react-bootstrap";

export function UserInfo({email, name, handleSubmitDeregister}) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Personal Info</Card.Title>
          <p>
            <b>Name: </b>
            {name}
          </p>
          <p>
            <b>Email:</b> {email}
          </p>

          <Button variant="primary" onClick={handleSubmitDeregister}>
            Delete Account
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
