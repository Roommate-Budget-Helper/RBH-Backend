import chai from 'chai';
import chaiHttp from 'chai-http';
import { App } from '../app';

chai.use(chaiHttp);
chai.should();

describe('Test Login', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/session';

    it('should send parameters to : /api/session GET', (done) => {
        //@ts-ignore
        chai.request(host)
            .get(path)
            .set('content-type', 'application/json')
            .query({ username: 'huangj3', password: '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e' })
            //@ts-ignore
            .end((error, response, body) => {
                if (error) {
                    done(error);
                } else {
                    if (response.body.userInfo) {
                        done();
                    } else {
                        done('nmsl');
                    }
                }
            });
    });
});

describe('Test Login Fail', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/session';

    it('should send parameters to : /api/session GET', (done) => {
        //@ts-ignore
        chai.request(host)
            .get(path)
            .set('content-type', 'application/json')
            .query({ username: 'huangj3', password: '123123' })
            //@ts-ignore
            .end((error, response, body) => {
                if (error) {
                    done(error);
                } else {
                    if (response.body.userInfo) {
                        chai.expect(Object.keys(response.body).length).above(2, 'Should not contain userInfo and token.');
                        done();
                    } else {
                        done();
                    }
                }
            });
    });
});

describe('Test Get Home Fail', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/session';

    it('should send parameters to : /api/session GET', (done) => {
        //@ts-ignore
        chai.request(host)
            .get(path)
            .set('content-type', 'application/json')
            .query({ userId: 0 })
            //@ts-ignore
            .end((error, response, body) => {
                if (error) {
                    done(error);
                } else {
                    if (response.body.userInfo) {
                        chai.expect(Object.keys(response.body).length).below(1, 'Should not contain homes.');
                        done();
                    } else {
                        done();
                    }
                }
            });
    });
});
