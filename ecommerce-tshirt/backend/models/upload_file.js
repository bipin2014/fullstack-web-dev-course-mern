const mongoose = require('mongoose');

const uploadFileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    field_name: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      trim: true,
      required: true,
      default: 'image'
    },
    url: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UploadFile', uploadFileSchema);
