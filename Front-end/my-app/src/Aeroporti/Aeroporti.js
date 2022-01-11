import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import { Grid, Paper } from "@material-ui/core";
import {Button,ButtonToolbar} from 'react-bootstrap';
import {ShtoAeroporti} from './ShtoAeroporti';
import {EditAeroporti} from './EditAeroporti';


export class Aeroporti extends Component{

    constructor(props){
        super(props);
        this.state={Aeroporti:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Aeroporti')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Aeroporti:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteAeroporti(AeroportiID){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Aeroporti/'+AeroportiID,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {Aeroporti,AeroportiID,EmriAeroprtit,Aeroplani,Qyteti}=this.state;
        let editModalClose=()=>this.setState({editModalShow:false});
        return(

            <Paper elevation={5}>

            <Grid container spacing={3}>
                <Grid item xs={2} />
                <Grid direction="column" item xs={4}>

                    <ShtoAeroporti />
                </Grid>
                <Grid item xs={6}>


                <div>
                <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                        <tr>
                        <th>Aeroporti ID</th>
                        <th>Emri i Aeroprtit</th>
                        <th>Aeroplani</th>
                        <th>Qyteti</th>
                        <th><img className="pencilphoto"src="http://localhost:3000/Pencil.png"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Aeroporti.map(a=>
                            <tr key={a.AeroportiID}>
                                <td>{a.EmriAeroprtit}</td>
                                <td>{a.Aeroplani}</td>
                                <td>{a.Qyteti}</td>
                                <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                     onClick={()=>this.setState({editModalShow:true,
                                        AeroportiID:a.AeroportiID,
                                        EmriAeroprtit:a.EmriAeroprtit,
                                        Aeroplani:a.Aeroplani,
                                        Qyteti:a.Qyteti,
                                     })}>
                                     Perditeso
                                     </Button>

                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteAeroporti(a.AeroportiID)}>
                                        Delete
                                        </Button>

                                        <EditAeroporti show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        AeroportiID={AeroportiID}
                                        EmriAeroprtit={EmriAeroprtit}
                                        Aeroplani={Aeroplani}
                                        Qyteti={Qyteti}
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