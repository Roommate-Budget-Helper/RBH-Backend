import { ApiClient, HttpClient } from './http_client';

export class UserApi extends ApiClient {
    public editPassword = async (userId: string, password: string) =>
        this.httpClient.request<IUserInfo>('put', `/api/user/${userId}/password/${password}`);
}

export default (client: HttpClient) => new UserApi(client);
