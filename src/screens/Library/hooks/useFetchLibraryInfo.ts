import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { BookItemList, TLibrary } from '@screens/Library/Library.types';
import { getMyLibraryInfo, getYourLibraryInfo } from '@commons/api/postcard/library.api';

export const useFetchLibraryInfo = (isYourLibrary: boolean, targetMemberId?: number) => {
  const [data, setData] = useState<TLibrary>();
  const [bookRows, setBookRows] = useState<BookItemList[]>([]);

  const fetchLibraryInfo = useCallback(async () => {
    try {
      let response;
      if (isYourLibrary && targetMemberId) {
        response = await getYourLibraryInfo(targetMemberId);
      } else {
        response = await getMyLibraryInfo();
      }
      setData(response.result ?? []);

      const totalBooks = response.result.bookResponses.length;
      const minimumItems = 4;

      const combinedBooks = [
        ...response.result.bookResponses.map((book: any) => ({ isEmpty: false, book })),
        ...Array.from({ length: 2 }).map(() => ({ isEmpty: true })),
      ];

      const bookRows: BookItemList[] = [];

      for (let i = 0; i < Math.max(minimumItems, totalBooks); i += 2) {
        bookRows.push({
          books: combinedBooks.slice(i, i + 2),
        });
      }

      setBookRows(bookRows);
    } catch (error) {
      if (isYourLibrary) {
        console.error('상대방 서재 정보를 불러오는데 실패하였습니다.', error);
      } else {
        console.error('내 서재 정보를 불러오는데 실패하였습니다.', error);
      }
    }
  }, [isYourLibrary]);

  useFocusEffect(
    useCallback(() => {
      fetchLibraryInfo();
    }, [isYourLibrary]),
  );

  return {
    libraryInfo: data,
    bookRows,
    fetchLibraryInfo,
  };
};
