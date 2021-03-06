import { ApiClient, HttpClient } from './http_client';

export class InvitationApi extends ApiClient {
    public createInvitation = async (userName: string, houseId: numId) =>
        this.httpClient.request<boolean>('post', `/api/invitation?userName=${userName}&houseId=${houseId}`);

    public getInvitation = async (userId: numId) => this.httpClient.request<IInvitation[]>('get', `/api/invitation?userId=${userId}`);

    public acceptInvitation = async (invitationId: numId) =>
        this.httpClient.request<Boolean>('delete', `/api/invitation/accept?id=${invitationId}`);

    public declineInvitation = async (invitationId: numId) =>
        this.httpClient.request<Boolean>('delete', `/api/invitation/decline?id=${invitationId}`);

    public getAllUsername = async () => this.httpClient.request<string[]>('get', '/api/invitation/allusers');
    public checkInvitation = async (userName: string, houseId: numId) =>
    this.httpClient.request<Boolean>('get', `/api/invitation/checkinvitation/?userName=${userName}&houseId=${houseId}`);
}

export default (client: HttpClient) => new InvitationApi(client);
