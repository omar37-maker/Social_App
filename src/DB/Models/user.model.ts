import mongoose, { Model} from "mongoose";
import { IUser } from "../../Common/Types/interface.types";


const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "First name must be at least 3 characters long"],
      maxLength: [50, "First name must be less than 50 characters long"],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Last name must be at least 3 characters long"],
      maxLength: [50, "Last name must be less than 50 characters long"],
    },
    email: {
      type: String,
      required: true,
      index: {
        name: "email_unique",
        unique: true,
      },
    },
    phoneNumber: String,
    age: Number,
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
  },
);

// Create Getter Virtual for fullName
userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

// Safty check for model`
const User:Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
