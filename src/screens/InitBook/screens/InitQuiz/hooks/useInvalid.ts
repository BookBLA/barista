import useToastStore from '../../../../../commons/store/ui/toast/useToastStore';

const useInvalid = () => {
  const showToast = useToastStore((state) => state.showToast);

  const handleFormError = (errors: any) => {
    console.log('Errors:', errors);
    if (errors.review) {
      showToast({ content: errors.review.message ?? '' });
    } else if (errors.quiz) {
      showToast({ content: errors.quiz.message ?? '' });
    } else if (errors.quizAnswer) {
      showToast({ content: errors.quizAnswer.message ?? '' });
    } else if (errors.firstWrongChoice) {
      showToast({ content: errors.firstWrongChoice.message ?? '' });
    } else if (errors.secondWrongChoice) {
      showToast({ content: errors.secondWrongChoice.message ?? '' });
    }
  };

  return handleFormError;
};

export default useInvalid;
