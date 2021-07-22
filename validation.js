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
  if (newBandDetails.responsibilities.length > 255 || newBandDetails.responsibilities.length < 10) {
    response.error = true;
    response.message = 'Invalid responsibilities length. Maximum 255 characters. Mimimum 10';
  }
  return response;
};

exports.validateNewCapabilityInput = (newCapabilityDetails) => {
  const response = { error: false, message: 'Valid Input' };
  if (newCapabilityDetails.Name.length < 2 || newCapabilityDetails.Name.length > 50) {
    response.error = true;
    response.message = 'Invalid Role Name length';
  }
  return response;
};

exports.validateNewFamilyInput = (newFamilyDetails) => {
  const response = { error: false, message: 'Valid Input' };
  if (newFamilyDetails.FamilyName.length < 3 || newFamilyDetails.FamilyName.length > 70) {
    response.error = true;
    response.message = 'Invalid Family Name length';
    return response;
  }
  if (newFamilyDetails.LeadName.length < 3 || newFamilyDetails.LeadName.length > 70) {
    response.error = true;
    response.message = 'Invalid Lead Name length';
    return response;
  }
  if (newFamilyDetails.LeadMessage.length > 250 || newFamilyDetails.LeadMessage.length < 5) {
    response.error = true;
    response.message = 'Invalid Lead Message length. Maximum 250 characters. Mimimum 5';
    return response;
  }
  if (newFamilyDetails.LeadImage.length > 400 || newFamilyDetails.LeadImage.length < 10) {
    response.error = true;
    response.message = 'Invalid Image URL length. Maximum 400 characters. Mimimum 10';
    return response;
  }
  return response;
};
