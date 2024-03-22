import { create } from 'zustand';

interface BookInfo {
  title: string;
  authors: string[];
}

interface BookState {
  bookInfo: BookInfo;
  updateBookInfo: (field: keyof BookInfo, value: string) => void;
}

export const useBookStore = create<BookState>((set) => ({
  bookInfo: {
    title: '',
    authors: [],
  },
  updateBookInfo: (field, value) => set((state) => ({ bookInfo: { ...state.bookInfo, [field]: value } })),
}));
