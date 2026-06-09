"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHANNELS = exports.PROVIDERS = exports.TOKEN_TYPES = exports.STATUS = exports.GENDER = exports.USER_ROLES = void 0;
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES["USER"] = "user";
    USER_ROLES["ADMIN"] = "admin";
})(USER_ROLES || (exports.USER_ROLES = USER_ROLES = {}));
var GENDER;
(function (GENDER) {
    GENDER["MALE"] = "male";
    GENDER["FEMALE"] = "female";
})(GENDER || (exports.GENDER = GENDER = {}));
;
var STATUS;
(function (STATUS) {
    STATUS["ACTIVE"] = "active";
    STATUS["INACTIVE"] = "inactive";
})(STATUS || (exports.STATUS = STATUS = {}));
;
var TOKEN_TYPES;
(function (TOKEN_TYPES) {
    TOKEN_TYPES["ACCESS"] = "access";
    TOKEN_TYPES["REFRESH"] = "refresh";
})(TOKEN_TYPES || (exports.TOKEN_TYPES = TOKEN_TYPES = {}));
var PROVIDERS;
(function (PROVIDERS) {
    PROVIDERS["GOOGLE"] = "google";
    PROVIDERS["SYSTEM"] = "system";
    PROVIDERS["FACEBOOK"] = "facebook";
})(PROVIDERS || (exports.PROVIDERS = PROVIDERS = {}));
;
// export const fileExtensions {
//   image = ["jpg", "jpeg", "png", "gif"],
//   video = ["mp4", "avi", "mkv", "mov"],
//   application = ["pdf", "doc", "docx"],
// };
var CHANNELS;
(function (CHANNELS) {
    CHANNELS["EMAIL"] = "email";
    CHANNELS["PHONE"] = "phone";
})(CHANNELS || (exports.CHANNELS = CHANNELS = {}));
;
//# sourceMappingURL=enum.type.js.map