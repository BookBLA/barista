export interface User {
  id: string;
  nickname: string;
  avatar: string;
  school: string;
  smokingStatus: string;
  mbti: string;
  height: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: string;
  sender: 'user' | 'partner';
  image?: any; // 이미지 타입은 프로젝트 설정에 따라 더 구체적으로 정의할 수 있습니다
  isRead?: boolean;
}

export type ChatStackParamList = {
  Chat: undefined;
  ChatDetail: { user: User };
  ChatInfo: { user: User };
};
