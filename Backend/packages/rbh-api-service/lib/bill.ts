import { ApiClient, HttpClient } from './http_client';

export class BillApi extends ApiClient {
    public createBill = async (billInfo: IBillCreateInfo) =>
        this.httpClient.request<boolean, IBillCreateInfo>('post', '/api/bill', billInfo);

    public getBillByHome = async (homeId: numId) => this.httpClient.request<IBill[]>('get', `/api/bill/byhome?homeId=${homeId}`);

    public getBillByUser = async (userId: numId) => this.httpClient.request<IBill[]>('get', `/api/bill/byuser?userId=${userId}`);

    public getBillById = async (billId: numId) => this.httpClient.request<IBillDetail[]>('get', `/api/bill/byid?billId=${billId}`);

    public deleteBill = async (billid: numId) => this.httpClient.request<Boolean>('delete', `/api/bill?billId=${billid}`);

    public markAsResolved = async (billid: numId) => this.httpClient.request<Boolean>('put', `/api/bill?billId = ${billid}`);

    public getSharePlans = async (houseId: numId) =>
        this.httpClient.request<IBillSharePlan[]>('get', `/api/bill/shareplan?houseId=${houseId}`);
}

export default (client: HttpClient) => new BillApi(client);
