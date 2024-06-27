import { Icon } from "@iconify/react";
import { Link as NavLink } from "react-router-dom";
import Form1 from "../components/Form1";
import { useCallback, useState } from "react";
import Form2 from "../components/Form2";
import Form3 from "../components/Form3";
import { Grid, Link, Stack, Tab, Tabs, Typography } from "@mui/material";

const initialFormData = {
  emailId: "",
  password: "",
  firstName: "",
  lastName: "",
  address: "",
  countryCode: "",
  phoneNumber: "",
};

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const handleTabChange = useCallback((_, newValue) => {
    setSelectedTab(newValue);
  }, []);

  return (
    <Grid borderRadius={2} boxShadow={3} bgcolor={"#fff"} p={3}>
      {/* Header */}
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
        <Typography variant="h4" display={"flex"} fontWeight={"bold"} mb={2}>
          <Icon icon="mdi:home" fontSize={40} />
          Home
        </Typography>
        <Link
          component={NavLink}
          to="/posts"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "blue",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Posts
          <Icon icon="mdi:arrow-right" />
        </Link>
      </Stack>

      {/* Tab */}
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Form 1" />
        <Tab label="Form 2" disabled={!formData.emailId || !formData.password} />
        <Tab label="Form 3" disabled={!formData.firstName || !formData.address} />
      </Tabs>

      {/* Forms */}
      <Grid p={2}>
        {selectedTab === 0 && (
          <Form1 setSelectedTab={setSelectedTab} formData={formData} setFormData={setFormData} />
        )}
        {selectedTab === 1 && (
          <Form2 setSelectedTab={setSelectedTab} formData={formData} setFormData={setFormData} />
        )}
        {selectedTab === 2 && (
          <Form3 setSelectedTab={setSelectedTab} formData={formData} setFormData={setFormData} />
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
