import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../../constant/constant";

const users = userData;
function UserProfileCard() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const openIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const ProfileAvtarName = (text) => {
    return text.charAt(0).toUpperCase();
  };

  const WordLimite = (text) => {
    return text.slice(0, 22) + "...";
  };

  const [active, setActive] = React.useState(new Set());
  const navigate = useNavigate();

  const handleActive = (index) => {
    const newSet = new Set(active);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setActive(newSet);
    navigate("/userchat");
  };

  return (
    <>
      {users.map((profile, index) => (
        <Card
          key={index}
          sx={{
            margin: "3px 0",
            backgroundColor: active.has(index) ? "#0a5c3699" : "inherit",
            color: active.has(index) ? "#ffffff" : "inherit",
            // Add styles for subheader and avatar background on hover
            "& .MuiCardHeader-subheader": {
              color: active.has(index) ? "#ffffff88" : "inherit",
            },
            "& .MuiAvatar-root": {
              color: active.has(index) ? "#0a5c36" : "inherit",
              backgroundColor: active.has(index) ? "#ffffff" : "default",
            },
          }}
          onClick={() => handleActive(index)}
        >
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
                  aria-label="more"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  id="long-button"
                  onClick={openIcon}
                  sx={{ color: active.has(index) ? "#ffffff" : "inherit" }}
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            }
          />
        </Card>
      ))}
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ padding: 0, background: "#00000022" }}
      >
        <MenuItem onClick={handleClose} sx={{ padding: "0px 4px" }}>
          <IconButton>
            <DeleteForeverIcon />
          </IconButton>
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserProfileCard;
