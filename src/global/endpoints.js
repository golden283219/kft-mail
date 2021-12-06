
// export const backendUrl = 'https://kung-fu-tea.herokuapp.com/api/v1';
export const backendUrl = 'http://74.208.83.162/api/v1';
export const newBackendUrl = 'http://74.208.83.162/api/v1'

export default {
  signUp: 'users/',
  login: 'token/',

  // PATCH
  getUserData: 'users/',

  updateUserData: 'users/',
  changePassword: 'users/change_password/',

  fetchNewsList: 'mails/announcements/',
  fetchNewsDetails: ({ newsId }) => `mails/announcements/${newsId}/`,
  setNewsReading: ({ newsId }) => `mails/track-time/${newsId}/`,
  setNotificationData: 'notifications/',
  getLinkInfo: 'getinfo/'
};
