import { EmojiEmotions, Send } from "@mui/icons-material";
import { Box, Container, Grid, IconButton, TextField } from "@mui/material";
// import { Picker } from "emoji-mart";
import React, { useState } from "react";
import { GetDataFromLocal } from "../constant/common";
import { ADDNEWRELATIONFROMDATABASE } from "../services/message";
import { UPDATEUSERBYIDINDATABASE } from "../services/users";
import { useDispatch } from "react-redux";
import { setIsSend } from "../redux/callSlice";

function ChatMessageBox() {
  const [message, setMessage] = useState("");
  const user = GetDataFromLocal("user");
  const dispatch = useDispatch();
  const activeUser = GetDataFromLocal("activeUser");
  const handleChangeInput = (e) => setMessage(e?.target?.value);
  const HandleSendMessage = async () => {
    try {
      const data = {
        from_name: activeUser?.username,
        from_profile_image: activeUser?.imgUrl,
        from_user_id: activeUser?.id,
        last_message: message,
        last_time: Date.now(),
        to_profile_image: user?.imgUrl,
        to_user_id: user?.id,
        to_username: user?.username,
      };
      const response = await ADDNEWRELATIONFROMDATABASE(data); //pending work
      const secondRes = await UPDATEUSERBYIDINDATABASE(data)
      console.log(secondRes.data)
      // set is message is send
      dispatch(setIsSend(true))
      setMessage("");
    } catch (error) {
      console.error(error?.message);
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
