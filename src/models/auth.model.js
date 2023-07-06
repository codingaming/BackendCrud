import mongoose,{ Schema } from "mongoose";
const userSchema = new Schema(
  {
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: {type: String},
    firstName: {type: String},
    lastName: {type: String},
  },
  {
    timestamps: true,
  }
);

const AuthUser = mongoose.model("Users", userSchema);

export  {AuthUser};