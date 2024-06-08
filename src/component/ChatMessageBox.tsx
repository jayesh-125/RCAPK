import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  IconButton,
  TextField,
  InputAdornment,
  Box,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { EmojiEmotions, Send } from "@mui/icons-material";
import EmojiPicker from "emoji-picker-react";
import { SendMessageToFriend } from "../services/api";
import { list_message, setMessageList } from "../redux/messageSlice";
import { auth_user } from "../redux/authSlice";
import { useParams } from "react-router-dom";

function ChatMessageBox() {
  const [message, setMessage] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const emojiRef = useRef<HTMLElement | null>(null);

  const dispatch = useDispatch();
  const params = useParams();
  const authUser: any = useSelector(auth_user);
  const messages: any[] = useSelector(list_message);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    try {
      const messageData: any = {
        fromUserId: authUser?._id,
        lastMessage: message,
        toUserId: params?.id,
        createdAt: new Date(),
      };
      await SendMessageToFriend(messageData, dispatch);
    } catch (error: any) {
      console.error(error?.message);
    } finally {
      setMessage("");
      setShowEmoji(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 1,
        p: 1,
        display: "flex",
        alignItems: "center",
        borderRadius: 5,
        border: "1px solid #2193b0",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Box
        ref={emojiRef}
        sx={{
          display: showEmoji ? "block" : "none",
          position: "absolute",
          bottom: "60px",
          right: "20px",
          zIndex: 1,
        }}
      >
        <EmojiPicker
          onEmojiClick={(emoji: any) => {
            setMessage((prev) => prev + emoji.emoji);
          }}
        />
      </Box>

      <form onSubmit={sendMessage} style={{ width: "100%", display: "flex" }}>
        <IconButton
          color="primary"
          aria-label="emoji"
          onClick={() => setShowEmoji((prev) => !prev)}
          sx={{ mr: 1 }}
        >
          <EmojiEmotions />
        </IconButton>

        <TextField
          id="outlined-basic"
          label="Enter your message"
          variant="outlined"
          color="primary"
          fullWidth
          size="small"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              paddingRight: "40px",
            },
            "& .MuiInputLabel-root": {
              top: "0",
              left: "0",
            },
          }}
        />
        <IconButton color="primary" type="submit" aria-label="send">
          <Send />
        </IconButton>
      </form>
    </Paper>
  );
}

export default ChatMessageBox;
