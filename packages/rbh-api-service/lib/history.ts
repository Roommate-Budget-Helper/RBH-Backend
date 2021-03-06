import { ApiClient, HttpClient } from './http_client';

export class HistoryApi extends ApiClient {
    public getHistory = async (userId: numId) =>
        this.httpClient.request<IHistoryResponse[]>('get', `/api/history?userId=${userId}`);
    
}

export default (client: HttpClient) => new HistoryApi(client);