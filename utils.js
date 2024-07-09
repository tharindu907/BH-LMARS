const Counter = require('./models/counter.model')

const mobileNumberValidator = {
    validator: function(v) {
      return /^\d{10}$/.test(v);
    },
    message: props => `${props.value} is not a valid 10-digit mobile number!`
  };

  async function getNextSequenceValue(sequenceName) {
    const sequenceDocument = await Counter.findByIdAndUpdate(
        sequenceName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    return sequenceDocument.seq;
  }

function generateUsername(firstName, lastName, identifier){
  return `${firstName}${lastName[0]}${identifier}`;
}

function generatePassword(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

  module.exports = {
    mobileNumberValidator,
    getNextSequenceValue,
    generateUsername,
    generatePassword
  };