import { Get, Post } from '@commons/configs/axios/http.api';

export const getOnboardingStatus = async () => Get('members/onboarding', {});

export const postOnboardingStatus = async (where: string) => Post('members/onboarding', { onboarding: where });
