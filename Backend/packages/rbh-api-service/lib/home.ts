import { ApiClient, HttpClient } from './http_client';

export class HomeApi extends ApiClient {
    public createHome = async (fullname: string, adminname: string, adminid: numId) =>
        this.httpClient.request<stringId>('post', `/api/home?fullname=${fullname}&adminname=${adminname}&adminid=${adminid}`);

    public getHome = async (userId: numId) => this.httpClient.request<IUser2Home[]>('get', `/api/home?userId=${userId}`);

    public getHomeDetail = async (houseId: numId) => this.httpClient.request<IUserInfo[]>('get', `/api/home/detail?houseId=${houseId}`);
}

export default (client: HttpClient) => new HomeApi(client);
