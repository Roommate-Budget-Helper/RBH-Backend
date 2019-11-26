import HttpClient from './http_client';
import auth from './auth';
import user from './user';

export default class {
    private client: ReturnType<typeof HttpClient>;

    public constructor(endpoint?: string) {
        this.client = HttpClient(endpoint);
        // this.client.headers['Time-Zone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    // public setHeader = (headers: Record<string, string>) => {
    //     Object.assign(this.client.headers, headers);
    // };

    public set authInfo(authInfo: IAuthResponse) {
        this.client.headers['User-Id'] = authInfo.userId;
        this.client.headers['Id-Token'] = authInfo.accessToken;
    }

    public get auth() {
        return auth(this.client);
    }
    public get user() {
        return user(this.client);
    }
}
