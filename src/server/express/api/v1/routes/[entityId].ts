import { Error } from "@codrjs/models";
import { Operation } from "@dylanbulmer/openapi/types/Route";
import { R200, R401, R403, R500 } from "@dylanbulmer/openapi/classes/responses";
import verifyJWT from "@/server/express/middlewares/verifyJWT";
import { DatasetUtility } from "@/utils/DatasetUtility";

const EntityName = "Dataset";
const EntityType = "Dataset";

export const GET: Operation = [
  /* business middleware not expressible by OpenAPI documentation goes here */
  verifyJWT,
  (req, res) => {
    const util = new DatasetUtility();
    util
      .get(req.user, req.params.datasetId)
      .then(resp => res.status(200).json(resp))
      .catch((err: Error) => res.status(err.status).json(err));
  },
];

export const PATCH: Operation = [
  /* business middleware not expressible by OpenAPI documentation goes here */
  verifyJWT,
  (req, res) => {
    const util = new DatasetUtility();
    util
      .update(req.user, req.params.datasetId, req.body)
      .then(resp => res.status(200).json(resp))
      .catch((err: Error) => res.status(err.status).json(err));
  },
];

export const DELETE: Operation = [
  /* business middleware not expressible by OpenAPI documentation goes here */
  verifyJWT,
  (req, res) => {
    const util = new DatasetUtility();
    util
      .delete(req.user, req.params.datasetId)
      .then(resp => res.status(200).json(resp))
      .catch((err: Error) => res.status(err.status).json(err));
  },
];

// 3.0 specification
GET.apiDoc = {
  description: `Get ${EntityType} from database.`,
  tags: [`${EntityName} Management`],
  parameters: [
    {
      in: "path",
      name: `${
        EntityType.charAt(0).toLocaleLowerCase() + EntityType.slice(1)
      }Id`,
      schema: {
        type: "string",
      },
      required: true,
      description: `${EntityName} identifier`,
    },
  ],
  responses: {
    "200": {
      description: R200.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              details: {
                type: "object",
                properties: {
                  [EntityType.charAt(0).toLocaleLowerCase() +
                  EntityType.slice(1)]: {
                    $ref: `#/components/schemas/${EntityType}EntitySchema`,
                  },
                },
              },
              message: {
                type: "string",
                examples: ["OK"],
              },
            },
          },
        },
      },
    },
    "401": {
      description: R401.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              status: {
                type: "number",
                examples: [401],
              },
              message: {
                type: "string",
                examples: ["User is unauthorized."],
              },
              details: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
    "403": {
      description: R403.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              status: {
                type: "number",
                examples: [403],
              },
              message: {
                type: "string",
                examples: [
                  `User is forbidden from reading this ${EntityName}.`,
                ],
              },
              details: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
    "500": {
      description: R500.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              status: {
                type: "number",
                examples: [500],
              },
              message: {
                type: "string",
                examples: [
                  `An unexpected error occurred when trying to create a ${EntityName}.`,
                ],
              },
              details: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
};

// 3.0 specification
PATCH.apiDoc = {
  description: `Update ${EntityType} in database.`,
  tags: [`${EntityName} Management`],
  parameters: [
    {
      in: "path",
      name: `${
        EntityType.charAt(0).toLocaleLowerCase() + EntityType.slice(1)
      }Id`,
      schema: {
        type: "string",
      },
      required: true,
      description: `${EntityName} identifier`,
    },
  ],
  responses: {
    "200": {
      description: R200.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              details: {
                type: "object",
                properties: {
                  [EntityType.charAt(0).toLocaleLowerCase() +
                  EntityType.slice(1)]: {
                    $ref: `#/components/schemas/${EntityType}EntitySchema`,
                  },
                },
              },
              message: {
                type: "string",
                examples: ["OK"],
              },
            },
          },
        },
      },
    },
    "401": {
      description: R401.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              status: {
                type: "number",
                examples: [401],
              },
              message: {
                type: "string",
                examples: ["User is unauthorized."],
              },
              details: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
    "403": {
      description: R403.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              status: {
                type: "number",
                examples: [403],
              },
              message: {
                type: "string",
                examples: [
                  `User is forbidden from reading this ${EntityName}.`,
                ],
              },
              details: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
    "500": {
      description: R500.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              status: {
                type: "number",
                examples: [500],
              },
              message: {
                type: "string",
                examples: [
                  `An unexpected error occurred when trying to create a ${EntityName}.`,
                ],
              },
              details: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
};

// 3.0 specification
DELETE.apiDoc = {
  description: `Delete ${EntityType} from database. This action preforms a soft-delete.`,
  tags: [`${EntityName} Management`],
  parameters: [
    {
      in: "path",
      name: `${
        EntityType.charAt(0).toLocaleLowerCase() + EntityType.slice(1)
      }Id`,
      schema: {
        type: "string",
      },
      required: true,
      description: `${EntityName} identifier`,
    },
  ],
  responses: {
    "200": {
      description: R200.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              details: {
                type: "object",
                properties: {
                  [EntityType.charAt(0).toLocaleLowerCase() +
                  EntityType.slice(1)]: {
                    $ref: `#/components/schemas/${EntityType}EntitySchema`,
                  },
                },
              },
              message: {
                type: "string",
                examples: ["OK"],
              },
            },
          },
        },
      },
    },
    "401": {
      description: R401.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              status: {
                type: "number",
                examples: [401],
              },
              message: {
                type: "string",
                examples: ["User is unauthorized."],
              },
              details: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
    "403": {
      description: R403.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              status: {
                type: "number",
                examples: [403],
              },
              message: {
                type: "string",
                examples: [
                  `User is forbidden from reading this ${EntityName}.`,
                ],
              },
              details: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
    "500": {
      description: R500.description,
      content: {
        "application/json": {
          schema: {
            properties: {
              status: {
                type: "number",
                examples: [500],
              },
              message: {
                type: "string",
                examples: [
                  `An unexpected error occurred when trying to create a ${EntityName}.`,
                ],
              },
              details: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
};
