const Counter = require('./models/counter.model')
const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');

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

async function generateQRCodeWithText(id, name) {
  const qrCodeDataURL = await QRCode.toDataURL(id, { width: 500, margin: 2 });
  const qrCodeImage = await loadImage(qrCodeDataURL);
  
  const width = Math.max(qrCodeImage.width, 300);
  const height = qrCodeImage.height + 120;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'black';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`BRIGHT HORIZON EDUCATION CENTER`, width / 2, 40);
  const textWidth = ctx.measureText(`BRIGHT HORIZON EDUCATION CENTER`).width;
  ctx.beginPath();
  ctx.moveTo((width - textWidth) / 2, 45);
  ctx.lineTo((width + textWidth) / 2, 45);
  ctx.strokeStyle = 'black';
  ctx.stroke();

  ctx.drawImage(qrCodeImage, (width - qrCodeImage.width) / 2, 70);

  ctx.font = 'bold 16px Arial';
  ctx.fillText(`student_name: ${name.toUpperCase()}`, width/2, 90);
  ctx.fillText(`student_ID: ${id}`, width/2, 560);

  return canvas.toDataURL();
}

module.exports = {
  generateQRCodeWithText,
  mobileNumberValidator,
  getNextSequenceValue,
  generateUsername,
  generatePassword
};