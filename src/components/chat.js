import { useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ButtonAppBar from "./appBar";
import MessageCard from "./messageCard";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_CHAT } from "../graphql/queries";
import { CREATE_TEXT } from "../graphql/mutations";
import SendIcon from "@mui/icons-material/Send";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { MSG_ADDED } from "../graphql/subscription";

const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { id, name } = params;

  const { data, loading, error } = useQuery(GET_CHAT, {
    variables: { receiverId: +id || 0 },
    onCompleted(data) {
      setMessages(data?.messageByUser);
    },
  });

  const [
    sendMsg,
    { data: messageData, loading: messageLoading, error: messageError },
  ] = useMutation(CREATE_TEXT, {
    variables: {
      messageDetail: {
        text: message,
        receiverId: id,
      },
    },
    onCompleted(data) {
      setMessage("");
    },
  });

  const { data: subscriptionData } = useSubscription(MSG_ADDED, {
    onSubscriptionData({ subscriptionData }) {
      const msg = subscriptionData.data.messageAdded;
      setMessages((prev) => [...prev, msg]);
    },
  });
  console.log(subscriptionData, "subs");

  const imgUrl =
    "https://i.pinimg.com/736x/7f/3a/8d/7f3a8d5db6a8f9d9dbd52c430bbc1f2b.jpg";
  if (!id) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Typography textAlign={"center"} variant="h3">
          Welcome to Teams
        </Typography>
      </Box>
    );
  }
  return (
    <Box height={"99vh"}>
      <ButtonAppBar name={name} imgUrl={imgUrl} />
      <Box
        bgcolor={"#f5f5f5"}
        height="80%"
        sx={{ p: "10px", overflow: "auto" }}
      >
        {!!messages.length &&
          messages?.map((message) => {
            return (
              <MessageCard
                key={message.id}
                direction={+id === +message.receiverId ? "end" : "start"}
                message={message.text}
                date={new Date(message.createdAt).toLocaleDateString("en")}
              />
            );
          })}
      </Box>
      <Box sx={{ p: 2 }} bgcolor={"#f5f5f5"}>
        <FormControl fullWidth={true} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Enter your message
          </InputLabel>
          <OutlinedInput
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            multiline={true}
            id="outlined-adornment-password"
            type="text"
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" onClick={sendMsg}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Enter your message"
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default Chat;
