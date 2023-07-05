const request = require('supertest')
const { connect } = require('./database')
const userModel = require('../models/userModel')
const app = require('../app');

describe('Auth: Signup', () => {
    let dbConnection;

    beforeAll(async () => {
        dbConnection = await connect()
    })

    afterEach(async () => {
        await dbConnection.cleanup()
    })

    afterAll(async () => {
        await dbConnection.disconnect()
    })

    it('should signup a user', async () => {
        const response = await request(app).post('/auth/signup')
        .set('content-type', 'application/json')
        .send({ 
            username: 'ande', 
            password: 'ande'
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('username', 'ande')      
    })


    it('should login a user', async () => {
        // create user in out db
        const user = await userModel.create({ username: 'ande', password: 'ande'});

        // login user
        const response = await request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({ 
            username: 'ande', 
            password: 'ande'
        });

        expect(response.status).toBe(401)  //unathorized 

    })
})