import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Grid, Paper } from "@material-ui/core";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { ShtoAeroplani } from './ShtoAeroplani';
import { EditAeroplani } from './EditAeroplani';
import './table.css';



export class Aeroplani extends Component {

    constructor(props) {
        super(props);
        this.state = { Aeroplani: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'Aeroplani')
            .then(response => response.json())
            .then(data => {
                this.setState({ Aeroplani: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteAeroplani(AeroplaniID) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'Aeroplani/' + AeroplaniID, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const { Aeroplani,AeroplaniID, Stafi, Kompania} = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (

            <Paper elevation={5}>

                <Grid container spacing={4}>
                    <Grid item xs={2} />
                    <Grid direction="column" item xs={3}>

                        <ShtoAeroplani />
                    </Grid>
                    <Grid  item xs={4}>

                        <div>
                            <Table className="mt-3" striped bordered hover size="sm" >
                                <thead >
                                    <tr>
                                        <th>AeroplaniID</th>
                                        <th>Stafi</th>
                                        <th>Kompania</th>
                                        <th><img className="pencilphoto"src="http://localhost:3000/Pencil.png"/></th>                                    </tr>
                                </thead>
                                <tbody>
                                    {Aeroplani.map(Kl =>
                                        <tr key={Kl.AeroplaniID}>
                                            <td>{Kl.AeroplaniID}</td>
                                            <td>{Kl.Stafi}</td>
                                            <td>{Kl.Kompania}</td>
                                            <td>
                                                <ButtonToolbar>
                                                    <Button className="mr-2" variant="info"
                                                        onClick={() => this.setState({
                                                            editModalShow: true,
                                                            AeroplaniID: Kl.AeroplaniID,
                                                            Stafi: Kl.Stafi,
                                                            Kompania: Kl.Kompania,
                                                        })}>
                                                        Perditeso
                                                    </Button>

                                                    <Button className="mr-2" variant="danger"
                                                        onClick={() => this.deleteAeroplani(Kl.AeroplaniID)}>
                                                        Delete
                                                    </Button>

                                                    <EditAeroplani show={this.state.editModalShow}
                                                        onHide={editModalClose}
                                                        AeroplaniID={AeroplaniID}
                                                        Stafi={Stafi}
                                                        Kompania={Kompania}
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