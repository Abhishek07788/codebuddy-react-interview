import { Box, Button, Stack } from "@mui/material";
import PropTypes from "prop-types";

const FormChangeButtons = ({
  isBackDisabled,
  handleBack,
  handleSave,
  handleSaveAndNext,
  isNextDisabled,
  isSubmit,
}) => {
  return (
    <Stack p={2} width={"100%"} direction={"row"} justifyContent={"space-between"}>
      <Button
        size="small"
        variant={isBackDisabled ? "outlined" : "contained"}
        onClick={handleBack}
        disabled={isBackDisabled}
      >
        Back
      </Button>
      <Box>
        <Button size="small" onClick={handleSave} variant="contained">
          Save
        </Button>
        <Button
          sx={{ ml: 1 }}
          variant={isNextDisabled ? "outlined" : "contained"}
          size="small"
          onClick={handleSaveAndNext}
          disabled={isNextDisabled}
        >
          Save and {isSubmit ? "Submit" : "Next"}
        </Button>
      </Box>
    </Stack>
  );
};

FormChangeButtons.propTypes = {
  isBackDisabled: PropTypes.bool,
  handleBack: PropTypes.func,
  handleSave: PropTypes.func.isRequired,
  handleSaveAndNext: PropTypes.func.isRequired,
  isNextDisabled: PropTypes.bool,
  isSubmit: PropTypes.bool,
};

export default FormChangeButtons;
