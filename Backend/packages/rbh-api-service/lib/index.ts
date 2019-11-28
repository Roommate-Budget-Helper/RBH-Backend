import HttpClient from './http_client';
import auth from './auth';
import user from './user';

export default class {
    private client: ReturnType<typeof HttpClient>;

    public constructor(endpoint?: string) {
        this.client = HttpClient(endpoint);
    }

    public get auth() {
        return auth(this.client);
    }
    public get user() {
        return user(this.client);
    }
}
