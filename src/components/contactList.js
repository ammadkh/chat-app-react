import { Typography, Divider, Box, Stack, IconButton } from "@mui/material";
import List from "@mui/material/List";
import ContactItem from "./contactItem";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ForumIcon from "@mui/icons-material/Forum";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries";

const ContactList = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_USERS);

  console.log(data, "user data");

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };
  return (
    <>
      <Box sx={{ p: "15px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Stack direction="row" alignItems="center">
              <ForumIcon />
              <Typography variant="h5" sx={{ paddingLeft: "10px" }}>
                Chats
              </Typography>
            </Stack>
          </Box>
          <IconButton onClick={onLogoutHandler}>
            <ExitToAppIcon />
          </IconButton>
        </Stack>
      </Box>
      <Divider />
      <List
        disablePadding={true}
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        {data?.users.map((contact) => (
          <ContactItem
            key={contact.id}
            id={contact.id}
            firstName={contact.firstName}
            lastName={contact.lastName}
            imgUrl={contact.imgUrl}
            createdAt={contact.createdAt}
          />
        ))}
      </List>
    </>
  );
};

export default ContactList;
