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
            type: Number,
          },
        },
      ],
      createdAt: {
        type: Date,
      },

      user: 
      { type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}
      },
      { timestamps: true }
      );
module.exports  = mongoose.model('Urls', urlSchema);
