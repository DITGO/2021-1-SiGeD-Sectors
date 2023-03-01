const validateSectorField = (field,fielName) => {
  if (!field) {
    return `invalid ${fielName}`;
  }
};

const validateSector = (name, description) => {
  const errors = [];

  const nameError = validateSectorField(name,'name');
  if (nameError) {
    errors.push(nameError);
  }

  const descriptionError = validateSectorField(description,'description');
  if (descriptionError) {
    errors.push(descriptionError);
  }

  return errors;
};

module.exports = { validateSector };
