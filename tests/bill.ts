import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('Test BILL - Get bills by HomeId', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/bill/byhome';

    it('should send parameters to : /api/bill/byhome', (done) => {
        //@ts-ignore
        chai.request(host)
            .get(path)
            .set('content-type', 'application/json')
            .query({ homeId: 6 })
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

describe('Test BILL - Get bills by Id for houses without bill', () => {
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

describe('Test BILL - Get bills by user', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/bill/byuser';

    it('should send parameters to : /api/bill/byuser', (done) => {
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
                    done();
                }
            });
    });
});

describe('Test BILL - Get proof by id', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/bill/byuser';

    it('should send parameters to : /api/bill/byuser', (done) => {
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
                    done();
                }
            });
    });
});

describe('Test BILL - Get RecurrentBills by houseId', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/bill/recurrentbill';

    it('should send parameters to : /api/bill/recurrentbill', (done) => {
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
                        chai.expect(Object.keys(response.body).length).above(1, 'Should have at least one bill.');
                        done();
                    }
                }
            });
    });
});

describe('Test BILL - Get shareplan by houseId', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/bill/shareplan';

    it('should send parameters to : /api/bill/shareplan', (done) => {
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
                        chai.expect(Object.keys(response.body).length).above(1, 'Should have at least one bill.');
                        done();
                    }
                }
            });
    });
});

describe('Test BILL - Get history by userId', () => {
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
                    if (response.body.length >= 1) {
                        done();
                    } else {
                        chai.expect(Object.keys(response.body).length).above(1, 'Should have at least one bill.');
                        done();
                    }
                }
            });
    });
});

describe('Test BILL - Get balance by userName and houseId', () => {
    const host = 'https://roommate-budget-helper-api.herokuapp.com';
    const path = '/api/home/balance';

    it('should send parameters to : /api/home/balance', (done) => {
        //@ts-ignore
        chai.request(host)
            .get(path)
            .set('content-type', 'application/json')
            .query({ userName: 'lanxikk', houseId: 6 })
            //@ts-ignore
            .end((error, response, body) => {
                if (error) {
                    done(error);
                } else {
                    if (response.body.balance > -1) {
                        done();
                    } else {
                        chai.expect(Object.keys(response.body.balance)).above(-1, 'Should have positive balance.');
                        done();
                    }
                }
            });
    });
});
