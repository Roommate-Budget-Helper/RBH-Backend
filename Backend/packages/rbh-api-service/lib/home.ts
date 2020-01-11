import { ApiClient, HttpClient } from './http_client';

export class HomeApi extends ApiClient {
    public createHome = async (fullname: string, adminname: string, adminid: Number) =>
        this.httpClient.request<Number>('post', `/api/home?fullname=${fullname}&adminname=${adminname}&adminid=${adminid}`);

    public getHome = async (userId: Number) => this.httpClient.request<IUser2Home[]>('get', `/api/home?userId=${userId}`);

    public getHomeDetail = async (houseId: Number) => this.httpClient.request<IUserInfo[]>('get', `/api/home/detail?houseId=${houseId}`);

    public removeRoommate = async (userName:string, houseId:number) => this.httpClient.request<Boolean>('delete',`/api/home?userName=${userName}&houseId=${houseId}`)
}

export default (client: HttpClient) => new HomeApi(client);
