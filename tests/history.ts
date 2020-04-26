import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('Test HISTORY Get bills by Id', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/history';

    it('should send parameters to : /api/history', (done) => {
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
                    if (response.body.length >= 0) {
                        done();
                    } else {
                        chai.expect(Object.keys(response.body).length).above(-1, 'Should have at least one bill.');
                        done();
                    }
                }
            });
    });
});
