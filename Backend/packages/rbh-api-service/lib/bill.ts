import { ApiClient, HttpClient } from './http_client';

export class BillApi extends ApiClient {
    public createBill = async (billInfo: IBillCreateInfo) =>
        this.httpClient.request<IBillCreateResponse, IBillCreateInfo>('post', '/api/bill', billInfo);

    public getBillByHome = async (homeId: numId) => this.httpClient.request<IBill[]>('get', `/api/bill/byhome?homeId=${homeId}`);

    public getBillByUser = async (userId: numId) => this.httpClient.request<IBill[]>('get', `/api/bill/byuser?userId=${userId}`);

    public getBillById = async (billId: numId) => this.httpClient.request<IBillDetail[]>('get', `/api/bill/byid?billId=${billId}`);

    public editBillById = async (billDetails: IBillDetail[]) =>
        this.httpClient.request<Boolean, IBillDetail[]>('post', '/api/bill/byid', billDetails);

    public deleteBill = async (billid: numId) => this.httpClient.request<Boolean>('delete', `/api/bill?billId=${billid}`);

    public markAsResolved = async (billid: numId) => this.httpClient.request<Boolean>('put', `/api/bill?billId = ${billid}`);

    public getSharePlans = async (houseId: numId) =>
        this.httpClient.request<IBillSharePlan[]>('get', `/api/bill/shareplan?houseId=${houseId}`);

    public getRecurrentBill = async (houseId: numId) =>
        this.httpClient.request<IBillRecurrent[]>('get', `/api/bill/recurrentbill?houseId=${houseId}`);

    public updateRecurrent = async (recurrent: IBillRecurrentUpdate) =>
        this.httpClient.request<Boolean, IBillRecurrentUpdate>('post', '/api/bill/recurrentbill', recurrent);

    public uploadProofById = async (data: IBillProofUpload) =>
        this.httpClient.request<Boolean, IBillProofUpload>('post', '/api/bill/proof', data);

    public getBillHistoryById = async (billId: numId) =>
    this.httpClient.request<IBillHistory[]>('get', `/api/bill/history?billId=${billId}`);

    public createBillHistory = async (data: IBillHistory) =>
    this.httpClient.request<Boolean, IBillHistory>('post', '/api/bill/history', data);
}

export default (client: HttpClient) => new BillApi(client);
