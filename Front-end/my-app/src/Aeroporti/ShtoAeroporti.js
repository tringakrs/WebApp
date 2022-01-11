import React,{Component} from 'react';
import {Button, Row, Col, Form} from 'react-bootstrap';
import { Grid } from "@material-ui/core";

export class ShtoAeroporti extends Component{
  constructor(props) {
    super(props);
    this.state={aer:[],qyt:[]}; 
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
    componentDidMount(){
      fetch(process.env.REACT_APP_API+'Aeroplani')
      .then(response=>response.json())
      .then(data=>{
          this.setState({aer:data});
      })
      fetch(process.env.REACT_APP_API+'Qyteti')
      .then(response=>response.json())
      .then(data=>{
          this.setState({qyt:data});
      });
  }

     handleSubmit(event){
         event.preventDefault();
         fetch(process.env.REACT_APP_API+"Aeroporti",{
             method:'POST',
             headers:{
                 'Accept':'application/json',
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                EmriAeroprtit: event.target.EmriAeroprtit.value,
                Aeroplani: event.target.Aeroplani.value,
                Qyteti: event.target.Qyteti.value,

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
           
          <Grid   alignItems="center" item xs={9}>
                      <h2 class="ShtoText">Shto Aeroportin</h2>
       <Row>
         <Col sm={7}>
           <Form onSubmit={this.handleSubmit}>
               <Form.Group controlId="EmriAeroprtit">
               
                <Form.Control type="text" name="EmriAeroportit" required placeholder="Emri i Aeroportit"/>
             </Form.Group>

                 
              <Form.Group controlId="Aeroplani">
                        <Form.Label>Aeroplani</Form.Label>
                        <Form.Control as="select">
                        {this.state.aer.map(aer=>
                            <option key={aer.AeroplaniID}></option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Qyteti">
                        <Form.Label>Qyteti</Form.Label>
                        <Form.Control as="select">
                        {this.state.qyt.map(qyt=>
                            <option key={qyt.ISO}>{qyt.Emri}</option>)}
                        </Form.Control>
                    </Form.Group>


             <Form.Group>
               <Button variant="primary" type="submit">
                 Shto Aeroportin
               </Button>
             </Form.Group>
           </Form>
         </Col>
       </Row>      

       </Grid>
      )
   }
}