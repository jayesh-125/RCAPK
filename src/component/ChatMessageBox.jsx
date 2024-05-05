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
import { SendMessageToFriend } from "../services/api";
import EmojiPicker from "emoji-picker-react";
import { setMessageList } from "../redux/messageSlice";

function ChatMessageBox() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojiPickerRef = useRef(null);
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const { activeFriend } = useSelector((state) => state.user);
  const messages = useSelector((s) => s.message.list);

  const toggleEmojiPicker = () => setShowEmojiPicker((prev) => !prev);

  const selectEmoji = (emoji) => {
    setMessage((prevMessage) =>
      prevMessage.endsWith(emoji?.emoji)
        ? prevMessage
        : prevMessage + emoji?.emoji
    );
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const messageData = {
        fromUserId: authUser?._id,
        lastMessage: message,
        toUserId: activeFriend?._id,
        createdAt: new Date(),
      };
      await SendMessageToFriend(messageData);
      dispatch(setIsSend(true));
      const {createdAt,...passData} = messageData;
      dispatch(setMessageList([...messages, passData]));
    } catch (error) {
      console.error(error?.message);
    } finally {
      setMessage("");
      setShowEmojiPicker(false);
    }
  };

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
        background: "#b6d4d0",
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
            <IconButton
              aria-label="emoji"
              sx={{ color: "#017887" }}
              onClick={toggleEmojiPicker}
            >
              <EmojiEmotions />
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="outlined-basic"
              label={
                <InputLabel
                  htmlFor="outlined-basic"
                  sx={{ color: "success.main", padding: 0 }}
                >
                  Enter your message
                </InputLabel>
              }
              variant="outlined"
              color="success"
              fullWidth
              size="small"
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
