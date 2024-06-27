import { useState } from "react";
import { TextField, Grid } from "@mui/material";
import PropTypes from "prop-types";
import FormChangeButtons from "./FormChangeButtons";

const validate = (firstName, lastName, address) => {
  const newErrors = {};
  if (!firstName || !/^[A-Za-z]{2,50}$/.test(firstName)) {
    newErrors.firstName = "First name must be between 2 and 50 alphabets!";
  }
  if (lastName && !/^[A-Za-z]*$/.test(lastName)) {
    newErrors.lastName = "Last name can only contain alphabets!";
  }
  if (!address || address.length < 10) {
    newErrors.address = "Address must have at least 10 characters!";
  }
  return newErrors;
};

const Form2 = ({ setSelectedTab, formData, setFormData }) => {
  const [firstName, setFirstName] = useState(formData.firstName);
  const [lastName, setLastName] = useState(formData.lastName);
  const [address, setAddress] = useState(formData.address);
  const [errors, setErrors] = useState({});
  const validationErrors = validate(firstName, lastName, address);

  const handleSaveAndNext = () => {
    if (handleSave()) {
      setSelectedTab((prev) => prev + 1);
    }
  };

  const handleSave = () => {
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setFormData((prev) => ({ ...prev, firstName, lastName, address }));
      return true;
    } else {
      setErrors(validationErrors);
      return false;
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          required
          type="text"
          size="small"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setErrors({});
          }}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          type="text"
          size="small"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setErrors({});
          }}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          required
          type="text"
          size="small"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setErrors({});
          }}
          error={!!errors.address}
          helperText={errors.address}
        />
      </Grid>
      <FormChangeButtons
        handleBack={() => setSelectedTab((prev) => prev - 1)}
        handleSave={handleSave}
        handleSaveAndNext={handleSaveAndNext}
      />
    </Grid>
  );
};

Form2.propTypes = {
  setSelectedTab: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Form2;
