import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class EditBooking extends Component {
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
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: event.target.id.value,
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
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Perditeso Booking
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="id">
                    <Form.Label>id</Form.Label>
                    <Form.Control
                      type="text"
                      name="id"
                      required
                      defaultValue={this.props.id}
                      placeholder="id"
                    />
                  </Form.Group>

                  <Form.Group controlId="Data">
                    <Form.Label>Data</Form.Label>
                    <Form.Control
                      type="text"
                      name="Data"
                      required
                      defaultValue={this.props.Data}
                      placeholder="Data"
                    />
                  </Form.Group>

                  <Form.Group controlId="Klienti">
                    <Form.Label>Klienti</Form.Label>
                    <Form.Control as="select" defaultValue={this.props.Klienti}>
                      {this.state.kl.map((k) => (
                        <option key={k.KlientiID}>{k.EmriMbiemri}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="Kompanite">
                        <Form.Label>Kompanite</Form.Label>
                        <Form.Control as="select">
                        {this.state.kom.map(kom=>
                            <option key={kom.KompaniaID}>{kom.KompaniaEmri}</option>)}
                        </Form.Control>
                    </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Perditeso Booking
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
