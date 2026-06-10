"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    createDocument(data) {
        return this.model.create(data);
    }
    findOneDocument(filters, select = {}) {
        return this.model.findOne(filters).select(select).exec();
    }
    findDocumentById(id) {
        return this.model.findById(id).exec();
    }
    findDocuments(filters, options) {
        const _a = options || {}, { limit, skip } = _a, otherOptions = __rest(_a, ["limit", "skip"]);
        let query = this.model.find(filters, otherOptions);
        if (limit) {
            query = query.limit(limit);
        }
        if (skip) {
            query = query.skip(skip);
        }
        return query.exec();
    }
}
exports.default = BaseRepository;
//# sourceMappingURL=base.repository.js.map