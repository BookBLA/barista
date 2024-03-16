import create from 'zustand';

interface AgreementInfo {
  adAgreementPolicy: boolean;
}
interface AgreementState {
  agreementInfo: AgreementInfo;
  updatePolicy: (field: keyof AgreementInfo, value: boolean) => void;
}

export const useAgreementStore = create<AgreementState>((set) => ({
  agreementInfo: {
    adAgreementPolicy: false,
  },
  updatePolicy: (field, value) => set((state) => ({ agreementInfo: { ...state.agreementInfo, [field]: value } })),
}));
