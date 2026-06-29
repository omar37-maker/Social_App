"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Types_1 = require("../../Common/Types");
const Services_1 = require("../../Common/Services");
const securityService = new Services_1.SecurityService();
const userSchema = new mongoose_1.default.Schema({
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
        enum: Object.values(Types_1.USER_ROLES),
        default: Types_1.USER_ROLES.USER,
    },
    gender: {
        type: String,
        enum: Object.values(Types_1.GENDER),
    },
    status: {
        type: String,
        enum: Object.values(Types_1.STATUS),
        default: Types_1.STATUS.ACTIVE,
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
        enum: Object.values(Types_1.PROVIDERS),
        default: Types_1.PROVIDERS.SYSTEM,
    },
    profilePicture: String,
    coverPicture: [String],
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
                enum: Object.values(Types_1.CHANNELS),
            },
        }
    ],
    workExperience: [
        {
            company: String,
            position: String,
            startDate: Date,
            endDate: Date,
            currentlyWorking: { type: Boolean, default: false },
        }
    ]
}, {
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
});
userSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
});
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("User before pre save", this);
        const isPasswordModified = this.isModified("password");
        const isPhoneNumberModified = this.isModified("phoneNumber");
        // console.log("Is password modified", isPasswordModified);
        // console.log("Is phone number modified", isPhoneNumberModified);
        if (isPasswordModified)
            this.password = yield securityService.hash(this.password);
        if (isPhoneNumberModified)
            this.phoneNumber = this.phoneNumber ? securityService.encrypt(this.phoneNumber) : this.phoneNumber;
        // console.log("user after prep save ", this);
    });
});
userSchema.post(["findOne", "find"], function (doc) {
    if (Array.isArray(doc)) {
        doc.forEach(user => {
            if (user.phoneNumber)
                user.phoneNumber = securityService.decrypt(user.phoneNumber);
        });
    }
    else {
        if (doc.phoneNumber)
            doc.phoneNumber = securityService.decrypt(doc.phoneNumber);
    }
});
const User = mongoose_1.default.models.User || mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map