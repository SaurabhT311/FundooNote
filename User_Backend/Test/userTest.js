
let chai = require('chai');
let chaiHttp = require('chai-http');
const { response } = require('express');
const app = require('../server');
chai.should();
chai.use(chaiHttp);


describe("userTest", () => {


    //Negative Test case for Login

    it("In login information, empty email is passed, expecting status of 422", (done) => {
        let login = {
            email: "",
            password: "himanshu12"
        }
        chai
            .request(app)
            .post('/login')
            .send(login)
            .end((err, res) => {
                res.should.have.status(422);
                 res.body.should.be.a('object');
                done();
            })
    })

    //Negative test case for registration

    it("registration fields are empty  ", (done) => {
        let register = {
            "firstName": "",
            "lastName": "",
            "email": "",
            "mobile": "",
            "password": ""
        }
        chai.request(app)
            .post('/registration')
            .send(register)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                done();
            })
    })

    it("In registration, lastName is empty ", (done) => {
        let register = {
            "firstName": "Himanshu",
            "lastName": "",
            "email": "tripathishivam.311@gmail.com",
            "mobile": "8765145698",
            "password": "jnkafkjbf"
        }
        chai.request(app)
            .post('/registration')
            .send(register)
            .end((err, res) => {
                res.should.have.status(422);
                // res.body.should.be.a('object');
                done();
            })
    })



    it("In registration, Invalid email is sent ", (done) => {
        let register = {
            "firstName": "Himanshu",
            "lastName": "Gupta",
            "email": "himanshu421",
            "mobile": "8765145698",
            "password": "himanshu"
        }
        chai.request(app)
            .post('/registration')
            .send(register)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                done();
            })
    })


    it("In registration field, Firstname less than 3 characters ", (done) => {
        let register = {
            "firstName": "Hi",
            "lastName": "Gupta",
            "email": "tripathishivam.311@gmail.com",
            "mobile": "8765145698",
            "password": "himanshu"
        }
        chai.request(app)
            .post('/registration')
            .send(register)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.be.a('object');
                done();
            })
    })


    //Negative test cases for forgot password

    it("sending invalid email for forgot password and expecting a status of 422",(done)=>{
        let forgot={
            "email":""
        }
        chai.request(app)
        .post('/forgotpassword')
        .send(forgot)
        .end((err,res)=>{
            res.should.have.status(422);
            res.should.be.a('object');
            done();
        })
    })

    //Positive test cases for Login

    it(" login information should not be empty ", (done) => {
        let login = {
            "email": "tripathishivam.311@gmail.com",
            "password": "himanshu12"
        }
        chai
            .request(app)
            .post('/login')
            .send(login)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
    })


    //Positive test case for User Registration

    it("In registration field,all the data is proper filled ", (done) => {
        let register = {
            "firstName": "Saurav",
            "lastName": "Ganguly",
            "email": "saurav12@gmail.com",
            "mobile": "8765145698",
            "password": "saurav12"
        }
        chai.request(app)
            .post('/registration')
            .send(register)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
    })

    //Positive test case for forgot password

});

