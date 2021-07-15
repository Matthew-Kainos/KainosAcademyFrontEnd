const chai = require('chai');

const validation = require('../../validation');

const { expect } = chai;

describe('Validation', () => {
  describe('validateNewRoleInput', async () => {
    it('Should successfuly return false if name length invalid', async () => {
      const newRoleDetails = {
        RoleName: 'abc',
        SpecSum: 'This is a valid spec summary',
        SpecLink: 'This is a valid link',
      };
      const results = validation.validateNewRoleInput(newRoleDetails);
      expect(results.error).equal(true);
      expect(results.message).equal('Invalid Role Name length');
    });
  });
});
