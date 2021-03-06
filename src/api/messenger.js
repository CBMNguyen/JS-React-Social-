import axiosClient from "./axiosClient";

const messengerApi = {
  getConversations: (userId) => {
    const url = `/conversations/${userId}`;
    return axiosClient.get(url);
  },

  getMessages: (userId) => {
    const url = `/messages/${userId}`;
    return axiosClient.get(url);
  },
  getConversationTwoUser: (userId1, userId2) => {
    const url = `/conversations/find/${userId1}/${userId2}`;
    return axiosClient.get(url);
  },
};

export default messengerApi;
