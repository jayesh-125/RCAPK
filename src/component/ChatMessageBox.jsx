import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { EmojiEmotions, Send } from "@mui/icons-material";
import { Picker } from "emoji-mart";
import { startLoading, stopLoading } from "../redux/loaderSlice";
import { setIsSend } from "../redux/callSlice";
import { SendMessageToFriend } from "../services/auth";
import { setMessageList } from "../redux/messageSlice";

function ChatMessageBox() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const dispatch = useDispatch();
  const authUser = useSelector((s) => s.auth.authUser);
  const activeFriend = useSelector((s) => s.user.activeFriend);

  const handleChangeInput = (e) => setMessage(e?.target?.value);

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const HandleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const messageData = {
        fromUserId: authUser?._id,
        lastMessage: message,
        toUserId: activeFriend?._id,
      };
      dispatch(startLoading());
      const res = await SendMessageToFriend(messageData);
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
        position: "relative",
      }}
    >
      {showEmojiPicker && <Picker />}
      <form onSubmit={HandleSendMessage}>
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
            <IconButton aria-label="emoji" onClick={handleToggleEmojiPicker}>
              <EmojiEmotions />
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="outlined-basic"
              label={
                <InputLabel
                  htmlFor="outlined-basic"
                  sx={{ color: "success.main" }}
                >
                  Enter your message
                </InputLabel>
              }
              variant="outlined"
              color="success"
              fullWidth
              onChange={handleChangeInput}
              value={message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" aria-label="message">
                      <Send />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ChatMessageBox;
