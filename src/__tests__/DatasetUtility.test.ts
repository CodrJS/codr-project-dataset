import { Error, IDataset, Types as CodrTypes } from "@codrjs/models";
import { DatasetUtility } from "@/utils/DatasetUtility";
import { Types } from "mongoose";
import Dataset from "@/entities/Dataset";
import { randomUUID } from "crypto";
const Utility = new DatasetUtility();

type JwtPayload = CodrTypes.JwtPayload;

const testSystemUser: JwtPayload = {
  _id: new Types.ObjectId(0),
  type: "member",
  email: "system@codrjs.com",
  role: "codr:system",
  flags: {
    isDeleted: false,
    isDisabled: false,
    isAnonymous: false,
  },
  iss: "test-issuer.com",
  sub: new Types.ObjectId(0).toString(),
  jti: randomUUID(),
};

const testAdminUser: JwtPayload = {
  _id: new Types.ObjectId(1),
  type: "member",
  email: "admin@codrjs.com",
  role: "codr:admin",
  flags: {
    isDeleted: false,
    isDisabled: false,
    isAnonymous: false,
  },
  iss: "test-issuer.com",
  sub: new Types.ObjectId(1).toString(),
  jti: randomUUID(),
};

const testResearchUser: JwtPayload = {
  _id: new Types.ObjectId(2),
  type: "member",
  email: "researcher@codrjs.com",
  role: "codr:researcher",
  flags: {
    isDeleted: false,
    isDisabled: false,
    isAnonymous: false,
  },
  iss: "test-issuer.com",
  sub: new Types.ObjectId(2).toString(),
  jti: randomUUID(),
};

const testAnnotatorUser: JwtPayload = {
  _id: new Types.ObjectId(3),
  type: "member",
  email: "annotator@codrjs.com",
  role: "codr:annotator",
  flags: {
    isDeleted: false,
    isDisabled: false,
    isAnonymous: false,
  },
  iss: "test-issuer.com",
  sub: new Types.ObjectId(3).toString(),
  jti: randomUUID(),
};

const demoDataset: Omit<IDataset, "createdBy"> = {
  _id: new Types.ObjectId(4),
  name: "Demo Dataset",
  flags: {
    isDeleted: false,
    isPrivate: false,
  },
  projectId: new Types.ObjectId(0),
  members: [],
  teams: [],
};

describe("Dataset Utility: Create", () => {
  test("System can add dataset", async () => {
    // mock function returns once
    Dataset.create = jest
      .fn()
      .mockResolvedValueOnce({ ...demoDataset, createdBy: testSystemUser.sub });

    // run tests
    const dataset = await Utility.create(testSystemUser, demoDataset);
    expect(dataset.details.dataset.createdBy).toBe(testSystemUser.sub);
  });

  test("Admin can add dataset", async () => {
    // mock function returns once
    Dataset.create = jest
      .fn()
      .mockResolvedValueOnce({ ...demoDataset, createdBy: testAdminUser.sub });

    // run tests
    const dataset = await Utility.create(testAdminUser, demoDataset);
    expect(dataset.details.dataset.createdBy).toBe(testAdminUser.sub);
  });

  test("Researcher can add dataset", async () => {
    // mock function returns once
    Dataset.create = jest.fn().mockResolvedValueOnce({
      ...demoDataset,
      createdBy: testResearchUser.sub,
    });

    // run tests
    const dataset = await Utility.create(testResearchUser, demoDataset);
    expect(dataset.details.dataset.createdBy).toBe(testResearchUser.sub);
  });

  test("Annotator cannot add dataset", () => {
    // mock function returns once
    Dataset.create = jest.fn().mockResolvedValueOnce(demoDataset);

    // run tests
    expect(Utility.create(testAnnotatorUser, demoDataset)).rejects.toEqual(
      new Error({
        status: 403,
        message: "User is forbidden from creating datasets.",
      })
    );
  });
});

// describe("Dataset Utility: Read", () => {
//   test("System can read another dataset", async () => {
//     // mock function returns once
//     Dataset.findById = jest.fn().mockResolvedValueOnce(demoDataset);

//     // run tests
//     const dataset = await Utility.get(
//       testSystemUser,
//       demoNewUser._id as unknown as string
//     );
//     expect(dataset.details.dataset.email).toBe("adddataset@codrjs.com");
//   });

//   test("Admin can read another dataset", async () => {
//     // mock function returns once
//     Dataset.findById = jest.fn().mockResolvedValueOnce(demoDataset);

//     // run tests
//     const dataset = await Utility.get(
//       testAdminUser,
//       demoNewUser._id as unknown as string
//     );
//     expect(dataset.details.dataset.email).toBe("adddataset@codrjs.com");
//   });

//   test("Researcher can read own dataset", async () => {
//     // mock function returns once
//     User.findById = jest.fn().mockResolvedValueOnce(testResearchUser);

//     // run tests
//     const dataset = await Utility.get(
//       testResearchUser,
//       testResearchUser._id as unknown as string
//     );
//     expect(dataset.details.dataset.email).toBe("researcher@codrjs.com");
//   });

//   test("Annotator can read own dataset", async () => {
//     // mock function returns once
//     User.findById = jest.fn().mockResolvedValue(testAnnotatorUser);

//     // run tests
//     const dataset = await Utility.get(
//       testAnnotatorUser,
//       testAnnotatorUser._id as unknown as string
//     );
//     expect(dataset.details.dataset.email).toBe("annotator@codrjs.com");
//   });

//   test("Researcher cannot read another dataset", () => {
//     // mock function returns once
//     Dataset.findById = jest.fn().mockResolvedValueOnce(demoDataset);

//     // run tests
//     expect(
//       Utility.get(testResearchUser, demoNewUser._id as unknown as string)
//     ).rejects.toEqual(
//       new Error({
//         status: 403,
//         message: "User is forbidden from reading this dataset.",
//       })
//     );
//   });

//   test("Annotator cannot read another dataset", () => {
//     // mock function returns once
//     Dataset.findById = jest.fn().mockResolvedValueOnce(demoDataset);

//     // run tests
//     expect(
//       Utility.get(testAnnotatorUser, demoNewUser._id as unknown as string)
//     ).rejects.toEqual(
//       new Error({
//         status: 403,
//         message: "User is forbidden from reading this dataset.",
//       })
//     );
//   });
// });

// describe("Dataset Utility: Update", () => {
//   test("System can update another dataset", async () => {
//     // mock function returns once
//     Dataset.findById = jest.fn().mockResolvedValueOnce(demoDataset);
//     User.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(demoNewUser);

//     // run tests
//     const dataset = await Utility.update(
//       testSystemUser,
//       demoNewUser._id as unknown as string,
//       demoNewUser
//     );
//     expect(dataset.details.dataset.email).toBe("adddataset@codrjs.com");
//   });

//   test("System cannot update system dataset", async () => {
//     // mock function returns once
//     User.findById = jest.fn().mockResolvedValueOnce(testSystemUser);

//     // run tests
//     expect(
//       Utility.update(
//         testSystemUser,
//         testSystemUser._id as unknown as string,
//         testSystemUser
//       )
//     ).rejects.toEqual(
//       new Error({
//         status: 403,
//         message: "User is forbidden from updating this dataset.",
//       })
//     );
//   });

//   test("Admin can update another dataset", async () => {
//     // mock function returns once
//     User.findById = jest.fn().mockResolvedValueOnce(testAdminUser);
//     User.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(demoNewUser);

//     // run tests
//     const dataset = await Utility.update(
//       testAdminUser,
//       demoNewUser._id as unknown as string,
//       demoNewUser
//     );
//     expect(dataset.details.dataset.email).toBe("adddataset@codrjs.com");
//   });

//   test("Admin cannot update system dataset", async () => {
//     // mock function returns once
//     User.findById = jest.fn().mockResolvedValueOnce(testSystemUser);

//     // run tests
//     expect(
//       Utility.update(
//         testResearchUser,
//         testSystemUser._id as unknown as string,
//         testSystemUser
//       )
//     ).rejects.toEqual(
//       new Error({
//         status: 403,
//         message: "User is forbidden from updating this dataset.",
//       })
//     );
//   });

//   test("Researcher cannot update datasets", async () => {
//     // mock function returns once
//     Dataset.findById = jest.fn().mockResolvedValueOnce(demoDataset);

//     // run tests
//     expect(
//       Utility.update(
//         testResearchUser,
//         demoNewUser._id as unknown as string,
//         demoNewUser
//       )
//     ).rejects.toEqual(
//       new Error({
//         status: 403,
//         message: "User is forbidden from updating this dataset.",
//       })
//     );
//   });

//   test("Annotator cannot update datasets", async () => {
//     // mock function returns once
//     Dataset.findById = jest.fn().mockResolvedValueOnce(demoDataset);

//     // run tests
//     expect(
//       Utility.update(
//         testAnnotatorUser,
//         demoNewUser._id as unknown as string,
//         demoNewUser
//       )
//     ).rejects.toEqual(
//       new Error({
//         status: 403,
//         message: "User is forbidden from updating this dataset.",
//       })
//     );
//   });
// });

/**
 * @TODO Add test cases for (soft) deleting a dataset.
 */
