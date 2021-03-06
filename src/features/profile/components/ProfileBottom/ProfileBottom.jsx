import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import Feed from "components/feed/Feed";
import { default as React } from "react";
import { TabPanel } from "utils/common";
import FriendTab from "../FriendTab/FriendTab";
import ImageTab from "../ImageTab/ImageTab";
import InfoTab from "../InfoTab/InfoTab";
import NotComplete from "../NotComplete/NotComplete";
import ProfileBottomFriendList from "./ProfileBottomFriendList";
import ProfileBottomImageList from "./ProfileBottomImageList";
import ProfileBottomInfo from "./ProfileBottomInfo";

function ProfileBottom({
  socket,
  profileState,
  infoTabValue,
  setInfoTabValue,
  value,
  setValue,
  user,
  loading,
  currentUser,
  posts,
  openImg,
  setOpenImg,
  setOpenModal,
  setPhotoIndex,
  imageList,
  scrollTopRef,
}) {
  return (
    <Box
      sx={{
        width: "970px",
        minHeight: "230px",
        margin: "0 auto",
        paddingBottom: "20px",
      }}
    >
      <TabPanel value={value} index={0}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          {/* Profile Left Bottom */}
          <Box
            sx={{
              flex: 4,
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",

              marginTop: "20px",
            }}
          >
            {/* Profile Left Bottom Info */}
            <ProfileBottomInfo
              profileState={profileState}
              currentUser={currentUser}
              user={user}
              setValue={setValue}
              setOpenModal={setOpenModal}
            />

            {/* Profile Left Bottom Images */}
            {imageList.length > 0 && (
              <ProfileBottomImageList
                user={user}
                posts={posts}
                openImg={openImg}
                setOpenImg={setOpenImg}
                setPhotoIndex={setPhotoIndex}
                imageList={imageList}
                setValue={setValue}
              />
            )}

            {/* Profile Left Bottom Friends */}
            {user?.friends?.length > 0 && (
              <ProfileBottomFriendList
                scrollTopRef={scrollTopRef}
                setValue={setValue}
                user={user}
              />
            )}
          </Box>
          {/* Profile Right Bottom Post */}
          <Box sx={{ flex: 6 }}>
            <Feed loading={loading} posts={posts} socket={socket} />
          </Box>
        </Box>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <InfoTab
          infoTabValue={infoTabValue}
          setInfoTabValue={setInfoTabValue}
          user={user}
          friends={user?.friends}
          currentUser={currentUser}
        />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <FriendTab currentUser={currentUser} user={user} />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <ImageTab
          imageList={imageList}
          setPhotoIndex={setPhotoIndex}
          setOpenImg={setOpenImg}
        />
      </TabPanel>

      <TabPanel value={value} index={4}>
        <Paper
          sx={{
            padding: "16px",
            mt: "20px",
            borderRadius: "8px",
          }}
        >
          <NotComplete />
        </Paper>
      </TabPanel>
    </Box>
  );
}

export default ProfileBottom;
