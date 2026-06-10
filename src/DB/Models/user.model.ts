import mongoose, { Model} from "mongoose";
import { IUser } from "../../Common/Types/interface.types";
import { CHANNELS, GENDER, PROVIDERS, STATUS, USER_ROLES } from "../../Common/Types";
import {SecurityService} from '../../Common/Services';

const securityService = new SecurityService()
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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    gender: {
      type: String,
      enum: Object.values(GENDER),
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.ACTIVE,
    },
    phoneNumber: {
      type: String,
      index: {
        name: "idx_phoneNumber_unique",
        unique: true,
      }
    },
    age: Number,
    googleSub: {
      type: String,
      index: {
        name: "idx_googleSub_unique",
        unique: true,
      },
    },
    provider: {
      type: String,
      enum: Object.values(PROVIDERS),
      default: PROVIDERS.SYSTEM,
    },
    profilePicture: String,
    coverPicture: String,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    OTPs: [
      {
        value: {
          type: String,
          required: true,
        },
        expireAt: {
          type: Date,
          default: Date.now() + 5 * 60 * 1000,
        },
        channel: {
          type: String,
          enum: Object.values(CHANNELS),
        },
      }],
    workExperience: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        currentlyWorking: {type: Boolean, default: false},
      }
      ]
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
  },
);

userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

userSchema.pre("save", async function () { 

  // console.log("User before pre save", this);
  
  const isPasswordModified = this.isModified("password")
  const isPhoneNumberModified = this.isModified("phoneNumber")

  // console.log("Is password modified", isPasswordModified);
  // console.log("Is phone number modified", isPhoneNumberModified);
  

  if (isPasswordModified) this.password = await securityService.hash(this.password)
  if(isPhoneNumberModified) this.phoneNumber = this.phoneNumber ? securityService.encrypt(this.phoneNumber) : this.phoneNumber
  
  // console.log("user after prep save ", this);
  
})

userSchema.post(["findOne", "find"], function (doc) { 
  

  if (Array.isArray(doc)) {
    doc.forEach(user => {
      if (user.phoneNumber) user.phoneNumber = securityService.decrypt(user.phoneNumber)
    })
  } else { 
    if(doc.phoneNumber) doc.phoneNumber = securityService.decrypt(doc.phoneNumber)
  }
    
})

const User:Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
