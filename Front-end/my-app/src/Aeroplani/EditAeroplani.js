import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditAeroplani extends Component{
    constructor(props){
        super(props);
        this.state={sta:[],kom:[]}; 

        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount(){
      fetch(process.env.REACT_APP_API+'Stafi')
      .then(response=>response.json())
      .then(data=>{
          this.setState({sta:data});
      })
      fetch(process.env.REACT_APP_API+'Kompania')
      .then(response=>response.json())
      .then(data=>{
          this.setState({kom:data});
      });
    }

     handleSubmit(event){
         event.preventDefault();
         fetch(process.env.REACT_APP_API+"Aeroplani",{
             method:'PUT',
             headers:{
             Accept:'application/json',
                'Content-Type':'application/json'
             },
             body:JSON.stringify({
                AeroplaniID:event.target.AeroplaniID.value,
                Stafi:event.target.Stafi.value,
                Kompania:event.target.Kompania.value
             })
         })

         .then(res=>res.json())
         .then(result=>{
             alert(result);

         },
         (error)=>{
             alert('Failed');
         });
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
            Perditeso Aeroplanet
         </Modal.Title>
    </Modal.Header>
    <Modal.Body>
       <Row>
         <Col sm={6}>
           <Form onSubmit={this.handleSubmit}>
           <Form.Group controlId="AeroplaniID">
                    <Form.Label>AeroplaniID</Form.Label>
                    <Form.Control
                      name="AeroplaniID"
                      disabled
                      defaultValue={this.props.AeroplaniID}
                      placeholder="AeroplaniID"
                    />

             </Form.Group>
                 
                    <Form.Group controlId="Stafi">
                        <Form.Label>Stafi</Form.Label>
                        <Form.Control  
                            required
                             as="select"
                             name="Stafi"    
                             placeholder="Stafi"              
                             defaultValue={this.props.Stafi}>
                          
                            {this.state.sta.map(sta=>
                            <option key={sta.StafiID}>{sta.EmriMbiemri}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Kompania">
                        <Form.Label>Kompania</Form.Label>
                        <Form.Control as="select"
                         type="text"
                         name="Kompania"
                         required
                         defaultValue={this.props.Kompania}
                         placeholder="Kompania">
                         {this.state.kom.map(kom=>
                            <option key={kom.KompaniaID}>{kom.KompaniaEmri}</option>)}
                        </Form.Control>
                    </Form.Group>
                    
             <Form.Group>
               <Button variant="primary" type="submit">
                 Perditeso Aeroplanet
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