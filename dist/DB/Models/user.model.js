"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
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
    phoneNumber: String,
    age: Number,
}, {
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
});
// Create Getter Virtual for fullName
userSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
});
// Safty check for model`
const User = mongoose_1.default.models.User || mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map