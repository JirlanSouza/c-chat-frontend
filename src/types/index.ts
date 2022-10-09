//AUTH
export interface UserInfo {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  token: string;
  isLoggedIn: boolean;
}

//CHAT
////Message itself
export interface MessageInfo {
  id: string;
  roomId: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  text: string;
  created: string;
  isSelf: boolean;
}

////Message Style
export interface MessageStyle {
  alignSelf: string;
  borderRadius: string;
  backgroundColor?: string;
  color?: string;
}