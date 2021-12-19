import AppsIcon from "@mui/icons-material/Apps";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import StoreIcon from "@mui/icons-material/Store";
import { Avatar, Badge, CircularProgress, Paper } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import userApi from "api/user";
import { getConversations } from "app/messengerSlice";
import ShowConversations from "components/showConversations/ShowConversations";
import ShowFriendRequest from "components/showFriendRequest/ShowFriendRequest";
import { BlackTooltip } from "constants/mui";
import {
  addFriend,
  addFriendSocket,
  addNotificationSocket,
  removeNotification,
  removeNotificationSocket,
  removeRequiredFriend,
} from "features/auth/userSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.png";
import noAvatarImg from "../../assets/person/noAvatar.png";

function Topbar({ socket }) {
  const loadingRef = useRef();

  const history = useHistory();
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state.messenger);

  const typingTimeoutRef = useRef(null); // keep time value
  const [name, setName] = useState("");
  const [value, setValue] = useState("one");
  const { user } = useSelector((state) => state.user);
  const [anchorElSearch, setAnchorElSearch] = useState(null);
  const [anchorElChat, setAnchorElChat] = useState(null);
  const [anchorElFriend, setAnchorElFriend] = useState(null);

  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("recentUsers")) || [];
  });

  // get add friend Notification
  useEffect(() => {
    socket?.on("getNotification", ({ senderId }) => {
      if (user._id !== senderId) {
        dispatch(addNotificationSocket(senderId));
      }
    });
  }, [socket, dispatch, user._id]);

  // remove add friend Notification
  useEffect(() => {
    socket?.on("getRemoveNotification", ({ senderId }) => {
      if (user._id !== senderId) dispatch(removeNotificationSocket(senderId));
    });
  }, [socket, dispatch, user._id]);

  // get response add friend request
  useEffect(() => {
    socket?.on("getResponseNotification", ({ senderId, type }) => {
      dispatch(removeRequiredFriend(senderId));
      if (type > 0) {
        dispatch(addFriendSocket(senderId));
      }
    });
  }, [socket, dispatch]);

  // handle get Conversation
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        await dispatch(getConversations(user._id));
      } catch (error) {
        console.log(error);
      }
    };
    user._id && fetchConversations();
  }, [user._id, dispatch]);

  // handle show user search bar
  const handleSearchClick = (event) => {
    setAnchorElSearch(event.currentTarget);
  };

  // handle hide user search bar
  const handleSearchClose = () => {
    setAnchorElSearch(null);
  };

  const openSearch = Boolean(anchorElSearch);
  const SearchId = openSearch ? "simple-popover" : undefined;

  // handle show user chat bar
  const handleChatClick = (event) => {
    setAnchorElChat(event.currentTarget);
  };

  // handle hide user chat bar
  const handleChatClose = () => {
    setAnchorElChat(null);
  };

  const openChat = Boolean(anchorElChat);
  const chatId = openChat ? "simple-popover" : undefined;

  // handle show user friend request
  const handleFriendRequestClick = (event) => {
    setAnchorElFriend(event.currentTarget);
  };

  // handle hide user chat bar
  const handleFriendRequestClose = () => {
    setAnchorElFriend(null);
  };

  const openFriendRequest = Boolean(anchorElFriend);
  const friendRequestId = openFriendRequest ? "simple-popover" : undefined;

  // handle hide user chat bar
  const handleAcceptFriendRequest = async (userId) => {
    try {
      await dispatch(addFriend(userId));
      await dispatch(removeNotification(userId));
      dispatch(removeNotificationSocket(userId));

      socket.emit("responseNotification", {
        senderId: user._id,
        receiverId: userId,
        type: 9,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // handle hide user chat bar
  const handleRefuseFriendRequest = async (userId) => {
    try {
      await dispatch(removeNotification(userId));
      dispatch(removeNotificationSocket(userId));

      socket.emit("responseNotification", {
        senderId: user._id,
        receiverId: userId,
        type: -1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // handle Tabs change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleItemClick = (User) => {
    history.push(`/profile/${User._id}`);
    const recentUsers = JSON.parse(localStorage.getItem("recentUsers")) || [];

    const hasUser = recentUsers.some((u) => u._id === User._id);

    if (!hasUser) {
      localStorage.setItem(
        "recentUsers",
        JSON.stringify([
          ...recentUsers,
          {
            _id: User._id,
            profilePicture: User.profilePicture,
            username: User.username,
          },
        ])
      );
      setUsers([]);
    }
    handleSearchClose();
  };

  const handleRemoveRecentUser = (User) => {
    let recentUsers = JSON.parse(localStorage.getItem("recentUsers"));
    recentUsers = recentUsers.filter((u) => u._id !== User._id);
    localStorage.setItem("recentUsers", JSON.stringify(recentUsers));
    setUsers(recentUsers);
  };

  const handleSearchNameChange = (e) => {
    loadingRef.current = true; // set loading when value change

    const value = e.target.value;
    setName(value);

    if (!value.trim())
      // check has white space
      setUsers(JSON.parse(localStorage.getItem("recentUsers")) || []);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(async () => {
      // setTimeOut repeat when value change
      try {
        const data = await userApi.getUserByName(value);
        const dataFilter = data.user.filter((u) => u._id !== user._id); // filter !== currentUser
        loadingRef.current = false; // turn off loading when fetch user success
        setUsers(dataFilter);
      } catch (error) {
        loadingRef.current = false;
      }
    }, 300);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        height: "62px",
        backgroundColor: "#fff !important",
        boxShadow: "0px 0px 14px -8px rgba(0, 0, 0, 0.68)",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            position: "relative",
            flex: 2.5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <Avatar
              sx={{ mr: 2, width: 38, height: 38, objectFit: "cover" }}
              src={logo}
              alt="logo"
            />
          </Link>

          <Box
            component="div"
            aria-describedby={SearchId}
            onClick={handleSearchClick}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "38px",
              borderRadius: "30px",
              backgroundColor: "#f0f2f5",
            }}
          >
            <SearchIcon sx={{ fontSize: "20px", ml: "10px", color: "#0008" }} />

            <Box
              component="input"
              value={name}
              onChange={handleSearchNameChange}
              sx={{
                border: "none",
                "&:focus": {
                  outline: "none",
                },
                backgroundColor: "inherit",
              }}
              placeholder="Search on Facebook"
            />
          </Box>
        </Box>

        <Popover
          id={SearchId}
          open={openSearch}
          anchorEl={anchorElSearch}
          onClose={handleSearchClose}
          sx={{
            position: "absolute",
            top: "-15px",
            left: "-78px",
          }}
        >
          <Paper elevation={5} sx={{ width: "350px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                paddingX: "20px",
                height: "62px",
              }}
            >
              <IconButton
                onClick={handleSearchClose}
                sx={{ mr: 2, width: 38, height: 38, objectFit: "cover" }}
              >
                <ArrowBackIcon />
              </IconButton>

              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "38px",
                  borderRadius: "30px",
                  backgroundColor: "#f0f2f5",
                }}
              >
                <SearchIcon
                  sx={{ fontSize: "20px", ml: "10px", color: "#0008" }}
                />

                <Box
                  component="input"
                  value={name}
                  onChange={handleSearchNameChange}
                  sx={{
                    border: "none",
                    "&:focus": {
                      outline: "none",
                    },
                    backgroundColor: "inherit",
                  }}
                  placeholder="Search on Facebook"
                />
              </Box>
            </Box>

            {name === "" && users.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItem: "center",
                  marginX: "20px",
                }}
              >
                <Box sx={{ fontWeight: "500", fontSize: "18px", pt: 1 }}>
                  Recent seach
                </Box>

                <BlackTooltip title="Tính năng này sẽ sớm được hoàn thành">
                  <Box
                    sx={{
                      padding: "10px 16px",
                      borderRadius: "4px",
                      color: "#5490e3",
                      fontSize: "14px",
                      "&:hover": {
                        backgroundColor: "#eee",
                        cursor: "pointer",
                      },
                    }}
                  >
                    Chỉnh sửa
                  </Box>
                </BlackTooltip>
              </Box>
            )}

            {loadingRef.current && name !== "" && (
              <CircularProgress
                sx={{ marginX: "auto", display: "block" }}
                color="info"
                size={20}
              />
            )}

            <List>
              {users.length > 0 &&
                users.map((u) => (
                  <ListItem
                    key={u._id}
                    sx={{ paddingX: 1, textDecoration: "none" }}
                    disablePadding
                  >
                    <ListItemButton sx={{ borderRadius: "8px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexGrow: 1,
                        }}
                        onClick={() => handleItemClick(u)}
                      >
                        <Avatar
                          sx={{ mr: 2 }}
                          src={
                            u?.profilePicture?.length > 0
                              ? `${process.env.REACT_APP_API_URL}/${
                                  user?.profilePicture[
                                    user?.profilePicture?.length - 1
                                  ]
                                }`
                              : noAvatarImg
                          }
                        />
                        <ListItemText primary={u.username} />
                      </Box>
                      {name === "" && users.length > 0 && (
                        <IconButton onClick={() => handleRemoveRecentUser(u)}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      )}
                    </ListItemButton>
                  </ListItem>
                ))}
              {name !== "" && !loadingRef.current && users.length === 0 && (
                <Box
                  sx={{
                    textAlign: "center",
                    color: "#888",
                    fontSize: "14px",
                  }}
                >
                  User not found 🐱‍🏍
                </Box>
              )}
            </List>
          </Paper>
        </Popover>

        <Box
          sx={{
            flex: 6,
          }}
        >
          <Tabs
            sx={{
              width: "90%",
              marginLeft: "10%",
            }}
            centered
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
          >
            <Tab
              disableRipple
              value="one"
              label={
                <BlackTooltip title="Trang chủ">
                  <Badge>
                    <HomeIcon sx={{ fontSize: "28px", marginY: "2px" }} />
                  </Badge>
                </BlackTooltip>
              }
            />

            <Tab
              disableRipple
              value="two"
              label={
                <BlackTooltip title="Watch">
                  <Badge
                    sx={{ marginY: "1px" }}
                    badgeContent={99}
                    max={10}
                    color="error"
                  >
                    <OndemandVideoIcon
                      sx={{ fontSize: "28px", marginY: "2px" }}
                    />
                  </Badge>
                </BlackTooltip>
              }
            />

            <Tab
              disableRipple
              value="three"
              label={
                <BlackTooltip title="MarketPlace">
                  <Badge
                    sx={{ marginY: "1px" }}
                    badgeContent={1}
                    max={10}
                    color="error"
                  >
                    <StoreIcon sx={{ fontSize: "28px", marginY: "4px" }} />
                  </Badge>
                </BlackTooltip>
              }
            />

            <Tab
              disableRipple
              value="four"
              label={
                <BlackTooltip title="Nhóm">
                  <GroupsIcon sx={{ fontSize: "28px", marginY: "4px" }} />
                </BlackTooltip>
              }
            />

            <Tab
              disableRipple
              value="five"
              label={
                <BlackTooltip title="Trò Chơi">
                  <Badge
                    sx={{ marginY: "2px" }}
                    badgeContent={99}
                    max={10}
                    color="error"
                  >
                    <SportsEsportsIcon sx={{ fontSize: "28px" }} />
                  </Badge>
                </BlackTooltip>
              }
            />
          </Tabs>
        </Box>

        <Box
          sx={{
            flex: 3.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Link className="link" to={`/profile/${user?._id}`}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.3rem 0.6rem",
                  marginX: 2,
                  borderRadius: "20px",
                  transition: "all 0.2s ease-in-out 0s",
                  "&:hover": {
                    backgroundColor: "#f0f2f5",
                    cursor: "pointer",
                  },
                }}
              >
                <Avatar
                  sx={{ width: 28, height: 28 }}
                  src={
                    user?.profilePicture?.length > 0
                      ? `${process.env.REACT_APP_API_URL}/${
                          user?.profilePicture[user?.profilePicture?.length - 1]
                        }`
                      : noAvatarImg
                  }
                  alt="avatar"
                />

                <Box
                  component="span"
                  sx={{
                    ml: 1,
                    textTransform: "capitalize",
                    color: "#000",
                    fontWeight: "500",
                  }}
                >
                  {user?.username}
                </Box>
              </Box>
            </Link>

            <BlackTooltip title="Menu">
              <IconButton sx={{ backgroundColor: "#f0f2f5" }}>
                <AppsIcon sx={{ color: "#000" }} />
              </IconButton>
            </BlackTooltip>

            <BlackTooltip title="Friend request">
              <IconButton
                aria-describedby={friendRequestId}
                onClick={handleFriendRequestClick}
                sx={{ backgroundColor: "#f0f2f5", mx: 2 }}
              >
                <Badge
                  badgeContent={user?.notifications?.length}
                  max={5}
                  color="error"
                >
                  <PersonAddIcon
                    color="primary"
                    sx={!anchorElFriend ? { color: "#000" } : { pr: "2px" }}
                  />
                </Badge>
              </IconButton>
            </BlackTooltip>

            <BlackTooltip title="Messenger">
              <IconButton
                aria-describedby={chatId}
                onClick={handleChatClick}
                sx={{ backgroundColor: "#f0f2f5" }}
              >
                <Badge badgeContent={1} max={5} color="error">
                  <ChatIcon
                    color="primary"
                    sx={!anchorElChat ? { color: "#000" } : {}}
                  />
                </Badge>
              </IconButton>
            </BlackTooltip>

            <BlackTooltip title="Account">
              <IconButton sx={{ backgroundColor: "#f0f2f5", ml: 2 }}>
                <Badge variant="dot" color="error">
                  <ArrowDropDownIcon sx={{ color: "#000" }} />
                </Badge>
              </IconButton>
            </BlackTooltip>
          </Box>
        </Box>
      </Toolbar>

      <Popover
        id={chatId}
        open={openChat}
        anchorEl={anchorElChat}
        onClose={handleChatClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ mt: 1, ml: 1 / 2 }}
      >
        <ShowConversations
          currentUser={user}
          conversations={conversations}
          handleChatClose={handleChatClose}
        />
      </Popover>

      <Popover
        id={friendRequestId}
        open={openFriendRequest}
        anchorEl={anchorElFriend}
        onClose={handleFriendRequestClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ mt: 1, ml: 1 / 2 }}
      >
        <ShowFriendRequest
          onAcceptFriendRequest={handleAcceptFriendRequest}
          onRefuseFriendRequest={handleRefuseFriendRequest}
          notifications={user.notifications}
        />
      </Popover>
    </AppBar>
  );
}

export default Topbar;
