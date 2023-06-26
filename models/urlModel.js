const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
      originalUrl: {
        type: String,
        required: true,
      },
      shortenedUrl: {
        type: String,
        unique: true,
      },
      customUrl: {
        type: String,
        unique: true,
        sparse: true,
      },
      qrCodeUrl: {
        type: String,
      },
      clicks: [
        {
          timestamp: {
            type: Date,
            default: Date.now,
          },
          referrer: {
            type: String,
          },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
});
module.exports  = mongoose.model('Urls', urlSchema);

