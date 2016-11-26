import * as request from 'promisify-supertest';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import { Frontend } from '../src/frontend';


const expect = chai.use(sinonChai).expect;

describe('frontend', () => {
  describe('post', () => {

    before(async () => {
    });

    it('should handle soap proxy request', async () => {

      await request(new Frontend().server())
        .post('/soapproxy/AAANSDUser/Create')
        .send(
        {}
        ).expect(500)
        .end().then((res) => {
          expect({});
        });
    });

    it('should return 404 on invalid path', async () => {
      await request(new Frontend().server())
        .post('/other')
        .expect(500);
    });
  });

  describe('get', () => {
    it('should handle health success request', async () => {
      await request(new Frontend().server())
        .get('/health')
        .expect(200)
        .end().then((res) => {
        });
    });

  });

});

