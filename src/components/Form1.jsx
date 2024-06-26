import { useState } from "react";
import { TextField, Grid } from "@mui/material";
import PropTypes from "prop-types";
import FormChangeButtons from "./FormChangeButtons";

const Form1 = ({ setSelectedTab, formData, setFormData }) => {
  const [emailId, setEmailId] = useState(formData.emailId);
  const [password, setPassword] = useState(formData.password);
  const [error, setError] = useState({});

  const validate = () => {
    const newError = {};
    if (!emailId || !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(emailId)) {
      newError.emailId = "It must be a valid emailId ID!";
    }
    if (
      !password ||
      !/(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)(?=.*[!@#$%^&*()_+].*[!@#$%^&*()_+]).{8,}/.test(
        password,
      )
    ) {
      newError.password =
        "Password must contain at least 2 capital letters, 2 small letters, 2 numbers, and 2 special characters.";
    }
    return newError;
  };

  const handleSaveAndNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSelectedTab((prev) => prev + 1);
      setError({});
      setFormData((prev) => ({ ...prev, emailId, password }));
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
        <TextField
          required
          label="emailId"
          variant="outlined"
          fullWidth
          type="emailId"
          size="small"
          value={emailId}
          error={!!error.emailId}
          helperText={error.emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          size="small"
          value={password}
          error={!!error.password}
          helperText={error.password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <FormChangeButtons
        isBackDisabled
        handleSave={handleSave}
        handleSaveAndNext={handleSaveAndNext}
      />
    </Grid>
  );
};

Form1.propTypes = {
  setSelectedTab: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Form1;
