import { Icon } from "@iconify/react";
import { Avatar, Grid, Stack, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as NavLink } from "react-router-dom";

const getPosts = async () => {
  return (await fetch("https://codebuddy.review/posts")).json();
};

const Posts = () => {
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    getPosts()
      .then((res) => {
        setPostData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Grid borderRadius={2} boxShadow={3} bgcolor={"#fff"} p={3}>
      <Typography variant="h4" fontWeight={"bold"} mb={2}>
        Posts
      </Typography>
      <Link
        component={NavLink}
        to="/"
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
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      <Grid container spacing={3}>
        {postData &&
          postData.map((post) => (
            <Grid key={post.id} item xs={12} sm={6} lg={4}>
              <Grid boxShadow={2} borderRadius={1} p={1}>
                <Stack direction={"row"} alignItems={"center"} gap={1} mb={1}>
                  <Avatar
                    sx={{ width: 30, height: 30, border: "1px solid #00000070" }}
                    src={post.avatar}
                  >
                    {post.firstName.slice(0, 2)}
                  </Avatar>
                  <Typography variant="body2" fontWeight={"bold"}>
                    {post.firstName} {post.lastName}
                  </Typography>
                </Stack>
                <img
                  width={"100%"}
                  style={{ height: "250px", backgroundColor: "#f3f7fd" }}
                  src={post.image}
                  alt={post.firstName}
                />
                <Typography mt={1}>{post.writeup}</Typography>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default Posts;
