import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form,Image} from 'react-bootstrap';
import { Grid,Paper, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";


export class ShtoAeroplani extends Component{
  constructor(props) {
    super(props);
    this.state={sta:[],kom:[]}; 
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    fetch(process.env.REACT_APP_API+'Stafi')
    .then(response=>response.json())
    .then(data=>{
        this.setState({sta:data});
    })
    fetch(process.env.REACT_APP_API+'Kompania')
  .then(response=>response.json())
  .then((data) => {
      this.setState({kom:data});
  });
}
  
     handleSubmit(event){
         event.preventDefault();
         fetch(process.env.REACT_APP_API+"Aeroplani",{
             method:'POST',
             headers:{
                 'Accept':'application/json',
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
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
         })
        }

    render(){
        return (

<Grid   alignItems="center" item xs={10}>
                      <h2 class="ShtoText" >Shto Aeroplanin</h2>
       <Row>
         <Col sm={6}>
           <Form onSubmit={this.handleSubmit}>
             
             

            <Form.Group controlId="Stafi">
                        <Form.Label>Stafi</Form.Label>
                        <Form.Control as="select">
                        {this.state.sta.map(sta=>
                            <option key={sta.StafiID}>{sta.EmriMbiemri}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Kompania">
                        <Form.Label>Kompania</Form.Label>
                        <Form.Control as="select">
                        {this.state.kom.map(kom=>
                            <option key={kom.KompaniaID}>{kom.KompaniaEmri}</option>)}
                        </Form.Control>
                    </Form.Group>

             <Form.Group>
               <Button variant="primary" type="submit">
                 Shto Aeroplanin
               </Button>
             </Form.Group>
           </Form>
         </Col>
        
       </Row>
       </Grid>
            
      )
   }
}