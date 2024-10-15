import useToastStore from '@commons/store/ui/toast/useToastStore';

interface IFormErrors {
  review?: { message: string };
  quiz?: { message: string };
  quizAnswer?: { message: string };
  firstWrongChoice?: { message: string };
  secondWrongChoice?: { message: string };
}

const useInvalid = () => {
  const showToast = useToastStore((state) => state.showToast);

  const handleFormError = (errors: IFormErrors) => {
    if (errors.review) {
      showToast({ content: errors.review.message ?? '' });
      return;
    }

    if (errors.quiz) {
      showToast({ content: errors.quiz.message ?? '' });
      return;
    }

    if (errors.quizAnswer) {
      showToast({ content: errors.quizAnswer.message ?? '' });
      return;
    }

    if (errors.firstWrongChoice) {
      showToast({ content: errors.firstWrongChoice.message ?? '' });
      return;
    }

    if (errors.secondWrongChoice) {
      showToast({ content: errors.secondWrongChoice.message ?? '' });
    }
  };

  return handleFormError;
};

export default useInvalid;
