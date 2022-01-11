import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import {
  Grid,
  Paper,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

export class ShtoBooking extends Component {
  constructor(props) {
    super(props);
    this.state = { kl: [],kom:[] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API+'Kompania')
  .then(response=>response.json())
  .then((data) => {
      this.setState({kom:data});
  })
    fetch(process.env.REACT_APP_API + "Klienti")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ kl: data });
      });
}

  handleSubmit(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "Booking", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Data: event.target.Data.value,
        Klienti: event.target.Klienti.value,
        Kompanite: event.target.Kompanite.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  render() {
    return (
      <Grid alignItems="center" item xs={6}>
        <h2>Shto Booking</h2>

        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="Data">
                <Form.Control
                  type="date"
                  name="Data"
                  required
                  placeholder="Data"
                />
              </Form.Group>
              <Form.Group controlId="Klienti">
                <Form.Label>Klienti</Form.Label>
                <Form.Control as="select">
                  {this.state.kl.map((k) => (
                    <option value={undefined} key={k.KlientiID}>{k.EmriMbiemri}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="Kompanite">
              <Form.Label>Kompanite</Form.Label>

                <Form.Control
                  type="text"
                  name="Kompanite"
                  
                  placeholder="Kompanite"
                  as="select"
                >
                 {this.state.kom.map(kom=>
                            <option key={kom.KompaniaID}>{kom.KompaniaEmri}</option>)}
             </Form.Control>
              </Form.Group>

              <Form.Group>
                <Button variant="primary" type="submit">
                  Shto Booking
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
