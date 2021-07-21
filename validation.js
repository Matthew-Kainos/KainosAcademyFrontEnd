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

exports.validateNewBandInput = (newBandDetails) => {
  const response = { error: false, message: 'Valid Input' };
  if (newBandDetails.name.length < 3 || newBandDetails.name.length > 30) {
    response.error = true;
    response.message = 'Invalid Band Name length';
    return response;
  }
  if (newBandDetails.responsiblities.length > 255 || newBandDetails.responsiblities.length < 10) {
    response.error = true;
    response.message = 'Invalid responsiblities length. Maximum 255 characters. Mimimum 10';
    return response;
  }
  return response;
};
