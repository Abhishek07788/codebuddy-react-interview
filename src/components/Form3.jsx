import { useState } from "react";
import {
  TextField,
  Grid,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import PropTypes from "prop-types";
import FormChangeButtons from "./FormChangeButtons";
import { useNavigate } from "react-router-dom";

const Form3 = ({ setSelectedTab, formData, setFormData }) => {
  const [countryCode, setCountryCode] = useState(formData.countryCode);
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newError = {};
    if (!countryCode) {
      newError.countryCode = "Select country code!";
    }
    if (!phoneNumber || phoneNumber.length !== 10) {
      newError.phoneNumber = "Add 10 digit phone number!";
    }
    if (!acceptTerms) {
      newError.acceptTerms = "You must accept the terms and conditions!";
    }
    return newError;
  };

  const handleSaveAndSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setError({});
      setFormData((prev) => ({ ...prev, countryCode, phoneNumber }));
      console.log("formData: ", { ...formData, countryCode, phoneNumber });
      navigate("/posts");
    } else {
      setError(validationErrors);
    }
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setError({});
    } else {
      setError(validationErrors);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined" size="small" error={!!error.countryCode}>
          <InputLabel id="countryCode-label">Country Code</InputLabel>
          <Select
            labelId="countryCode-label"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            label="Country Code"
            required
          >
            <MenuItem value="+91">India (+91)</MenuItem>
            <MenuItem value="+1">America (+1)</MenuItem>
          </Select>
          {error.countryCode && <FormHelperText error>{error.countryCode}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          required
          type="text"
          size="small"
          value={phoneNumber}
          error={!!error.phoneNumber}
          helperText={error.phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              required
            />
          }
          label="I accept the terms and conditions"
        />
        {error.acceptTerms && <FormHelperText error>{error.acceptTerms}</FormHelperText>}
      </Grid>
      <FormChangeButtons
        handleBack={() => setSelectedTab((prev) => prev - 1)}
        handleSave={handleSave}
        handleSaveAndNext={handleSaveAndSubmit}
        isNextDisabled={!countryCode || !phoneNumber || !acceptTerms}
        isSubmit
      />
    </Grid>
  );
};

Form3.propTypes = {
  setSelectedTab: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Form3;
