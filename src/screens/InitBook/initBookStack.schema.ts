import * as yup from 'yup';

// TODO: 성진 - 토스트 메세지랑 연결하기
export const initBookSchema = yup.object().shape({
  review: yup.string().required('리뷰는 필수 입력 사항입니다.').max(100, '리뷰는 최대 100자까지 입력 가능합니다.'),
  quiz: yup.string().required('퀴즈 질문은 필수입니다.').max(21, '최대 21자까지 입력이 가능합니다.'),
  quizAnswer: yup.string().required('퀴즈 정답을 입력해야 합니다.').max(21, '최대 21자까지 입력이 가능합니다.'),
  firstWrongChoice: yup
    .string()
    .required('첫 번째 오답을 입력해야 합니다.')
    .max(21, '최대 21자까지 입력이 가능합니다.'),
  secondWrongChoice: yup
    .string()
    .required('두 번째 오답을 입력해야 합니다.')
    .max(21, '최대 21자까지 입력이 가능합니다.'),
});
