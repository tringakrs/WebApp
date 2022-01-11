import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { Grid,Paper, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";


export class Apliko extends Component{
   constructor(props) {
      super(props);
      this.state={rol:[]}; 
      this.handleSubmit = this.handleSubmit.bind(this);
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
         fetch(process.env.REACT_APP_API+"AplikoPerPune",{
             method:'POST',
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
         .then(result=>{
             alert(result);

         },
         (error)=>{
             alert('Failed');
         })
        }


    render(){
        return (
            

                  <Grid   alignItems="left" item xs={10}>
                      <h2 class="ShtoText">Apliko</h2>
                      
       <Row>
         <Col  sm={6}>
           <Form onSubmit={this.handleSubmit}>
             <Form.Group  controlId="Emri">
               
                <Form.Control type="text" name="Emri"
                 required placeholder="Emri"/>
             </Form.Group>

             <Form.Group controlId="Mbiemri">

                              <Form.Control type="text" name="Mbiemri" required placeholder="Mbiemri" />
                           </Form.Group>

                           <Form.Group controlId="NrPersonal">

                              <Form.Control type="text" name="NrPersonal" required placeholder="NrPersonal" />
                           </Form.Group>

                           <Form.Group controlId="Adresa">

                              <Form.Control type="text" name="Adresa" required placeholder="Adresa" />
                           </Form.Group>

                           <Form.Group controlId="NrTelefonit">

                              <Form.Control type="text" name="NrTelefonit" required placeholder="NrTelefonit" />
                           </Form.Group>

                           <Form.Group controlId="DataELindjes">
                              <Form.Label>Ditelindja</Form.Label>
                              <Form.Control
                                 type="date"
                                 name="DataELindjes"
                                 required
                                 placeholder="Ditelindja"
                              />
                           </Form.Group>
                           
                           <Form.Group controlId="Gjinia">
                        <Form.Label>Gjinia</Form.Label>                     
                        <Form.Control as="select"   type="text">
                                <option value="Mashkull">Mashkull</option>
                                <option value="Femer">Femer</option>
                                <option value="Tjeter">Tjeter</option>                       
                        </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="Pozita">
                        <Form.Label>Pozita</Form.Label>
                        <Form.Control as="select">
                        {this.state.rol.map(rol=>
                            <option key={rol.RoliID}>{rol.RoliEmri}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Kompania">
                        <Form.Label>Kompania</Form.Label>
                        <Form.Control as="select">
                        {this.state.rol.map(rol=>
                            <option key={rol.RoliID}>{rol.RoliEmri}</option>)}
                        </Form.Control>
                    </Form.Group>
             <Form.Group>
               <Button variant="primary" type="submit">
                 Apliko
               </Button>
             </Form.Group>
           </Form>
         </Col>
       </Row>
</Grid>
     
            
         
      )
   }
}