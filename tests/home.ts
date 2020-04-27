import chai from 'chai';
import chaiHttp from 'chai-http';
import { App } from '../app';

chai.use(chaiHttp);
chai.should();

describe('Test Get Home', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/home';

    it('should send parameters to : /api/home GET', (done) => {
        //@ts-ignore
        chai.request(host)
            .get(path)
            .set('content-type', 'application/json')
            .query({ userId: 1 })
            //@ts-ignore
            .end((error, response, body) => {
                if (error) {
                    done(error);
                } else {
                    if (response.body.length >= 1) {
                        done();
                    } else {
                        done('233333');
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

describe('Test Get Home Detail by houseId', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/home/detail';

    it('should send parameters to : /api/home/detail GET', (done) => {
        //@ts-ignore
        chai.request(host)
            .get(path)
            .set('content-type', 'application/json')
            .query({ houseId: 6 })
            //@ts-ignore
            .end((error, response, body) => {
                if (error) {
                    done(error);
                } else {
                    if (response.body.length >= 1) {
                        done();
                    } else {
                        done('233333');
                    }
                }
            });
    });
});

describe('Test Fail Get Home Detail by houseId', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/home/detail';

    it('should send parameters to : /api/home/detail GET', (done) => {
        //@ts-ignore
        chai.request(host)
            .get(path)
            .set('content-type', 'application/json')
            .query({ houseId: -1 })
            //@ts-ignore
            .end((error, response, body) => {
                if (error) {
                    done(error);
                } else {
                    if (response.body.length <= 1) {
                        done();
                    } else {
                        done('233333');
                    }
                }
            });
    });
});
