import { ApiClient, HttpClient } from './http_client';

export class InvitationApi extends ApiClient {
    public createInvitation = async (userId: number, houseId: number) =>
        this.httpClient.request<boolean>('post', `/api/invitation?userId=${userId}&houseId=${houseId}`);

    public getInvitation = async (userId: number) => this.httpClient.request<IInvitation[]>('get', `/api/invitation?userId=${userId}`);

    public acceptInvitation = async (invitationId: number) => this.httpClient.request<Boolean>('get', `/api/invitation/accept?id=${invitationId}`);

    public declineInvitation = async (invitationId: number) => this.httpClient.request<Boolean>('get', `/api/invitation/decline?id=${invitationId}`);

}

export default (client: HttpClient) => new InvitationApi(client);
