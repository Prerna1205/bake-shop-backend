import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;
const addressSchema = new Schema({
  address: { type: Array, required: true },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  }
});

const add = model("user_add", addressSchema);

export default add;
