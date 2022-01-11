import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import * as actions from "../actions/booking";
import BookingForm from './BookingForm'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { addToast, useToasts } from 'react-toast-notifications'

const styles = theme => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem"
    }
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  }
})

const Bookings = ({ classes, ...props }) => {

  const [currentId, setCurrentId] = useState(0)

  useEffect(() => {
    props.fetchAllBookings();
  }, []); //componentDidMount

  const { addToast } = useToasts()

  const onDelete = id => {
    if (window.confirm('A jeni i sigurt ta fshini?'))
      props.deleteBooking(id, () => addToast("U fshi me sukses", { appearance: 'info' }))
  }

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={6}>
          <BookingForm {...({ currentId, setCurrentId })} />
        </Grid>

        <Grid item xs={10}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>BookingID</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Klienti</TableCell>
                  <TableCell>Kompanite</TableCell>
                  <TableCell>Banka</TableCell>
                  <TableCell>FluturimetID</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  props.bookingList.map((record, index) => {
                    return (<TableRow key={index} hover>
                      <TableCell>{record.id}</TableCell>
                      <TableCell>{record.Data}</TableCell>
                      <TableCell>{record.Klienti}</TableCell>
                      <TableCell>{record.Kompanite}</TableCell>
                      <TableCell>{record.Banka}</TableCell>
                      <TableCell>{record.FluturimetID}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button><EditIcon color="primary"
                            onClick={() => { setCurrentId(record.id) }} /></Button>

                          <Button><DeleteIcon color="secondary" onClick={() => onDelete(record.id)} /></Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>)
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
  </Paper>
  );
};

const mapStateToProps = state => ({
  bookingList: state.booking.list
})

const mapActionToProps = {
  fetchAllBookings: actions.fetchAll,
  deleteBooking: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Bookings));
