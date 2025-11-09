const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    fullname: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 80
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      maxLength: 100,
      trim: true,
      validate: {
        validator: (value) => {
          const regex = /^[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;
          return regex.test(value);
        },
        message: "Formato de email inválido"
      }
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 100,
      trim: true
    },
    bornDate: {
      type: Date,
      required: true
    },
    location: {
      type: String
    },
    sala: {
      type: String,
      required: true,
      enum: ["Amarilla", "Verde", "Roja", "Azul", "Multicolor"]
    },
    Antiguedad: {
      type: Number,
      min: 0,
      max: 50
    },
    role: {
      type: String,
      default: "CLIENT_ROLE",
      enum: ["ADMIN_ROLE", "CLIENT_ROLE", "USER_ROLE"]
    }
  });
  
module.exports = mongoose.model("User", userSchema)