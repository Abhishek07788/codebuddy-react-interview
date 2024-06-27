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

const validate = (countryCode, phoneNumber, acceptTerms) => {
  const newError = {};
  if (!countryCode) {
    newError.countryCode = "Select country code!";
  }
  if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
    newError.phoneNumber = "Enter a valid phone number of 10 digit!";
  }
  if (!acceptTerms) {
    newError.acceptTerms = "You must accept the terms and conditions!";
  }
  return newError;
};

const postData = async (formData) => {
  return (
    await fetch("https://codebuddy.review/submit", {
      method: "POST",
      body: JSON.stringify(formData),
    })
  ).json();
};

const Form3 = ({ setSelectedTab, formData, setFormData }) => {
  const [countryCode, setCountryCode] = useState(formData.countryCode);
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const validationErrors = validate(countryCode, phoneNumber, acceptTerms);

  const handleSaveAndSubmit = () => {
    if (handleSave()) {
      postData({ ...formData, countryCode, phoneNumber })
        .then((res) => {
          console.log("response: ", res);
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/posts");
    }
  };

  const handleSave = () => {
    if (Object.keys(validationErrors).length === 0) {
      setError({});
      setFormData((prev) => ({ ...prev, countryCode, phoneNumber }));
      return true;
    } else {
      setError(validationErrors);
      return false;
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined" size="small" required error={!!error.countryCode}>
          <InputLabel id="countryCode-label">Country Code</InputLabel>
          <Select
            labelId="countryCode-label"
            value={countryCode}
            onChange={(e) => {
              setCountryCode(e.target.value);
              setError({});
            }}
            label="Country Code"
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
          type="number"
          size="small"
          value={phoneNumber}
          error={!!error.phoneNumber}
          helperText={error.phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            setError({});
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptTerms}
              onChange={(e) => {
                setAcceptTerms(e.target.checked);
                setError({});
              }}
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
        isNextDisabled={!countryCode || phoneNumber.length !== 10 || !acceptTerms}
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
