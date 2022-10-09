import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ContactList from "../components/contactList";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={3}>
          <Box sx={{ flexGrow: 1, height: "100vh", bgcolor: "#F7F7F7" }}>
            <ContactList />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
