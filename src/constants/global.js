import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import HouseIcon from "@mui/icons-material/House";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MicIcon from "@mui/icons-material/Mic";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import WebAssetOffOutlinedIcon from "@mui/icons-material/WebAssetOffOutlined";
import userApi from "api/user";
import { Zoom } from "react-toastify";
import { capitalizeFirstLetter, showToast } from "utils/common";
import BackPackImg from "../assets/backpack.png";
import CalendarImg from "../assets/calendar.png";
import ClockImg from "../assets/clock.png";
import DanderImg from "../assets/dander.svg";
import FavouriteImg from "../assets/favourite.svg";
import FlagImg from "../assets/flag.png";
import FlowerImg from "../assets/flower.png";
import FriendImg from "../assets/friend.png";
import GImg from "../assets/g.png";
import gameImg from "../assets/game.png";
import MessengerGreenImg from "../assets/greenMessenger.png";
import GroupImg from "../assets/group.png";
import HahaImg from "../assets/haha.svg";
import HearthImg from "../assets/hearth.png";
import LabelImg from "../assets/label.png";
import LatestImg from "../assets/latest.png";
import LikeImg from "../assets/like.svg";
import liveImg from "../assets/live.png";
import LoveImg from "../assets/love.svg";
import MessengerImg from "../assets/messenger.png";
import payImg from "../assets/pay.png";
import VideoImg from "../assets/playVideo.png";
import PriestImg from "../assets/priest.png";
import PromoteImg from "../assets/promote.png";
import SadImg from "../assets/sad.svg";
import StarImg from "../assets/star.png";
import MarketImg from "../assets/store.png";
import VolumeImg from "../assets/volume.png";
import WeatherImg from "../assets/weather.png";
import WifiImg from "../assets/wifi.png";
import WowImg from "../assets/wow.svg";

export const sidebarList = [
  { name: "B???n b??", img: FriendImg },
  { name: "Nh??m", img: GroupImg },
  {
    name: "Marketplace",
    img: MarketImg,
  },
  { name: "Watch", img: VideoImg },
  { name: "K??? ni???m", img: ClockImg },
  { name: "???? l??u", img: LabelImg },
  { name: "Trang", img: FlagImg },
  { name: "S??? ki???n", img: CalendarImg },
  { name: "Vi???c l??m", img: BackPackImg },
  { name: "Chi???n d???ch g??y qu???", img: HearthImg },
  { name: "Ch??i game", img: gameImg },
  { name: "Facebook Pay", img: payImg },
  { name: "G???n ????y nh???t", img: LatestImg },
  {
    name: "Ho???t ?????ng qu???n c??o g???n ????y",
    img: PromoteImg,
  },
  { name: "Messenger", img: MessengerImg },
  { name: "Messenger nh??", img: MessengerGreenImg },
  { name: "S???c kh???e c???m x??c", img: FlowerImg },
  { name: "Th???i ti???t", img: WeatherImg },
  {
    name: "Tr??nh qu???n l?? qu???n c??o",
    img: WifiImg,
  },
  { name: "Trung t??m qu???n c??o", img: VolumeImg },
  { name: "???ng ph?? kh???n c???p", img: PriestImg },
  { name: "Video ch??i game", img: GImg },
  { name: "Video tr???c ti???p", img: liveImg },
  { name: "Y??u th??ch", img: StarImg },
];

const shareIcon = {
  fontSize: "24px",
  mr: "8px",
};

export const shareList = [
  {
    name: "Video tr???c ti???p",
    icon: <VideoCameraFrontIcon htmlColor="red" sx={shareIcon} />,
  },
  {
    name: "???nh/Video",
    icon: <PermMediaIcon htmlColor="green" sx={shareIcon} />,
  },
  {
    name: "C???m x??c/Ho???t ?????ng",
    icon: <EmojiEmotionsIcon htmlColor="goldenrod" sx={shareIcon} />,
  },
];

export const shareListIcon = [
  {
    icon: <PermMediaIcon htmlColor="green" sx={{ mr: 2 }} />,
  },
  {
    icon: <LocalOfferIcon htmlColor="blue" sx={{ mr: 2 }} />,
  },
  {
    icon: <TagFacesIcon htmlColor="goldenrod" sx={{ mr: 2 }} />,
  },
  {
    icon: <LocationOnIcon htmlColor="tomato" sx={{ mr: 2 }} />,
  },
  {
    icon: <MicIcon htmlColor="red" sx={{ mr: 2 }} />,
  },
  {
    icon: <MoreHorizIcon htmlColor="gray" />,
  },
];

export const PersonalInformation = (
  city,
  from,
  relationship,
  createdAt,
  followers
) => [
  {
    name: city,
    icon: <HouseIcon />,
  },

  {
    name: from,
    icon: <LocationOnIcon />,
  },

  {
    name: relationship,
    icon: <FavoriteIcon />,
  },

  {
    name: createdAt,
    icon: <WatchLaterIcon />,
  },

  {
    name: followers,
    icon: <RssFeedIcon />,
  },
];

export const states = [
  LikeImg,
  FavouriteImg,
  LoveImg,
  HahaImg,
  WowImg,
  SadImg,
  DanderImg,
];

export const messengerToolTip = [
  { name: "M??? b???ng Messenger", icon: <ChatBubbleOutlineOutlinedIcon /> },
  { name: "Xem trang c?? nh??n", icon: <PersonOutlineOutlinedIcon /> },
  { name: "M??u", icon: <PaletteOutlinedIcon /> },
  { name: "Bi???u t?????ng c???m x??c", icon: <SentimentSatisfiedOutlinedIcon /> },
  { name: "Bi???t danh", icon: <CreateOutlinedIcon /> },
  { name: "T???o nh??m", icon: <GroupAddOutlinedIcon /> },
  { name: "T???t cu???c tr?? chuy???n", icon: <NotificationsNoneOutlinedIcon /> },
  { name: "B??? qua tin nh???n", icon: <WebAssetOffOutlinedIcon /> },
  { name: "Ch???n", icon: <PersonOffOutlinedIcon /> },
  { name: "X??a ??o???n chat", icon: <DeleteOutlinedIcon /> },
  { name: `C?? g?? ???? kh??ng ???n`, icon: <AnnouncementOutlinedIcon /> },
];

export const PRODUCT_TOAST_OPTIONS = {
  autoClose: 2000,
  hideProgressBar: true,
  transition: Zoom,
  position: "bottom-left",
};

export const getStateNotification = (number, name) => {
  switch (number) {
    case 0:
      return `V???a m???i like b??i ${name} c???a b???n`;
    case 1:
      return `V???a m???i y??u th??ch b??i ${name} c???a b???n`;
    case 2:
      return `V???a m???i th????ng th????ng b??i ${name} c???a b???n`;
    case 3:
      return `V???a m???i haha b??i ${name} c???a b???n`;
    case 4:
      return `V???a m???i wow b??i ${name} c???a b???n`;
    case 5:
      return `V???a m???i bu???n b??i ${name} c???a b???n`;
    default:
      return `V???a m???i ph???n n??? b??i ${name} c???a b???n`;
  }
};

export const showNotification = async (senderId, message) => {
  try {
    const { user } = await userApi.getUserById(senderId);
    showToast(
      `${capitalizeFirstLetter(user.username || "")} ${message}`,
      senderId
    );
  } catch (error) {
    console.log(error);
  }
};
