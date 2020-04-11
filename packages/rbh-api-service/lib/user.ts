import { ApiClient, HttpClient } from './http_client';

export class UserApi extends ApiClient {}

export default (client: HttpClient) => new UserApi(client);
