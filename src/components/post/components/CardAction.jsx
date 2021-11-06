import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Button, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import { Box } from "@mui/system";
import { states } from "constants/global";
import { TransparentTooltip } from "constants/mui";
import React from "react";
import { currentStateAvatar } from "utils/common";

function CardActionn({
  openStates,
  setOpenStates,
  handleExpandClick,
  currentUser,
  handleLikeClick,
  post,
}) {
  return (
    <CardActions sx={{ py: 0.5 }} disableSpacing>
      <Stack
        onMouseLeave={() => setOpenStates(false)}
        sx={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <TransparentTooltip
          open={openStates}
          placement="top"
          title={
            <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
              {states.map((item, index) => (
                <Box
                  className="animate__animated animate__pulse animate__infinite	infinite"
                  onClick={() => {
                    handleLikeClick(post._id, index, currentUser._id);
                    setOpenStates(false);
                  }}
                  key={index}
                  sx={{
                    width: "34px",
                    height: "34px",
                    paddingX: "4px",
                    mt: "2px",

                    transition: "all 0.5s easy-in-out 0s",
                    "&:hover": {
                      position: "relative",
                      marginTop: "-10px",
                      cursor: "pointer",
                    },
                  }}
                  component="img"
                  src={item}
                />
              ))}
            </Stack>
          }
        >
          <Button
            sx={{
              width: 1 / 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "38px",
              "&:hover": {
                backgroundColor: "#eee",
              },
            }}
            onClick={() => handleLikeClick(post._id, 0, currentUser._id)}
            onMouseEnter={() => setOpenStates(true)}
            color="inherit"
          >
            {!currentStateAvatar(
              post.likes.find((like) => like.userId === currentUser._id)
                ?.state || -1
            ).img ? (
              <ThumbUpOffAltIcon
                color={
                  post.likes.find((like) => like.userId === currentUser._id)
                    ?.state === 0
                    ? "info"
                    : "inherit"
                }
              />
            ) : (
              <Avatar
                sx={{ width: "20px", height: "20px" }}
                src={
                  currentStateAvatar(
                    post.likes.find((like) => like.userId === currentUser._id)
                      ?.state || -1
                  ).img
                }
              ></Avatar>
            )}

            <Box
              sx={{
                pl: 1,
                fontSize:
                  currentStateAvatar(
                    post.likes.find((like) => like.userId === currentUser._id)
                      ?.state || -1
                  ).name === "Thương Thương"
                    ? "12px"
                    : "14px",
                color:
                  post.likes.find((like) => like.userId === currentUser._id)
                    ?.state === 0
                    ? "rgb(32, 120, 244)"
                    : currentStateAvatar(
                        post.likes.find(
                          (like) => like.userId === currentUser._id
                        )?.state || -1
                      ).color,
              }}
            >
              {
                currentStateAvatar(
                  post.likes.find((like) => like.userId === currentUser._id)
                    ?.state || -1
                ).name
              }
            </Box>
          </Button>
        </TransparentTooltip>

        <Button
          sx={{
            width: 1 / 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "38px",
            "&:hover": {
              backgroundColor: "#eee",
            },
          }}
          color="inherit"
          onClick={handleExpandClick}
        >
          <ChatBubbleOutlineIcon />

          <Box sx={{ pl: 1 }}>Bình Luận</Box>
        </Button>

        <Button
          sx={{
            width: 1 / 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "38px",
            "&:hover": {
              backgroundColor: "#eee",
            },
          }}
          color="inherit"
        >
          <ShareIcon />
          <Box sx={{ pl: 1 }}>Chia sẻ</Box>
        </Button>
      </Stack>
    </CardActions>
  );
}

export default CardActionn;
