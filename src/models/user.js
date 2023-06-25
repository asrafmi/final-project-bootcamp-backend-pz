const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Customer",
    enum: [
      "Customer",
      "Seller"
    ],
    require: true
  },
  cart: {
    type: Array,
    default: [],
  },
  address: {
    type: String,
  },
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
},
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Export the model
const User = mongoose.model("User", userSchema);

module.exports = User;
