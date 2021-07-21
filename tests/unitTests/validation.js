const chai = require('chai');

const validation = require('../../validation');

const { expect } = chai;

describe('Validation', () => {
  describe('validateNewRoleInput', async () => {
    it('Should successfuly return true if input data valid', async () => {
      const newRoleDetails = {
        RoleName: 'This is a valid name',
        SpecSum: 'This is a valid spec summary',
        SpecLink: 'This is a valid link',
      };
      const results = validation.validateNewRoleInput(newRoleDetails);
      expect(results.error).equal(false);
      expect(results.message).equal('Valid Input');
    });
    it('Should successfuly return false if name length invalid', async () => {
      const newRoleDetails = {
        RoleName: 'ab',
        SpecSum: 'This is a valid spec summary',
        SpecLink: 'This is a valid link',
      };
      const results = validation.validateNewRoleInput(newRoleDetails);
      expect(results.error).equal(true);
      expect(results.message).equal('Invalid Role Name length');
    });
    it('Should successfuly return false if spec length invalid', async () => {
      const newRoleDetails = {
        RoleName: 'This is a valid name',
        SpecSum: 'abc',
        SpecLink: 'This is a valid link',
      };
      const results = validation.validateNewRoleInput(newRoleDetails);
      expect(results.error).equal(true);
      expect(results.message).equal('Invalid Summary length. Maximum 255 characters. Mimimum 10');
    });
    it('Should successfuly return false if spec link invalid', async () => {
      const newRoleDetails = {
        RoleName: 'This is a valid spec number',
        SpecSum: 'This is a valid spec number',
        SpecLink: 'ab',
      };
      const results = validation.validateNewRoleInput(newRoleDetails);
      expect(results.error).equal(true);
      expect(results.message).equal('Invalid Link length. Maximum 30 characters. Mimimum 5');
    });
  });

  describe('validateNewBandInput', async () => {
    it('Should successfuly return true if input data valid', async () => {
      const newBandDetails = {
        name: 'This is a valid name',
        responsiblities: 'This is a valid responsiblities',
      };
      const results = validation.validateNewBandInput(newBandDetails);
      expect(results.error).equal(false);
      expect(results.message).equal('Valid Input');
    });
    it('Should successfuly return false if name length invalid', async () => {
      const newBandDetails = {
        name: 'a',
        responsiblities: 'This is a valid responsiblities',
      };
      const results = validation.validateNewBandInput(newBandDetails);
      expect(results.error).equal(true);
      expect(results.message).equal('Invalid Band Name length');
    });
    it('Should successfuly return false if responsibilities invalid', async () => {
      const newBandDetails = {
        name: 'This is a valid name',
        responsiblities: 'a',
      };
      const results = validation.validateNewBandInput(newBandDetails);
      expect(results.error).equal(true);
      expect(results.message).equal('Invalid responsiblities length. Maximum 255 characters. Mimimum 10');
    });
  });
});
