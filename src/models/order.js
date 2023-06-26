const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
    {
        product: [
            {
                nama_produk: String,
                harga: Number,
                persediaan: Number,
                deskripsi: String,
                kategori: String,
                terjual: Number,
                rating: mongoose.Decimal128,
            },
        ],
        count: Number,
        price: Number,
        orderBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model('Cart', cartSchema);


//Export the model
module.exports = Cart
