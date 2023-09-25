import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar, Box, Card, CardHeader, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";

function UserProfileCard() {
  const [show, setShow] = React.useState(false);

  const users = [
    {
      name: "John Doe",
      hide: true,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac ligula vel nunc consectetur congue.",
    },
    {
      name: "Alice Smith",
      hide: true,
      text: "Hello, I'm Alice.",
    },
    {
      name: "Bob Johnson",
      hide: true,
      text: "Coding is fun and exciting.",
    },
    {
      name: "Eva Williams",
      hide: true,
      text: "Exploring new places is my passion.",
    },
    {
      name: "David Brown",
      hide: true,
      text: "Music helps me relax and unwind.",
    },
    {
      name: "Grace Davis",
      hide: true,
      text: "Coffee is my morning ritual.",
    },
    {
      name: "Michael White",
      hide: true,
      text: "Learning new skills every day.",
    },
    {
      name: "Olivia Jones",
      hide: true,
      text: "Nature walks soothe my soul.",
    },
    {
      name: "Daniel Clark",
      hide: true,
      text: "Science fiction is my favorite genre.",
    },
    {
      name: "Sophia Lee",
      hide: true,
      text: "Baking treats for family gatherings.",
    },
    {
      name: "William Turner",
      hide: true,
      text: "Photography captures life's moments.",
    },
  ];

  const ProfileAvtarName = (text) => {
    return text.charAt(0).toUpperCase();
  };

  const WordLimite = (text) => {
    return text.slice(0, 22) + "...";
  };

  const activeSet = (id) => {
    return id;
  };

  return (
    <>
      {users.map((profile, index) => (
        <Card key={index} sx={{ margin: "3px 0" }}>
          <CardHeader
            avatar={
              <Avatar aria-label="user-avatar">
                {ProfileAvtarName(profile?.name)}
              </Avatar>
            }
            title={profile?.name}
            subheader={WordLimite(profile?.text)}
            action={
              <Box>
                <IconButton
                  aria-label="pinned"
                  color="default"
                  onClick={() => {
                    activeSet(index);
                  }}
                >
                  {show ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton aria-label="more" color="default">
                  <MoreIcon />
                </IconButton>
              </Box>
            }
          />
        </Card>
      ))}
    </>
  );
}

export default UserProfileCard;
