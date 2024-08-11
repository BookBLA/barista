import { Get } from '../../configs/axios/http.api';

export const getVersionApi = () => Get('settings/versions');
