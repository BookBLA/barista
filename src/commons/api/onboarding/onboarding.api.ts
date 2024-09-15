import { Post } from '@commons/configs/axios/http.api';

export const postOnboardingStatus = async (where: string) => Post('members/onboarding', { onboarding: where });
