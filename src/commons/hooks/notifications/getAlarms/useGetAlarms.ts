import { getAlarms } from '@commons/api/members/alarm/memberPushAlarm.api';
import { MemberPushAlarmReadResponse } from '@commons/types/openapiGenerator';
import { useEffect, useState } from 'react';

export const useGetAlarms = () => {
  const [data, setData] = useState<MemberPushAlarmReadResponse[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const fetchAlarms = async (newPage = 1) => {
    if (loading || !hasNextPage) return; // Prevent multiple requests
    setLoading(true);
    try {
      const { result } = await getAlarms({ page: newPage, size: 20, sort: ['createdAt,desc'] });
      if (result?.data?.length) {
        setData((prevData) => [...prevData, ...(result?.data ?? [])]); // Append new data
        setPage(newPage);
      } else {
        setHasNextPage(false); // No more data
      }
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlarms();
  }, []);

  return { data, setData, fetchAlarms, page, setPage, loading, hasNextPage };
};
