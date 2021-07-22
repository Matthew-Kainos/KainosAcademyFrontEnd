const chai = require('chai');
const sinon = require('sinon');

const addRoute = require('../../routes/add');
const postReq = require('../../routes/sendAxioRequests');

const req = {
  session: {
    isLoggedIn: '',
    isAdmin: '',
  },
};

const { expect } = chai;

describe('Add', () => {
  describe('processNewCapabilityPostRequest', async () => {
    it('Should successfuly return 404 and redirect to login if not logged in', async () => {
      const res = {
        status(x) { res.status = x; },
        redirect(x) { res.path = x; },
        send(x) { res.send = x; },
      };
      req.session.isLoggedIn = false;
      req.session.isAdmin = false;
      await addRoute.processNewCapabilityPostRequest(req, res);
      expect(res.status).to.equal(404);
      expect(res.path).to.equal('../');
    });
    it('Should successfuly return 404 and redirect to  home if not admin but logged in', async () => {
      const res = {
        status(x) { res.status = x; },
        redirect(x) { res.path = x; },
        send(x) { res.send = x; },
      };
      req.session.isLoggedIn = true;
      req.session.isAdmin = false;
      await addRoute.processNewCapabilityPostRequest(req, res);
      expect(res.status).to.equal(404);
      expect(res.path).to.equal('../home');
    });
    it('Should successfuly return 400 and redirect to add capability page if invaid input', async () => {
      const res = {
        status(x) { res.status = x; },
        redirect(x) { res.path = x; },
        send(x) { res.send = x; },
      };
      req.session.isLoggedIn = true;
      req.session.isAdmin = true;
      req.body = {
        Name: 'a',
      };
      await addRoute.processNewCapabilityPostRequest(req, res);
      expect(res.status).to.equal(400);
      expect(res.path).to.equal('../add/capability');
      expect(req.session.popupType).to.equal('error');
      expect(req.session.popupMessage).to.equal('Invalid Role Name length');
    });
    it('Should successfuly return 400 and redirect to add capability page if invaid trying to enter duplicate capability', async () => {
      const res = {
        status(x) { res.status = x; },
        redirect(x) { res.path = x; },
        send(x) { res.send = x; },
      };
      const sendCreateCapabilityPostRequestStub = sinon.stub(postReq, 'sendCreateCapabilityPostRequest');
      req.session.isLoggedIn = true;
      req.session.isAdmin = true;
      req.body = {
        Name: 'Engineering',
      };
      const data = {
        success: false,
        message: 'Duplicate Capability',
      };
      sendCreateCapabilityPostRequestStub.resolves({ data });
      await addRoute.processNewCapabilityPostRequest(req, res);
      expect(res.status).to.equal(400);
      expect(res.path).to.equal('../add/capability');
      expect(req.session.popupType).to.equal('error');
      expect(req.session.popupMessage).to.equal(data.message);
      sendCreateCapabilityPostRequestStub.restore();
    });
    it('Should successfuly return 200 and redirect to add capability page if valid input', async () => {
      const res = {
        status(x) { res.status = x; },
        redirect(x) { res.path = x; },
        send(x) { res.send = x; },
      };
      const sendCreateCapabilityPostRequestStub = sinon.stub(postReq, 'sendCreateCapabilityPostRequest');
      req.session.isLoggedIn = true;
      req.session.isAdmin = true;
      req.body = {
        Name: 'Unit Tester Capabality',
      };
      const data = {
        success: true,
        message: 'Successfully Created Unit Tester Capabality',
      };
      sendCreateCapabilityPostRequestStub.resolves({ data });
      await addRoute.processNewCapabilityPostRequest(req, res);
      expect(res.status).to.equal(200);
      expect(res.path).to.equal('../add/capability');
      expect(req.session.popupType).to.equal('success');
      expect(req.session.popupMessage).to.equal(data.message);
      sendCreateCapabilityPostRequestStub.restore();
    });
  });
  describe('processNewCapabilityGetRequest', async () => {
    it('Should successfuly return 404 and redirect to login if not logged in and trying to add new capability', async () => {
      const res = {
        status(x) { res.status = x; },
        redirect(x) { res.path = x; },
        send(x) { res.send = x; },
      };
      req.session.isLoggedIn = false;
      req.session.isAdmin = false;
      await addRoute.processNewCapabilityGetRequest(req, res);
      expect(res.status).to.equal(404);
      expect(res.path).to.equal('../');
    });
    it('Should successfuly return 404 and redirect to home if logged in but not admin and trying to add new capability', async () => {
      const res = {
        status(x) { res.status = x; },
        redirect(x) { res.path = x; },
        send(x) { res.send = x; },
      };
      req.session.isLoggedIn = true;
      req.session.isAdmin = false;
      await addRoute.processNewCapabilityGetRequest(req, res);
      expect(res.status).to.equal(404);
      expect(res.path).to.equal('../home');
    });
    it('Should successfuly return 200 and redirect to add capability page valid user', async () => {
      const res = {
        status(x) { res.status = x; },
        redirect(x) { res.path = x; },
        send(x) { res.send = x; },
        render(x) { res.render = x; },
      };
      req.session.isLoggedIn = true;
      req.session.isAdmin = true;
      await addRoute.processNewCapabilityGetRequest(req, res);
      expect(res.status).to.equal(200);
      expect(res.render).to.equal('pages/viewAdminAddCapability');
      expect(req.session.popupType).to.equal('');
      expect(req.session.popupMessage).to.equal('');
    });
  });
});
