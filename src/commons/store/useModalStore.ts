import create from 'zustand';

interface ModalStore {
  isMatchingApproveModalVisible: boolean;
  setMatchingApproveModalVisible: (visible: boolean) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isMatchingApproveModalVisible: false,
  setMatchingApproveModalVisible: (visible: boolean) => set({ isMatchingApproveModalVisible: visible }),
}));

export default useModalStore;
