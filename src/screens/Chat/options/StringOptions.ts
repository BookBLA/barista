import dateLocale from 'date-fns/locale/ko';
import { StringSetEn, createBaseStringSet } from '@sendbird/uikit-react-native';
import { UNKNOWN_USER_ID } from '@sendbird/uikit-react-native/src/constants';
import { getMessageType } from '@sendbird/uikit-utils';

const USER_NO_NAME = '(이름없음)';

const StringSetKo = createBaseStringSet({
  dateLocale,
  overrides: {
    GROUP_CHANNEL: {
      LIST_BUTTON_NEW_MSG: (newMessages) => `${newMessages.length}개의 새로운 메시지`,

      MESSAGE_BUBBLE_EDITED_POSTFIX: ' (수정됨)',
      MESSAGE_BUBBLE_UNKNOWN_TITLE: () => '(확인되지 않은 메시지 타입)',
      MESSAGE_BUBBLE_UNKNOWN_DESC: () => '이 메시지를 읽을 수 없습니다',
    },
    GROUP_CHANNEL_THREAD: {
      HEADER_TITLE: '스레드',
      LIST_BUTTON_NEW_MSG: (newMessages) => `${newMessages.length}개의 새로운 메시지`,

      MESSAGE_BUBBLE_EDITED_POSTFIX: ' (수정됨)',
      MESSAGE_BUBBLE_UNKNOWN_TITLE: () => '(확인되지 않은 메시지 타입)',
      MESSAGE_BUBBLE_UNKNOWN_DESC: () => '이 메시지를 읽을 수 없습니다',
    },
    GROUP_CHANNEL_SETTINGS: {
      // notification 부분 빼고는 수정해도 바뀌지 않음. 직접 컴포넌트 수정 필요
      HEADER_TITLE: '채팅방 정보',
      MENU_LEAVE_CHANNEL: '채팅방 나가기',
      MENU_NOTIFICATION: '알림',
      MENU_NOTIFICATION_LABEL_ON: '',
      MENU_NOTIFICATION_LABEL_OFF: '',
      DIALOG_CHANGE_NAME_PROMPT_PLACEHOLDER: '이름을 입력해주세요',
      DIALOG_CHANGE_NAME_PROMPT_OK: '확인',
      DIALOG_CHANGE_NAME_PROMPT_CANCEL: '취소',
    },
    GROUP_CHANNEL_NOTIFICATIONS: {
      HEADER_TITLE: '알림',
      MENU_NOTIFICATIONS: '알림',
      MENU_NOTIFICATIONS_DESC: '이 방에 메시지가 전달될 때 알림을 받으려면 푸시 알림을 켜세요.',
      MENU_NOTIFICATIONS_OPTION_ALL: '새로운 메시지들',
      MENU_NOTIFICATIONS_OPTION_MENTION_ONLY: '태그만',
    },
    GROUP_CHANNEL_MODERATION: {
      MENU_FREEZE_CHANNEL: '상대방이 엽서를 수락하면 대화가 시작됩니다',
    },
    MESSAGE_SEARCH: {
      HEADER_INPUT_PLACEHOLDER: '검색',
      HEADER_RIGHT: '검색하기',
    },
    LABELS: {
      // 기본 , 권한
      PERMISSION_APP_NAME: 'BOOK BLA',
      PERMISSION_CAMERA: '카메라',
      PERMISSION_DEVICE_STORAGE: '저장공간',
      PERMISSION_MICROPHONE: '마이크',
      CHANNEL_INPUT_ATTACHMENT_CAMERA_PHOTO: '카메라',
      CHANNEL_INPUT_ATTACHMENT_CAMERA_VIDEO: '비디오',
      CHANNEL_INPUT_ATTACHMENT_PHOTO_LIBRARY: '앨범',
      CHANNEL_INPUT_ATTACHMENT_FILES: '파일',
      // 답장하기
      TYPING_INDICATOR_TYPINGS: (users) => {
        if (users.length === 0) return '';
        return `${users.length}명이 입력중...`;
      },
      REPLY_FROM_SENDER_TO_RECEIVER: (reply, parent, currentUserId = UNKNOWN_USER_ID) => {
        // const replySenderNickname =
        //   reply.sender.userId === currentUserId ? '나' : reply.sender.nickname || USER_NO_NAME;
        const parentSenderNickname =
          parent.sender.userId === currentUserId ? '나' : parent.sender.nickname || USER_NO_NAME;
        return `${parentSenderNickname}에게 답장했습니다`;
      },
      CHANNEL_INPUT_REPLY_PREVIEW_TITLE: (user) => {
        return `${user.nickname}에게 답장하기`;
      },
      CHANNEL_INPUT_REPLY_PREVIEW_BODY: (message) => {
        if (message.isFileMessage()) {
          const messageType = getMessageType(message);
          switch (messageType) {
            case 'file.image':
              return message.type.toLowerCase().includes('gif') ? 'GIF' : '사진';
            case 'file.video':
              return '비디오';
            case 'file.audio':
              return '오디오';
            case 'file.voice':
              return '음성 메시지';
            default:
              return message.name;
          }
        } else if (message.isUserMessage()) {
          return message.message;
        }
        return '알수없는 메시지입니다';
      },
      // 나감
      CHANNEL_NO_MEMBERS: '(상대방이 나간 채팅방)',
      USER_NO_NAME,
      MESSAGE_UNAVAILABLE: '메시지를 보낼 수 없습니다',
      // 제한
      USER_BAR_ME_POSTFIX: ' (나)',
      MUTE: '음소거',
      UNMUTE: '음소거 해제',
      BAN: '채팅금지',
      UNBAN: '채팅금지 해제',
      CHANNEL_MESSAGE_LIST_FROZEN: '얼음!',

      CHANNEL_INPUT_PLACEHOLDER_REPLY_IN_THREAD: '스레드에서 답장하기',
      CHANNEL_INPUT_PLACEHOLDER_REPLY_TO_THREAD: '스레드로 답장하기',
      CHANNEL_INPUT_PLACEHOLDER_ACTIVE: '메시지 보내기',
      CHANNEL_INPUT_PLACEHOLDER_MUTED: '방장에 의해 음소거되었습니다',
      CHANNEL_INPUT_EDIT_OK: '수정',
      CHANNEL_INPUT_EDIT_CANCEL: '취소',
      CHANNEL_MESSAGE_COPY: '복사하기',
      CHANNEL_MESSAGE_EDIT: '수정하기',
      CHANNEL_MESSAGE_SAVE: '저장하기',
      CHANNEL_MESSAGE_DELETE: '삭제하기',
      CHANNEL_MESSAGE_THREAD: '스레드에서 답장하기',
      CHANNEL_MESSAGE_DELETE_CONFIRM_TITLE: '메시지를 삭제할까요?',
      CHANNEL_MESSAGE_DELETE_CONFIRM_OK: '삭제하기',
      CHANNEL_MESSAGE_DELETE_CONFIRM_CANCEL: '취소',
      CHANNEL_MESSAGE_FAILED_RETRY: '다시 보내기',
      CHANNEL_MESSAGE_FAILED_REMOVE: '삭제하기',
      CHANNEL_INPUT_PLACEHOLDER_REPLY: '메시지 보내기',
      CHANNEL_MESSAGE_REPLY: '답장하기',
    },
    PLACEHOLDER: {
      NO_BANNED_USERS: '채팅금지당한 사람이 없습니다',
      NO_USERS: '유저가 없습니다',
      NO_CHANNELS: '채팅방이 없습니다',
      NO_MESSAGES: '메시지가 없습니다',
      NO_MUTED_MEMBERS: '음소거된 사람이 없습니다',
      NO_MUTED_PARTICIPANTS: '음소거된 참가자가 없습니다',
      NO_RESULTS_FOUND: '검색 결과 없음',
      ERROR: {
        MESSAGE: '문제가 발생했습니다',
        RETRY_LABEL: '재시도',
      },
    },
    DIALOG: {
      ALERT_DEFAULT_OK: '승인',
      ALERT_PERMISSIONS_TITLE: '권한을 승인할까요?',
      ALERT_PERMISSIONS_MESSAGE: (permission, appName = 'BOOK BLA') => {
        return `${appName}에서 ${permission} 권한을 승인요청합니다`;
      },
      ALERT_PERMISSIONS_OK: 'Go to settings',
      PROMPT_DEFAULT_OK: '제출',
      PROMPT_DEFAULT_CANCEL: '취소',
      PROMPT_DEFAULT_PLACEHOLDER: '확인',
    },
    TOAST: {
      COPY_OK: '복사완료',
      DOWNLOAD_START: '다운로드중...',
      DOWNLOAD_OK: '파일을 저장했어요',
      DOWNLOAD_ERROR: '파일을 저장하지 못했습니다',
      OPEN_CAMERA_ERROR: '카메라를 켤 수 없어요',
      OPEN_FILES_ERROR: '파일을 열 수 없어요',
      OPEN_PHOTO_LIBRARY_ERROR: '앨범을 열 수 없어요',
      DELETE_MSG_ERROR: '메시지를 삭제할 수 없어요',
      RESEND_MSG_ERROR: '메시지를 보낼 수 없어요',
      SEND_MSG_ERROR: '메시지를 보낼 수 없어요',
      USER_MUTED_ERROR: '관리자에 의해 음소거되었습니다',
      CHANNEL_FROZEN_ERROR: '이 채널은 얼었습니다!',
      UPDATE_MSG_ERROR: '메시지를 수정할 수 없어요',
      TURN_ON_NOTIFICATIONS_ERROR: '알림을 켤 수 없어요',
      TURN_OFF_NOTIFICATIONS_ERROR: '알림을 끌 수 없어요',
      LEAVE_CHANNEL_ERROR: '채팅방을 나갈 수 없어요',
      UNKNOWN_ERROR: '문제가 발생했습니다',
      GET_CHANNEL_ERROR: '채팅방을 찾을 수 없어요',
      FIND_PARENT_MSG_ERROR: '답장할 메시지를 찾을 수 없어요',
      THREAD_PARENT_MESSAGE_DELETED_ERROR: '스레드 시작 메시지가 삭제되어 스레드를 열 수 없어요',
      FILE_UPLOAD_SIZE_LIMIT_EXCEEDED_ERROR: (uploadSizeLimit: string) => {
        return `파일의 최대 사이즈 제한은 ${uploadSizeLimit} 입니다`;
      },
    },
    PROFILE_CARD: {
      BUTTON_MESSAGE: '메시지',
      BODY_LABEL: '유저 ID',
    },
  },
});

export const StringSets = {
  'en': StringSetEn,
  'ko': StringSetKo,
};
