import mongoose, { Model, Types } from "mongoose";

export default abstract class BaseRepository<T> {
  constructor(protected model: Model<T>) {}

  createDocument(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  findOneDocument(
    filters: mongoose.QueryFilter<T>,
    select = {},
  ): Promise<T | null> {
    return this.model.findOne(filters).select(select).exec();
  }

  findDocumentById(id: Types.ObjectId): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  findDocuments(
    filters: mongoose.QueryFilter<T>,
    options?: { limit?: number; skip?: number } & mongoose.QueryOptions,
  ): Promise<T[]> {
    const { limit, skip, ...otherOptions } = options || {};
    let query = this.model.find(filters, otherOptions);
    if (limit) {
      query = query.limit(limit);
    }
    if (skip) {
      query = query.skip(skip);
    }
    return query.exec();
  }

  //   updateDocument({ filters, data, options }) {
  //     return this.model.updateOne(filters, data, options);
  //   }

  //   updateWithFindOne({ filters, data, options }) {
  //     return this.model.findOneAndUpdate(filters, data, options);
  //   }

  //   updateWithFindById({ id, data, options }) {
  //     return this.model.findByIdAndUpdate(id, data, {
  //       ...options,
  //       validator: true,
  //     });
  //   }

  //   updateManyDocuments({ filters, data, options }) {
  //     return this.model.updateMany(filters, data, options);
  //   }

  //   deleteDocument({ filters }) {
  //     return this.model.deleteOne(filters);
  //   }

  //   deleteAll() {
  //     return this.model.deleteMany({});
  //   }

  //   deleteWithFindOne({ filters }) {
  //     return this.model.findOneAndDelete(filters);
  //   }

  //   // { new:true, session }
  //   deleteManyDocuments({ filters, options = {} }) {
  //     const { session, ...otherOptions } = options;
  //     const query = this.model.deleteMany(filters, otherOptions);
  //     if (session) {
  //       return query.session(session);
  //     }
  //     // this.model.deleteMany(filters, otherOptions).session(session);
  //     return query;
  //   }

  //   deleteWithFindById({ _id, options = {} }) {
  //     const { session, ...otherOptions } = options;
  //     const query = this.model.findByIdAndDelete(_id, otherOptions);
  //     if (session) {
  //       return query.session(session);
  //     }
  //     return query;
  //   }

  //   countDocuments(filters) {
  //     return this.model.countDocuments(filters);
  //   }
}
