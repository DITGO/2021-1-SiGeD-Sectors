const mongoose = require('mongoose');

const sectorSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: [true],
  },
  description: {
    type: String,
    require: [true],
  },
  createdAt: {
    type: Date,
    require: [true],
  },
  updatedAt: {
    type: Date,
    require: [true],
  },
  status: {
    type: String,
    require: [true],
    default: 'ativado',
  },
});

module.exports = mongoose.model('Sector', sectorSchema);
