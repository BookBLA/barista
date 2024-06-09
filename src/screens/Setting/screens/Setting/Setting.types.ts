export interface IProps {
  route: {
    params: {
      age: number;
      name: string;
      school: string;
      profileImageUrl: string;
    };
  };
}

export interface ISettingData {
  version: string;
  googlePlayStoreUrl: string;
  appStoreUrl: string;
}
