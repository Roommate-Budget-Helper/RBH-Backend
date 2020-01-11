import { ApiClient, HttpClient } from './http_client';

export class InvitationApi extends ApiClient {
    public createInvitation = async (userName: string, houseId: id) =>
        this.httpClient.request<boolean>('post', `/api/invitation?userName=${userName}&houseId=${houseId}`);

    public getInvitation = async (userId: id) => this.httpClient.request<IInvitation[]>('get', `/api/invitation?userId=${userId}`);

    public acceptInvitation = async (invitationId: id) =>
        this.httpClient.request<Boolean>('delete', `/api/invitation/accept?id=${invitationId}`);

    public declineInvitation = async (invitationId: id) =>
        this.httpClient.request<Boolean>('delete', `/api/invitation/decline?id=${invitationId}`);
}

export default (client: HttpClient) => new InvitationApi(client);
