import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

const ContactItem = (props) => {
  const navigate = useNavigate();
  console.log(props, "pp");
  return (
    <>
      <ListItem
        onClick={() => navigate(`/${props.id}/${props.firstName}`)}
        sx={{
          cursor: "pointer",
          backgroundColor: "#f7f7f7",
          ":hover": { backgroundColor: "white" },
        }}
      >
        <ListItemAvatar>
          <Avatar src={props.imgUrl}></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={props?.firstName + " " + props?.lastName}
          secondary={props?.createdAt}
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default ContactItem;
