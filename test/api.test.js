const request = require('supertest');
const app = require('../server');

//Testing get a user endpoint
describe('/GET /users/:id', () => {
    it('respond with json containing a user, if doesnt exist it will add it in database', done => {
        request(app)
        .get('/api/users/1')
        .expect(200, done);
    })
})

describe('/GET /users/:id', () => {
    it('respond with json containing a list of many users, if dont exist it will add in database', done => {
        request(app)
        .get('/api/users/1,2,3')
        .expect(200, done);
    })
})

describe('/POST /users', () => {
    it('respond with 201 created if does not exist in database', done => {
        const data = {
            first_name: "Fernan",
            last_name: "Solis",
            email: "fernan.solis@gmail.com",
            company: "Liverpool",
            url: "liverpool.com.mx",
            text: "Palacio de hierro"
        }
        request(app)
        .post('/api/users')
        .send(data)
        .set('Accept', 'application/json')
        .expect(201)
        .end(err => {
            if(err) return done(err);
            done();
        })
    })
})

describe('/POST /users', () => {
    it('respond with 400 because already exists in database', done => {
        const data = {
            first_name: "Fernan",
            last_name: "Solis",
            email: "fernan.solis@gmail.com",
            company: "Liverpool",
            url: "liverpool.com.mx",
            text: "Palacio de hierro"
        }
        request(app)
        .post('/api/users')
        .send(data)
        .set('Accept', 'application/json')
        .expect(400)
        .end(err => {
            if(err) return done(err);
            done();
        })
    })
})

describe('/PUT /users/:id', () => {
    it('respond with 200 and change in first name', done => {
        const data = {
            first_name: "Fernan_edit",
            last_name: "Solis",
            email: "fernan.solis@gmail.com",
            company: "Liverpool",
            url: "liverpool.com.mx",
            text: "Palacio de hierro"
        }
        request(app)
        .put('/api/users/4')
        .send(data)
        .set('Accept', 'application/json')
        .expect(200)
        .end(err => {
            if(err) return done(err);
            done();
        })
    })
})

describe('/DELETE /users/:id', () => {
    it('respond with 200 and delete user 4', done => {
        request(app)
        .delete('/api/users/4')
        .expect(200)
        .end(err => {
            if(err) return done(err);
            done();
        })
    })
})

describe('/DELETE /users/:id', () => {
    it('respond with 404 because user does not exist in database', done => {
        request(app)
        .delete('/api/users/4')
        .expect(404)
        .end(err => {
            if(err) return done(err);
            done();
        })
    })
})
