import { Types } from "@codrjs/models";
import { DatasetDocument } from "./Dataset";

/**
 * Assume that the JwtPayload has been verified.
 * Using the Jwt, grant permission to accessing the database documents.
 */

const permissions: Types.Permissions<DatasetDocument, "Dataset"> = {
  "codr:system": (_token, { can }) => {
    can("manage", "Dataset");
  },
  "codr:admin": (_token, { can }) => {
    can("manage", "Dataset");
  },
  "codr:researcher": (token, { can }) => {
    // can only manage it's own datasets and read public datasets.
    can("read", "Dataset", { "flags.isPrivate": { $eq: false } });
    can("manage", "Dataset", { createdBy: token.sub });
  },
  "codr:annotator": (_token, { can }) => {
    // can only read public datasets
    can("read", "Dataset", { "flags.isPrivate": { $eq: false } });
  },
};

const DatasetAbility = (token: Types.JwtPayload) =>
  Types.DefineAbility(token, permissions);
export default DatasetAbility;
