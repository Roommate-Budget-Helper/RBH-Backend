import { ApiClient, HttpClient } from './http_client';

export class SessionApi extends ApiClient {
    public login = async (username: string, password: string) =>
        this.httpClient.request<IAuthResponse>('get', `/api/session?username=${username}&password=${password}`);

    public register = async (registerInfo: IRegisterInfo) =>
        this.httpClient.request<IAuthResponse, { registerInfo: IRegisterInfo }>('post', '/api/session', { registerInfo });

    public logout = async () => this.httpClient.request('delete', '/api/session');
}

export default (client: HttpClient) => new SessionApi(client);
