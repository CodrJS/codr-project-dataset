import { subject } from "@casl/ability";
import {
  Dataset,
  IDataset,
  Utility,
  Error,
  Response,
  Types,
} from "@codrjs/models";
import MongoDataset, { DatasetDocument } from "../entities/Dataset";
import DatasetAbility from "../entities/Dataset.ability";

type JwtPayload = Types.JwtPayload;

export class DatasetUtility extends Utility {
  // an internal method for getting the desired document to check against permissions
  protected async _getDocument<T>(id: string) {
    try {
      return (await MongoDataset.findById(id)) as T;
    } catch (err) {
      throw new Error({
        status: 500,
        message: "Something went wrong when fetching dataset",
        details: {
          datasetId: id,
          error: err,
        },
      });
    }
  }

  async get(token: JwtPayload, id: string) {
    // get desired dataset document
    const dataset = await this._getDocument<DatasetDocument>(id);

    // if user and read the document, send it, else throw error
    if (DatasetAbility(token).can("read", subject("Dataset", dataset))) {
      return new Response({
        message: "OK",
        details: {
          dataset: new Dataset(dataset),
        },
      });
    } else {
      throw new Error({
        status: 403,
        message: "User is forbidden from reading this dataset.",
      });
    }
  }

  async create(token: JwtPayload, obj: Omit<IDataset, "createdBy">) {
    // if dataset can create datasets
    if (DatasetAbility(token).can("create", "Dataset")) {
      try {
        // create dataset
        const dataset = await MongoDataset.create({
          ...obj,
          createdBy: token.sub,
        });
        return new Response({
          message: "OK",
          details: {
            dataset: new Dataset(dataset),
          },
        });
      } catch (e) {
        throw new Error({
          status: 500,
          message:
            "An unexpected error occurred when trying to create a dataset.",
          details: e,
        });
      }
    } else {
      throw new Error({
        status: 403,
        message: "User is forbidden from creating datasets.",
      });
    }
  }

  async update(token: JwtPayload, id: string, obj: Partial<IDataset>) {
    // get desired dataset document
    const dataset = await this._getDocument<DatasetDocument>(id);

    // check permissions
    if (DatasetAbility(token).can("update", subject("Dataset", dataset))) {
      try {
        // update dataset.
        const dataset = (await MongoDataset.findByIdAndUpdate(id, obj, {
          returnDocument: "after",
        })) as DatasetDocument;

        // return true if succeeded, else throw error
        return new Response({
          message: "OK",
          details: {
            dataset: new Dataset(dataset),
          },
        });
      } catch (e) {
        throw new Error({
          status: 500,
          message:
            "An unexpected error occurred when trying to update a dataset.",
          details: e,
        });
      }
    } else {
      throw new Error({
        status: 403,
        message: "User is forbidden from updating this dataset.",
      });
    }
  }

  /**
   * @todo Hard or soft delete datasets?
   */
  async delete(_token: JwtPayload, _id: string) {
    throw new Error({
      status: 500,
      message: "Method not implemented.",
    });

    // expected return???
    return new Response({
      message: "OK",
      details: {
        dataset: undefined,
      },
    });
  }
}
