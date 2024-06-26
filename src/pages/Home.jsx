import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Form1 from "../components/Form1";
import { useState } from "react";
import Form2 from "../components/Form2";
import Form3 from "../components/Form3";
import { Grid, Stack, Tab, Tabs } from "@mui/material";

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

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Grid className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
        <h1 className="mb-4 flex items-center text-4xl font-bold">
          <Icon icon="mdi:home" className="mr-2" />
          Home
        </h1>
        <Link to="/posts" className="flex items-center text-blue-600 hover:underline">
          Posts
          <Icon icon="mdi:arrow-right" className="ml-2" />
        </Link>
      </Stack>

      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Form 1" />
        <Tab label="Form 2" disabled={!formData.firstName || !formData.address} />
        <Tab label="Form 3" disabled={!formData.countryCode || !formData.phoneNumber} />
      </Tabs>

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
