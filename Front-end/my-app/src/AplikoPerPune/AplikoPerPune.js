import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {Apliko} from './Apliko';
import {EditAplikimin} from './EditAplikimin';
import { Grid,Paper, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";




export class AplikoPerPune extends Component{

    constructor(props){
        super(props);
        this.state={AplikoPerPune: [], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'AplikoPerPune')
        .then(response=>response.json())
        .then(data=>{
            this.setState({AplikoPerPune:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteAplikimin(NrPersonal){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'AplikoPerPune'+NrPersonal,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const { AplikoPerPune, Emri, Mbiemri, Adresa, NrTelefonit, DataELindjes, Gjinia, Pozita, NrPersonal}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(

            <Paper  elevation={5}>

            <Grid container  spacing={20}>
            <Grid item xs={2}/>
               <Grid   direction="column" item xs={3}>
   
               <Apliko/>
            </Grid>
            <Grid item xs={6}>
                    
            <div>

<Table className="mt-4" striped bordered hover size="sm">
<thead>
            <tr>
              <th>Emri</th>
              <th>Mbiemri</th>
              <th>NrPersonal</th>
              <th>Adresa</th>
              <th>NrTelefonit</th>
              <th>DataELindjes</th>
              <th>Gjinia</th>
              <th>Pozita</th>
              <th><img className="pencilphoto"src="http://localhost:3000/Pencil.png"/></th>
            </tr>
          </thead>
    <tbody>
        {AplikoPerPune.map(a=>
            <tr key={a.NrPersonal}>
                <td>{a.Emri}</td>
                <td>{a.Mbiemri}</td>
                <td>{a.NrPersonal}</td>
                <td>{a.Adresa}</td>
                <td>{a.NrTelefonit}</td>
                <td>{a.DataELindjes}</td>
                <td>{a.Gjinia}</td>
                <td>{a.Pozita}</td>
                <td>
                <ButtonToolbar>
                    <Button className="mr-2" variant="info"
                     onClick={()=>this.setState({editModalShow:true,
                        Emri: a.Emri,
                        Mbiemri: a.Mbiemri,
                        NrPersonal: a.NrPersonal,
                        Adresa: a.Adresa,
                        NrTelefonit: a.NrTelefonit,
                        DataELindjes: a.DataELindjes,
                        Gjinia: a.Gjinia,
                        Pozita: a.Pozita,
                     })}>
                     Perditeso
                     </Button>

                        <Button className="mr-2" variant="danger"
                        onClick={()=>this.deleteAplikimin(a.NrPersonal)}>
                        Delete
                        </Button>

                        <EditAplikimin show={this.state.editModalShow}
                        onHide={editModalClose}
                        Emri={Emri}
                        Mbiemri={Mbiemri}
                        NrPersonal={NrPersonal}
                        Adresa={Adresa}
                        NrTelefonit={NrTelefonit}
                        DataELindjes={DataELindjes}
                        Gjinia={Gjinia}
                        Pozita={Pozita}
                        />

                    </ButtonToolbar>
                    </td>
            </tr>)}
    </tbody>
</Table>
</div>
                    </Grid>
        </Grid>

            </Paper>

        )
    }
}