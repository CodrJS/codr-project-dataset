import { IDataset, MongooseUtil } from "@codrjs/models";
import { model, Schema, SchemaTypes } from "mongoose";
import {
  AccessibleFieldsModel,
  accessibleFieldsPlugin,
  AccessibleModel,
  accessibleRecordsPlugin,
} from "@casl/mongoose";

export type DatasetDocument = IDataset & AccessibleFieldsModel<IDataset>;
const DatasetSchema = new Schema<DatasetDocument>(
  {
    name: { type: String, required: true },
    flags: {
      required: true,
      ...MongooseUtil.Flags,
    },
    projectId: {
      type: SchemaTypes.ObjectId,
      ref: "Project",
      index: true,
    },
    members: {
      type: [SchemaTypes.ObjectId],
      ref: "User",
      index: true,
    },
    teams: {
      type: [SchemaTypes.ObjectId],
      ref: "UserGroup",
      index: true,
    },
    createdAt: { type: String },
    updatedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

// exports Dataset model.
DatasetSchema.plugin(accessibleFieldsPlugin);
DatasetSchema.plugin(accessibleRecordsPlugin);
const Dataset = model<IDataset, AccessibleModel<DatasetDocument>>(
  "Dataset",
  DatasetSchema
);
export default Dataset;
