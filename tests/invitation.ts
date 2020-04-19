import chai from 'chai';
import chaiHttp from 'chai-http';
import { App } from '../app';

chai.use(chaiHttp);
chai.should();

describe('Test Invitation Get All users', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/invitation/allusers';

    it('should send parameters to : /api/invitation/allusers GET', (done) => {
        //@ts-ignore
        chai.request(host)
            .get(path)
            .set('content-type', 'application/json')
            .query({})
            //@ts-ignore
            .end((error, response, body) => {
                if (error) {
                    done(error);
                } else {
                    if (response.body.length > 3) {
                        done();
                    } else {
                        chai.expect(Object.keys(response.body).length).above(3, 'Should have more than 3 users.');
                        done();
                    }
                }
            });
    });
});

describe('Test Invitation Get All users Fail', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/session/allusers';

    it('should send parameters to : /api/session/allusers GET', (done) => {
        //@ts-ignore
        chai.request(host)
            .get(path)
            .set('content-type', 'application/json')
            .query()
            //@ts-ignore
            .end((error, response, body) => {
                if (error) {
                    done(error);
                } else {
                    done();
                }
            });
    });
});
