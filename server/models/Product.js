const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default: [],
    },
    sold: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);



productSchema.index(
  {
    title: 'text',
    description: 'text',
  },
  { weights: { title: 5, description: 1 } }
);

module.exports = mongoose.model('Product', productSchema);
