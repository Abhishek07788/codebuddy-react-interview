import { useState } from "react";
import { TextField, Grid } from "@mui/material";
import PropTypes from "prop-types";
import FormChangeButtons from "./FormChangeButtons";

const validate = (emailId, password) => {
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

const Form1 = ({ setSelectedTab, formData, setFormData }) => {
  const [emailId, setEmailId] = useState(formData.emailId);
  const [password, setPassword] = useState(formData.password);
  const [error, setError] = useState({});
  const validationErrors = validate(emailId, password);

  const handleSaveAndNext = () => {
    if (handleSave()) {
      setSelectedTab((prev) => prev + 1);
    }
  };

  const handleSave = () => {
    if (Object.keys(validationErrors).length === 0) {
      setError({});
      setFormData((prev) => ({ ...prev, emailId, password }));
      return true;
    } else {
      setError(validationErrors);
      return false;
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          label="Email Id"
          variant="outlined"
          fullWidth
          type="email"
          size="small"
          value={emailId}
          error={!!error.emailId}
          helperText={error.emailId}
          onChange={(e) => {
            setEmailId(e.target.value);
            setError({});
          }}
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
          onChange={(e) => {
            setPassword(e.target.value);
            setError({});
          }}
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
