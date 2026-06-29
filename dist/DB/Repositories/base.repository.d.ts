import mongoose, { Model, Types } from "mongoose";
export default abstract class BaseRepository<T> {
    protected model: Model<T>;
    constructor(model: Model<T>);
    createDocument(data: Partial<T>): Promise<T>;
    findOneDocument(filters: mongoose.QueryFilter<T>, select?: {}): Promise<T | null>;
    findDocumentById(id: Types.ObjectId): Promise<T | null>;
    findDocuments(filters: any, options?: mongoose.QueryOptions): Promise<T[]>;
}
//# sourceMappingURL=base.repository.d.ts.map