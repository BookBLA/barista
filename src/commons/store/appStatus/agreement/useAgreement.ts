import { create } from 'zustand';

interface AgreementInfo {
  adAgreementPolicy: boolean;
}
interface AgreementState {
  agreementInfo: AgreementInfo;
  updateAgreement: (field: keyof AgreementInfo, value: boolean) => void;
}

export const useAgreementStore = create<AgreementState>((set) => ({
  agreementInfo: {
    adAgreementPolicy: false,
  },
  updateAgreement: (field, value) => set((state) => ({ agreementInfo: { ...state.agreementInfo, [field]: value } })),
}));
