import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditAeroporti extends Component{
    constructor(props){
        super(props);
        this.state={qyt:[],aer:[]}; 

        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount(){
        fetch(process.env.REACT_APP_API+'Qyteti')
        .then(response=>response.json())
        .then(data=>{
            this.setState({qyt:data});
        })
        fetch(process.env.REACT_APP_API+'Aeroplani')
      .then(response=>response.json())
      .then((data) => {
          this.setState({aer:data});
      });
    }
  
     handleSubmit(event){
         event.preventDefault();
         fetch(process.env.REACT_APP_API+"Aeroporti",{
             method:'PUT',
             headers:{
                 'Accept':'application/json',
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                AeroportiID:event.target.AeroportiID.value,
                EmriAeroprtit:event.target.EmriAeroprtit.value,
                Aeroplani:event.target.Aeroplani.value,
                Qyteti:event.target.Qyteti.value,
             })
         })

         .then(res=>res.json())
         .then(result=>{
             alert(result);

         },
         (error)=>{
             alert('Failed');
         })
        }


    render(){
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
            Perditeso Aeroportin
         </Modal.Title>
    </Modal.Header>
    <Modal.Body>
       <Row>
         <Col sm={6}>
           <Form onSubmit={this.handleSubmit}>
                 <Form.Group controlId="AeroportiID">
                <Form.Label>Aeroporti ID</Form.Label>
                <Form.Control type="text" name="AeroportiID" required 
                disabled
                defaultValue={this.props.AeroportiID}
                placeholder="StafiID"/>
             </Form.Group>

             <Form.Group controlId="EmriAeroprtit">
                <Form.Label>EmriAeroportit</Form.Label>
                <Form.Control type="text" name="EmriAeroprtit" required 
                defaultValue={this.props.EmriAeroprtit}
                placeholder="EmriAeroportit"/>
             </Form.Group>

                    <Form.Group controlId="Aeroplani">
                        <Form.Label>Aeroplani</Form.Label>
                        <Form.Control as="select" name="Aeroplani" required 
                defaultValue={this.props.Aeroplani}
                placeholder="Aeroplani">
                        {this.state.aer.map(aer=>
                            <option key={aer.ShtetiCode}>{aer.ShtetiEmri}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Qyteti">
                        <Form.Label>Qyteti</Form.Label>
                        <Form.Control as="select" name="Qyteti"
                         required 
                    defaultValue={this.props.Qyteti}
                        placeholder="Qyteti" >
                        {this.state.qyt.map(qyt=>
                            <option key={qyt.ISO}>{qyt.Emri}</option>)}
                        </Form.Control>
                    </Form.Group>

             <Form.Group>
               <Button variant="primary" type="submit">
                 Perditeso Aeroportin
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