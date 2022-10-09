import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const MessageCard = ({ message, date, direction }) => {
  return (
    <Box display="flex" justifyContent={direction}>
      <Box margin={"5px"}>
        <Typography
          variant="subtitle2"
          padding={"5px"}
          sx={{ bgcolor: "white", borderRadius: "5px" }}
        >
          {message}
        </Typography>
        <Typography variant="caption" display="flex" justifyContent={direction}>
          {date}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageCard;
