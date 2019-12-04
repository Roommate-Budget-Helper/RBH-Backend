import { ApiClient, HttpClient } from './http_client';

export class SessionApi extends ApiClient {
    public login = async (username: string, password: string) =>
        this.httpClient.request<IUserInfo>('get', `/api/session?username=${username}&password=${password}`);

    public register = async (username: string, password: string, email: string) =>
        this.httpClient.request<IAuthResponse>('post', `/api/session?username=${username}&password=${password}&email=${email}`);
}

export default (client: HttpClient) => new SessionApi(client);
