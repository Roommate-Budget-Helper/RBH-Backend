import HttpClient from './http_client';
import auth from './auth';
import user from './user';
import home from './home';
import invitation from './invitation';
import bill from './bill';
import history from './history'

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
    public get home() {
        return home(this.client);
    }
    public get invitation() {
        return invitation(this.client);
    }
    public get bill(){
        return bill(this.client);
    }
    public get history(){
        return history(this.client);
    }
}
