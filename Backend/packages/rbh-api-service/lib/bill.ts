import { ApiClient, HttpClient } from './http_client';

export class BillApi extends ApiClient {
    public createBill = async (ownerId: numId, homeId:numId, internalFlag: number,plannedSharedFlag: number,
        sharePlanid: number,proportion: number,totalAmount: number) =>
        this.httpClient.request<Boolean>('post', `/api/bill?ownerId=${ownerId}&homeId=${homeId}&internalFlag=${internalFlag}
        &plannedSharedFlag=${plannedSharedFlag}&sharePlanid=${sharePlanid}
        &proportion=${proportion}&totalAmount=${totalAmount}`);

    public getBillByHome = async (homeId: numId) => this.httpClient.request<IBill[]>('get', `/api/bill/byhome?homeId=${homeId}`);

    public getBillByUser = async (userId: numId) => this.httpClient.request<IBill[]>('get', `/api/bill/byuser?userId=${userId}`);
}

export default (client: HttpClient) => new BillApi(client);
