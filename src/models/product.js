const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    nama_produk: {
      type: String,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
    persediaan: {
      type: Number,
      required: true,
    },
    deskripsi: {
      type: String,
      required: true,
    },
    kategori: {
      type: String,
      require: true
    },
    terjual: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;