class Validator {
  constructor() {
    this.validations = [];
  }

  add(item) {
    this.validations.push(item);
  }

  required(message) {
    const validate = (data) => data !== undefined;
    this.add({ validate, message });
    return this;
  }

  min(n, message) {
    const validate = (data) => (typeof data === 'string' ? data.length >= n : data >= n);
    this.add({ validate, message });
    return this;
  }

  max(n, message) {
    const validate = (data) => (typeof data === 'string' ? data.length <= n : data <= n);
    this.add({ validate, message });
    return this;
  }

  regex(regex, message) {
    const validate = (data) => regex.test(data);
    this.add({ validate, message });
    return this;
  }

  integer(message) {
    const validate = (data) => Number.isInteger(data);
    this.add({ validate, message });
    return this;
  }

  email(message) {
    const validate = (data) =>
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data);
    this.add({ validate, message });
    return this;
  }

  exec(data) {
    const validation = this.validations.find((item) => !item.validate(data));
    if (validation) {
      return validation.message;
    }
  }
}

let getErrorMessage;
const resolver = (schema) => (data) => {
  const array = Object.entries(schema);
  for (let index = 0; index < array.length; index += 1) {
    const [key, validator] = array[index];
    const value = data && data[key];
    const errorMessage = getErrorMessage(validator, value);

    if (errorMessage) {
      return errorMessage;
    }
  }
};

getErrorMessage = (validator, value) =>
  (typeof validator === 'object' && !(validator instanceof Validator)
    ? resolver(validator)(value)
    : validator.exec(value));

module.exports = {
  resolver,
  V: () => new Validator(),
};
