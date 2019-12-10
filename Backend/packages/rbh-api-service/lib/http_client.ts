import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export class ApiClient {
    protected httpClient: HttpClient;
    public constructor(client: HttpClient) {
        this.httpClient = client;
    }
}

export class HttpClient {
    private httpClient: AxiosInstance;
    public headers = {};

    public constructor(endpoint?: string) {
        this.httpClient = Axios.create({
            baseURL: endpoint || 'http://localhost:9527',
            withCredentials: true
        });
    }

    private throwError = (error: any) => {
        if (error.response) {
            throw new Error(JSON.stringify(error.response.data));
        } else {
            throw new Error();
        }
    };

    public request<R = void, B = void>(method: HttpMethod, url: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
        return this.httpClient
            .request<R>({ method, url, data, headers: this.headers, ...config })
            .then((res) => res.data)
            .catch(this.throwError);
    }
}

export default (endpoint?: string) => new HttpClient(endpoint);
