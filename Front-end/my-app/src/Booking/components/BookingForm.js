import React, { useState, useEffect } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  withStyles,
  Button,
  FormHelperText,
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/booking";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  Data: '',
  Klienti: '',
  Kompanite: '',
  Banka: '',
  FluturimetID: ''
};

const BookingForm = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("Data" in fieldValues)
      temp.Data = fieldValues.Data ? "" : "Ploteso fushen per Data!";
    if ("Klienti" in fieldValues)
      temp.Klienti = fieldValues.Klienti ? "" : "Ploteso fushen per Klientin!";
    if ("Kompanite" in fieldValues)
      temp.Kompanite = fieldValues.Kompanite ? "" : "Zgjedh fushen per Kompanite!";
    if ("Banka" in fieldValues)
      temp.Banka = fieldValues.Banka ? "" : "Zgjedh fushen per Banka!";
    if ("FluturimetID" in fieldValues)
      temp.FluturimetID = fieldValues.FluturimetID ? "" : "Zgjedh fushen per FluturimetID!";
    setErrors({
      ...temp,
    });
    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("U perfundua me sukses!", { appearance: "success" });
      };
      if (props.currentId === 0)
        props.createBooking(values, onSuccess);
      else
        props.updateBooking(props.currentId, values, onSuccess);
    }
  };

  useEffect(() => {
    if (props.currentId !== 0)
      setValues({
        ...props.bookingList.find((x) => x.id === props.currentId),
      });
    setErrors({});
  }, [props.currentId]);

  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="Data"
            variant="outlined"
            label=""
            type="date"
            value={values.Data}
            helperText={errors.Data}
            onChange={handleInputChange}
            {...(errors.Data && { error: true, helperText: errors.Data })}
          />
           <TextField
            name="Klienti"
            variant="outlined"
            label="Klienti"
            value={values.Klienti}
            helperText={errors.Klienti}
            onChange={handleInputChange}
            {...(errors.Klienti && { error: true, helperText: errors.Klienti })}
          />
          <TextField
            name="Kompanite"
            variant="outlined"
            label="Kompanite"
            value={values.Kompanite}
            helperText={errors.Kompanite}
            onChange={handleInputChange}
            {...(errors.Kompanite && { error: true, helperText: errors.Kompanite })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="Banka"
            variant="outlined"
            label="Banka"
            value={values.Banka}
            helperText={errors.Banka}
            onChange={handleInputChange}
            {...(errors.Banka && { error: true, helperText: errors.Banka })}
          />
          <TextField
            name="FluturimetID"
            variant="outlined"
            label="FluturimetID"
            value={values.FluturimetID}
            helperText={errors.FluturimetID}
            onChange={handleInputChange}
            {...(errors.FluturimetID && { error: true, helperText: errors.FluturimetID })}
          />
        </Grid>
        <Grid item xs={6}>
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.smMargin}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              className={classes.smMargin}
              onClick={resetForm}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => ({
  bookingList: state.booking.list,
});

const mapActionToProps = {
  createBooking: actions.create,
  updateBooking: actions.update
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(BookingForm));
