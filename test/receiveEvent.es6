import { expect } from 'chai';
import WebSocket from 'ws';
import dotenv from 'dotenv';
import request from 'request';
dotenv.load();

let ws;

describe('receive notification', function () {

    before(function (done) {

        ws = new WebSocket(`${process.env.RTM_GATEWAY_WS}/?token=1111`);

        ws.on('open', done);

        ws.on('error', function(error) {
            console.log('Error: ', error);
            done(error);
        });

    });

    it('should send the message "hello!"', function (done) {

        this.timeout(1000);

        request(
            {
                method: 'POST',
                uri: `${process.env.RPC_GATEWAY_URL}/api/devices/1111/push`,
                json: {
                    message: "hello!"
                },
                headers: {
                    authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU3MTE3NDlmM2QwNWQyMDEwMGExNjhjMiIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNDYwNzYyMjE5fQ._Lcu7QPURQ24zsHkPKM-8TCO_gfVaDhN7R6zorbvfc0"
                }
            },
            (err, httpResponse, body) => {

                expect(body).equal("ok");

                done();

            }
        );

    });

    it('should receive the message "hello!"', function (done) {

        this.timeout(1000);

        ws.on('message', (data) => {

            expect(JSON.parse(data).message).equal("hello!");

            done();

        });

    });

    after(function (done) {

        ws.close();
        done();

    });

});
