exports.validateNewRoleInput = (newRoleDetails) => {
  const response = { error: false, message: 'Valid Input' };
  if (newRoleDetails.RoleName.length < 3 || newRoleDetails.RoleName.length > 70) {
    response.error = true;
    response.message = 'Invalid Role Name length';
    return response;
  }
  if (newRoleDetails.SpecSum.length > 255 || newRoleDetails.SpecSum.length < 10) {
    response.error = true;
    response.message = 'Invalid Summary length. Maximum 255 characters. Mimimum 10';
    return response;
  }
  if (newRoleDetails.SpecLink.length > 30 || newRoleDetails.SpecLink.length < 5) {
    response.error = true;
    response.message = 'Invalid Link length. Maximum 30 characters. Mimimum 5';
    return response;
  }
  return response;
};

exports.validateNewCapabilityInput = (newCapabilityDetails) => {
  const response = { error: false, message: 'Valid Input' };
  if (newCapabilityDetails.Name.length < 2 || newCapabilityDetails.Name.length > 50) {
    response.error = true;
    response.message = 'Invalid Role Name length';
    return response;
  }
  return response;
};
