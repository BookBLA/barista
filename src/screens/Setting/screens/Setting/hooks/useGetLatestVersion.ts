import { useEffect, useState } from 'react';
import { getVersionApi } from '../../../../../commons/api/setting.api';
import { initDataState } from '../contents/initDataState';
import { ISettingData } from '../Setting.types';

export const useGetLatestVersion = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ISettingData>(initDataState);
  const getLatestVersion = async () => {
    const { result } = await getVersionApi();
    const { version, googlePlayStoreUrl, appStoreUrl } = result;
    setData({
      version,
      googlePlayStoreUrl,
      appStoreUrl,
    });
    setLoading(false);
  };

  useEffect(() => {
    getLatestVersion();
  }, []);

  return { data, loading };
};
