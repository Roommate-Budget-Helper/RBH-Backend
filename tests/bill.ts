import chai from 'chai';
import chaiHttp from 'chai-http';
import { App } from '../app';

chai.use(chaiHttp);
chai.should();

describe('Test BILL Get bills by Id', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/bill/byhome';

    it('should send parameters to : /api/bill/byhome', (done) => {
        //@ts-ignore
        chai.request(host)
            .get(path)
            .set('content-type', 'application/json')
            .query({ homeId: 8 })
            //@ts-ignore
            .end((error, response, body) => {
                if (error) {
                    done(error);
                } else {
                    if (response.body.length > 1) {
                        done();
                    } else {
                        chai.expect(Object.keys(response.body).length).above(1, 'Should have at least one bill.');
                        done();
                    }
                }
            });
    });
});

describe('Test BILL Get bills by Id for houses without bill', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/bill/byhome';

    it('should send parameters to : /api/bill/byhome', (done) => {
        //@ts-ignore
        chai.request(host)
            .get(path)
            .set('content-type', 'application/json')
            .query({ homeId: 0 })
            //@ts-ignore
            .end((error, response, body) => {
                if (error) {
                    done(error);
                } else {
                    if (response.body.length < 1) {
                        done();
                    } else {
                        chai.expect(Object.keys(response.body).length).below(1, 'Should not have one bill.');
                        done();
                    }
                }
            });
    });
});
