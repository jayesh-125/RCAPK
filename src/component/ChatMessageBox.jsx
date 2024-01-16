import { EmojiEmotions, Send } from "@mui/icons-material";
import { Container, Grid, IconButton, TextField } from "@mui/material";
// import { Picker } from "emoji-mart";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSend } from "../redux/callSlice";
import { SendMessageToFriend } from "../services/auth";
import { setMessageList } from "../redux/messageSlice";
import { startLoading, stopLoading } from "../redux/loaderSlice";

function ChatMessageBox() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const authUser = useSelector((s) => s.auth.authUser);
  const activeFriend = useSelector((s) => s.user.activeFriend);

  const handleChangeInput = (e) => setMessage(e?.target?.value);

  const HandleSendMessage = async () => {
    try {
      const data = {
        fromUserId: authUser?._id,
        lastMessage: message,
        toUserId: activeFriend?._id,
      };
      dispatch(startLoading());
      const res = await SendMessageToFriend(data);
      dispatch(setMessageList(res?.data));
      dispatch(setIsSend(true));
    } catch (error) {
      console.error(error?.message);
    } finally {
      dispatch(stopLoading());
      setMessage("");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        background: "#0a5c3611",
      }}
    >
      {/* <Picker/> */}
      <Grid
        container
        spacing={0}
        sx={{
          alignItems: "center",
          padding: "10px 0",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={1}>
          <IconButton aria-label="emoji">
            <EmojiEmotions />
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <TextField
            id="outlined-basic"
            label="Enter your message"
            variant="outlined"
            color="success"
            sx={{ width: { xs: " 100%", lg: "70%" } }}
            onChange={handleChangeInput}
            value={message}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="message" onClick={HandleSendMessage}>
            <Send />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatMessageBox;
