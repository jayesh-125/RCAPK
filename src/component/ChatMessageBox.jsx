import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  InputLabel,
  Box,
} from "@mui/material";
import { EmojiEmotions, Send } from "@mui/icons-material";
import { startLoading, stopLoading } from "../redux/loaderSlice";
import { setIsSend } from "../redux/callSlice";
import { GetAllMessage, SendMessageToFriend } from "../services/auth";
import EmojiPicker from "emoji-picker-react";
// import { useSocket } from "../hook/Customhook";
import { setMessageList } from "../redux/messageSlice";

function ChatMessageBox() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  // const socket = useSocket();
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const { activeFriend } = useSelector((state) => state.user);

  const emojiPickerRef = useRef(null);

  const toggleEmojiPicker = () => setShowEmojiPicker((prev) => !prev);
  const selectEmoji = (emoji) => {
    setSelectedEmoji(emoji);
    setMessage((prevMessage) => prevMessage + emoji?.emoji);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const emojiString = selectedEmoji ? selectedEmoji?.emoji : "";
      const messageData = {
        fromUserId: authUser?._id,
        lastMessage: message + emojiString,
        toUserId: activeFriend?._id,
      };

      dispatch(startLoading());
      // socket.emit("send_message", messageData);
      await SendMessageToFriend(messageData);

      const res = await GetAllMessage({
        uid: authUser?._id,
        fid: activeFriend?._id,
      });

      dispatch(setIsSend(true));
      dispatch(setMessageList(res?.data));
    } catch (error) {
      console.error(error?.message);
    } finally {
      dispatch(stopLoading());
      setMessage("");
      setSelectedEmoji(null);
      // Close the emoji picker when the message is sent
      setShowEmojiPicker(false);
    }
  };

  // Close emoji picker when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        background: "#0a5c3611",
        position: "relative",
      }}
    >
      <Box
        ref={emojiPickerRef}
        sx={{
          display: showEmojiPicker ? "block" : "none",
          position: "absolute",
          bottom: "100%",
          right: 0,
        }}
      >
        <EmojiPicker onEmojiClick={selectEmoji} />
      </Box>

      <form onSubmit={sendMessage} style={{ width: "100%" }}>
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
            <IconButton aria-label="emoji" onClick={toggleEmojiPicker}>
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
              onChange={(e) => setMessage(e?.target?.value)}
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
