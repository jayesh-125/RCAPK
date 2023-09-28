import { EmojiEmotions, Send } from "@mui/icons-material";
import { Box, Container, Grid, IconButton, TextField } from "@mui/material";
import { Picker } from "emoji-mart";
import React from "react";

function ChatMessageBox() {
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
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="message">
            <Send />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatMessageBox;
