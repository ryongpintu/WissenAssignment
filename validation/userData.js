const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserDetail(data) {
  let errors = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
  data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.ssn = !isEmpty(data.ssn) ? data.ssn : '';
  data.telephone_number = !isEmpty(data.telephone_number) ? data.telephone_number : "";
    
  data.usertype = !isEmpty(data.usertype) ? data.usertype : '';

  
  if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = 'First Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = 'First Name field is required';
  }

  if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
    errors.last_name = 'First Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = 'Last Name field is required';
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = 'Address field is required';
  }

  
  if (Validator.isEmpty(data.ssn)) {
    errors.ssn = 'SSN field is required';
  }

  if (!Validator.isLength(data.ssn, { min: 6, max: 30 })) {
    errors.ssn = 'SSN must be at least 6 characters';
  }


 
    if (!Validator.isMobilePhone(data.telephone_number, ["en-IN"])) {
        errors.telephone_number = "Phone number is invalid";
    }

    if (Validator.isEmpty(data.telephone_number)) {
        errors.telephone_number = "Phone Number field is required";
    }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
