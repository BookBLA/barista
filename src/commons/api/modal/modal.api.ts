import { Get, Post } from '@commons/configs/axios/http.api';
import { MemberInvitationRewardResponse, MemberOnboardingStatusResponse } from '@commons/types/openapiGenerator';

export const getOnboardingStatus = async () => Get<MemberOnboardingStatusResponse>('member-modal/onboarding', {});

export const postOnboardingStatus = async (where: string) => Post('member-modal/onboarding', { onboarding: where });

export const getInvitationRewardStatus = async () =>
  Get<MemberInvitationRewardResponse>('member-modal/invitation-reward');

export const postInvitationRewardStatus = async (invitedRewardStatus: string) =>
  Post('member-modal/invitation-reward', invitedRewardStatus);
