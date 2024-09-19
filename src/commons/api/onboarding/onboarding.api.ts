import { Get, Post } from '@commons/configs/axios/http.api';

export const getOnboardingStatus = async () => Get('member-modal/onboarding', {});

export const postOnboardingStatus = async (where: string) => Post('member-modal/onboarding', { onboarding: where });
