import { create } from 'zustand';

type TModalData = {
  memberId: number;
  memberName: string;
  memberAge: number;
  memberGender: string;
  memberSchoolName: string;
  memberProfileImageUrl: string;
  memberOpenKakaoRoomUrl: string;
  bookImageUrls: string[];
};

interface ModalStore {
  modalData: TModalData;
  isMatchingApproveModalVisible: boolean;
  setMatchingApproveModalVisible: (visible: boolean) => void;
  setMatchingApproveModalData: (data: TModalData) => void;
}

const initialModalData: TModalData = {
  memberId: 0,
  memberName: '',
  memberAge: 0,
  memberGender: '',
  memberSchoolName: '',
  memberProfileImageUrl: '',
  memberOpenKakaoRoomUrl: '',
  bookImageUrls: [],
};

const useModalStore = create<ModalStore>((set) => ({
  modalData: initialModalData,
  isMatchingApproveModalVisible: false,
  setMatchingApproveModalVisible: (visible: boolean) => set({ isMatchingApproveModalVisible: visible }),
  setMatchingApproveModalData: (data: TModalData) => set({ modalData: data }),
}));

export default useModalStore;
