import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {ShtoBooking} from './ShtoBooking';
import {EditBooking} from './EditBooking';
import { Grid,Paper, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";



export class Booking extends Component{

    constructor(props){
        super(props);
        this.state={bks:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Booking')
        .then(response=>response.json())
        .then(data=>{
            this.setState({bks:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteBooking(id){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Booking/'+id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {bks,id, Data, Klienti, Kompanite}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(

            <Paper  elevation={5}>

            <Grid container  spacing={4}>
            <Grid item xs={2}/>
               <Grid   direction="column" item xs={4}>
   
               <ShtoBooking/>
            </Grid>
            <Grid item xs={6}>
                    
            <div>

<Table className="mt-4" striped bordered hover size="sm">
<thead>
        <tr>
        <th>id</th>
        <th>Data</th>
        <th>Klienti</th>
        <th>Kompanite</th>
        <th><img className="pencilphoto"src="http://localhost:3000/Pencil.png"/></th>
    </tr>
    </thead>
    <tbody>
        {bks.map(bk=>
            <tr key={bk.id}>
                <td>{bk.id}</td>
                <td>{bk.Data}</td>
                <td>{bk.Klienti}</td>
                <td>{bk.Kompanite}</td>
                <td>
                <ButtonToolbar>
                    <Button className="mr-2" variant="info"
                     onClick={()=>this.setState({editModalShow:true,
                    id:bk.id,
                    Data:bk.Data,
                    Klienti:bk.Klienti,
                    Kompanite:bk.Kompanite,
                     })}>
                     Perditeso
                     </Button>

                        <Button className="mr-2" variant="danger"
                        onClick={()=>this.deleteBooking(bk.id)}>
                        Delete
                        </Button>

                        <EditBooking show={this.state.editModalShow}
                        onHide={editModalClose}
                        id={id}
                        Data={Data}
                        Klienti={Klienti}
                        Kompanite={Kompanite}
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