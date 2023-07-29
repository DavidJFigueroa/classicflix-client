import React from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";

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

UserInfo.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  handleSubmitDeregister: PropTypes.func,
};
