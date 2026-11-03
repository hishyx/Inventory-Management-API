import { Schema, model as createModel, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "staff", "manager"],
      required: true,
    },
  },
  { timestamps: true },
);

export type UserType = InferSchemaType<typeof userSchema>;

const User = createModel("user", userSchema);

export default User;
