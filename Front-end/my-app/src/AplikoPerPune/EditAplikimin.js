import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditAplikimin extends Component{
    constructor(props){
        super(props);
        this.state={rol:[]}; 
    
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount(){
        fetch(process.env.REACT_APP_API+'Roli')
        .then(response=>response.json())
        .then(data=>{
            this.setState({rol:data});
        });
    }
    
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'AplikoPerPune',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Emri: event.target.Emri.value,
                Mbiemri: event.target.Mbiemri.value,
                NrPersonal: event.target.NrPersonal.value,
                Adresa: event.target.Adresa.value,
                NrTelefonit: event.target.NrTelefonit.value,
                DataELindjes: event.target.DataELindjes.value,
                Gjinia: event.target.Gjinia.value,
                Pozita: event.target.Pozita.value,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render() {
        
        return (
            <div className="container">

                 <Modal {...this.props} size="lg" 
                 aria-labelledby="contained-modal-title-vcenter" 
                 centered>
                     <Modal.Header closeButton>
                         <Modal.Title id="contained-modal-title-vcenter">
                         Perditeso Aplikimin
                         </Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                     <Row>
                         <Col sm={6}>
                             <Form onSubmit={this.handleSubmit}>
                                 <Form.Group controlId="Emri">
                                     <Form.Label>Emri</Form.Label>
                                     <Form.Control type="text" name="Emri" required
                                      defaultValue={this.props.em} placeholder="Emri"/>
                                 </Form.Group>

                                 <Form.Group controlId="Mbiemri">
                                     <Form.Label>Mbiemri</Form.Label>
                                     <Form.Control type="text" name="Mbiemri" required
                                     defaultValue={this.props.m} placeholder="Mbiemri"/>
                                 </Form.Group>
                                 
                                 <Form.Group controlId="NrPersonal">
                                     <Form.Label>NrPersonal</Form.Label>
                                     <Form.Control type="text" name="NrPersonal" required
                                     disabled
                                     defaultValue={this.props.nrP} placeholder="NrPersonal"/>
                                 </Form.Group>

                                 <Form.Group controlId="Adresa">
                                     <Form.Label>Adresa</Form.Label>
                                     <Form.Control type="text" name="Adresa" required
                                     defaultValue={this.props.ad} placeholder="Adresa"/>
                                 </Form.Group>

                                 <Form.Group controlId="NrTelefonit">
                                     <Form.Label>NrTelefonit</Form.Label>
                                     <Form.Control type="text" name="NrTelefonit" required
                                     defaultValue={this.props.nrT} placeholder="NrTelefonit"/>
                                 </Form.Group>

                                 <Form.Group controlId="DataELindjes">
                                 <Form.Label>Ditelindja</Form.Label>
                                 <Form.Control 
                                 type="dateTime"
                                 name="DataELindjes"
                                 required
                                 placeholder="Ditelindja"
                                 defaultValue={this.props.d}
                                 />
                                 </Form.Group>

                                 <Form.Group controlId="Gjinia">
                                     <Form.Label>Gjinia</Form.Label>
                                     <Form.Control type="text" name="Gjinia" required
                                     defaultValue={this.props.gj} placeholder="Gjinia"/>
                                 </Form.Group>


                                 <Form.Group controlId="Roli">
                                    <Form.Label>Pozita</Form.Label>
                                    <Form.Control as="select" name="Roli"
                                    required 
                                defaultValue={this.props.Qyteti}
                                    placeholder="Pozita" >
                                    {this.state.rol.map(rol=>
                                        <option key={rol.RoliID}>{rol.RoliEmri}</option>)}
                                    </Form.Control>
                                </Form.Group>

                                 <Form.Group>
                                     <Button variant="primary" type="submit">
                                     Perditeso Aplikimin
                                     </Button>
                                 </Form.Group>
                             </Form>
                         </Col>
                     </Row>
                 </Modal.Body>
                 <Modal.Footer>
                     <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                 </Modal.Footer>
                 </Modal>
            </div>
        )
    }
}
