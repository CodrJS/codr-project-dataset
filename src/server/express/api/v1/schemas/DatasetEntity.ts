import type { OpenAPIV3_1 } from "openapi-types";

const DatasetEntitySchema: OpenAPIV3_1.SchemaObject = {
  title: "Dataset Entity Schema",
  allOf: [{ $ref: "#/components/schemas/BaseEntitySchema" }],
  properties: {
    name: {
      type: "string",
    },
    members: {
      type: "array",
      items: {
        type: "object",
        properties: {
          $oid: { type: "string" },
        },
      },
    },
    teams: {
      type: "array",
      items: {
        type: "object",
        properties: {
          $oid: { type: "string" },
        },
      },
    },
    flags: {
      type: "object",
      properties: {
        isPrivate: {
          type: "boolean",
          default: false,
        },
        isDeleted: {
          type: "boolean",
          default: false,
        },
      },
    },
    createdBy: {
      type: "object",
      properties: {
        $oid: { type: "string" },
      },
    },
  },
};

export default HealthSchema;
