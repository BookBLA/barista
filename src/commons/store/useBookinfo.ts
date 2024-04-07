import { create } from 'zustand';

interface BookInfo {
  title: string;
  authors: string[];
  isbn: string;
  imageUrl: string;
}

interface BookState {
  bookInfo: BookInfo;
  updateBookInfo: (field: keyof BookInfo, value: string) => void;
}

export const useBookStore = create<BookState>((set) => ({
  bookInfo: {
    title: '',
    authors: [],
    isbn: '',
    imageUrl: '',
  },
  updateBookInfo: (field, value) => set((state) => ({ bookInfo: { ...state.bookInfo, [field]: value } })),
}));
