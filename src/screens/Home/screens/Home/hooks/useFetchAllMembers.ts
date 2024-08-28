import { getMemberAllOtherMembersApi } from '@commons/api/members/default/member.api';
import { filterOptions } from '@screens/Home/HomeStack.constants';
import { IDdata, TFilterKeys, TFilterState } from '@screens/Home/HomeStack.types';
import { useCallback, useEffect, useState } from 'react';

export const useFetchAllMembers = (filter: TFilterState) => {
  const [data, setData] = useState<IDdata[]>([]);
  const [page, setPage] = useState(0);
  const [resetPage, setResetPage] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAllMembersBook = useCallback(async () => {
    const params: Record<string, string> = { page: String(page) };

    for (const key of Object.keys(filter)) {
      const filterKey = key as TFilterKeys;
      const option = filterOptions[filterKey].find((option) => option.label === filter[filterKey]);

      if (option && option.value && option.value !== '전체') {
        params[key] = option.value;
      }
    }

    try {
      const { result } = await getMemberAllOtherMembersApi({ params });
      setTotalPage(result.totalPages);
      if (page === 0) {
        setData(result.content ?? []);
      } else {
        setData((prev) => [...prev, ...(result.content ?? [])]);
      }
    } catch (error) {
      console.error('error', error);
    } finally {
      setRefreshing(false);
    }
  }, [filter, page]);

  const onReset = () => {
    setPage(0);
    setData([]);
    setResetPage((prev) => !prev);
  };

  const onRefresh = () => {
    setRefreshing(true);
    onReset();
  };

  const onNextPage = () => {
    if (page === totalPage - 1) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchAllMembersBook();
  }, [page, resetPage]);

  return { data, page, totalPage, refreshing, setPage, setData, onReset, onRefresh, onNextPage };
};
