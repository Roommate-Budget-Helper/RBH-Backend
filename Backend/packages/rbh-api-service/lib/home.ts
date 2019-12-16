import { ApiClient, HttpClient } from './http_client';

export class HomeApi extends ApiClient {
    public createHome = async (fullname: string, adminname: string, adminid: Number) =>
        this.httpClient.request<boolean>('post', `/api/home?fullname=${fullname}&adminname=${adminname}&adminid=${adminid}`);

    public getHome = async (userId: number) => this.httpClient.request<IUser2Home[]>('get', `/api/home?userId=${userId}`);
}

export default (client: HttpClient) => new HomeApi(client);
