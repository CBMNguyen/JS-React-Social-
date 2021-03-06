import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemIcon,
} from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { sidebarList } from "constants/global";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "utils/common";
import NoAvatarImg from "../../../../assets/person/noAvatar.png";

function Sidebar({ user }) {
  const [index, setIndex] = useState(9);
  let newSideBarList = sidebarList.slice(0, index);

  newSideBarList.unshift({
    name: capitalizeFirstLetter(user?.username) || "",
    img:
      user?.profilePicture?.length > 0
        ? user?.profilePicture[user?.profilePicture?.length - 1]
        : NoAvatarImg,
  });

  newSideBarList.push({
    name: index === 9 ? "Xem thêm" : "Ẩn bớt",
    icon: index === 9 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />,
  });

  const renderList = (item, i) => {
    const listItem = (
      <ListItem disablePadding>
        {i === newSideBarList.length - 1 ? (
          <ListItemButton
            sx={{ borderRadius: "8px" }}
            onClick={() => setIndex(index === 9 ? sidebarList.length - 1 : 9)}
          >
            <ListItemIcon>
              <IconButton>{item.icon}</IconButton>
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ) : (
          <ListItemButton sx={{ borderRadius: "8px" }}>
            <ListItemAvatar>
              <Avatar src={item.img} />
            </ListItemAvatar>
            <ListItemText primary={item.name} />
          </ListItemButton>
        )}
      </ListItem>
    );

    return (
      <Link
        key={item.name}
        style={{
          display: "block",
          color: "inherit",
          textDecoration: "none",
          marginLeft: "10px",
        }}
        to={i === 0 ? `profile/${user._id}` : "/"}
      >
        {listItem}
      </Link>
    );
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: "62px",
        flex: 3,
        height: "calc(100vh - 62px)",
        overflowY: "scroll",
      }}
    >
      <List>
        {newSideBarList.map((item, index) => {
          return renderList(item, index);
        })}
      </List>
    </Box>
  );
}

export default Sidebar;
