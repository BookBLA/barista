import { Get } from '../../utils/http.api';

export const getVersionApi = () => Get('settings/versions');
