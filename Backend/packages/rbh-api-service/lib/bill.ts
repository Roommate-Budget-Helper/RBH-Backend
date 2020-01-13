import { ApiClient, HttpClient } from './http_client';

export class BillApi extends ApiClient {
    public createBill = async (ownerId: numId, homeId: numId, plannedSharedFlag: number, sharePlanid: number, totalAmount: number, roommates: string[], amount: number[], proportion:number[]) =>
        this.httpClient.request<boolean>('post', `/api/bill?ownerId=${ownerId}&homeId=${homeId}&plannedSharedFlag=${plannedSharedFlag}&sharePlanid=${sharePlanid}&totalAmount=${totalAmount}`)

    public getBillByHome = async (homeId: numId) => this.httpClient.request<IBill[]>('get', `/api/bill/byhome?homeId=${homeId}`);

    public getBillByUser = async (userId: numId) => this.httpClient.request<IBill[]>('get', `/api/bill/byuser?userId=${userId}`);
}

export default (client: HttpClient) => new BillApi(client);
