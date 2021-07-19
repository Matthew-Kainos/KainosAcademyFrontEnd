/* eslint-disable import/no-unresolved */
const chai = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');

const { checkIfPasswordValid } = require('../../app');
const app = require('../../app');

const { expect } = chai;

describe('App', () => {
  describe('checkIfPasswordValid', async () => {
    it('Should successfuly return true if the password is valid', async () => {
      const password = 'secret';
      const hashedPw = await bcrypt.hash(password, 10);
      const postStub = sinon.stub(app, 'getPassword');
      postStub.resolves({ data: hashedPw });
      const result = await checkIfPasswordValid('abc', password);
      expect(result).equal(true);
      postStub.restore();
    });
    it('Should successfuly return false if the password is not valid', async () => {
      const password = 'secret1';
      const hashedPw = await bcrypt.hash('secret2', 10);
      const postStub = sinon.stub(app, 'getPassword');
      postStub.resolves({ data: hashedPw });
      const result = await checkIfPasswordValid('abc', password);
      expect(result).equal(false);
      postStub.restore();
    });
  });
  describe('initaliseSessionPermissions', async () => {
    it('Should successfuly initalise admin session', async () => {
      const checkIfAdminStub = sinon.stub(app, 'checkIfAdmin');
      checkIfAdminStub.resolves({ data: true });
      const req = { session: {} };
      const username = 'MyName';
      await app.initaliseSessionPermissions(req, username);
      expect(req.session.userID).equal(username);
      expect(req.session.isLoggedIn).equal(true);
      expect(req.session.isAdmin).equal(true);
      checkIfAdminStub.restore();
    });
    it('Should successfuly initalise employee session', async () => {
      const checkIfAdminStub = sinon.stub(app, 'checkIfAdmin');
      checkIfAdminStub.resolves({ data: false });
      const req = { session: {} };
      const username = 'MyName';
      await app.initaliseSessionPermissions(req, username);
      expect(req.session.userID).equal(username);
      expect(req.session.isLoggedIn).equal(true);
      expect(req.session.isAdmin).equal(false);
      checkIfAdminStub.restore();
    });
  });
});
