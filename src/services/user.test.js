const { fetch, getOne, create, login, update, destroy } = require("./user"); // Replace with the correct path to your module file
const User = require("../models/user");
// const { generateToken } = require("../../config/jwtToken");
const userFixtures = require("../bin/example/user.json");

// Mock the User model or schema
jest.mock("../models/user", () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

// Mock the generateToken function
jest.mock("../../config/jwtToken", () => ({
  generateToken: jest.fn(() => "mockedToken"),
}));

describe("fetch", () => {
  it("should return all users if data exists", async () => {
    const mockUsers = userFixtures;
    User.find.mockResolvedValueOnce(mockUsers);
    const res = await fetch();
    expect(User.find).toHaveBeenCalledWith({});
    expect(res).toEqual(mockUsers);
  });

  it("should return a message if no user data exists", async () => {
    User.find.mockResolvedValueOnce([]);
    const res = await fetch();
    expect(User.find).toHaveBeenCalledWith({});
    expect(res).toEqual({ message: "Data user kosong" });
  });
});

describe("getOne", () => {
  it("should return the user with the specified id", async () => {
    const mockUsers = userFixtures;
    User.findOne.mockResolvedValueOnce(mockUsers[0]);
    const res = await getOne(mockUsers[0].id);
    expect(User.findOne).toHaveBeenCalledWith({ _id: mockUsers[0].id });
    expect(res.id).toBe(mockUsers[0].id);
    expect(res.firstname).toBe(mockUsers[0].firstname);
    expect(res.lastname).toBe(mockUsers[0].lastname);
    expect(res.email).toBe(mockUsers[0].email);
    expect(res.mobile).toBe(mockUsers[0].mobile);
    expect(res.password).toBe(mockUsers[0].password);
    expect(res.role).toBe(mockUsers[0].role);
  });

  it("should throw an error if the user is not found", async () => {
    const mockUsers = userFixtures;
    User.findOne.mockResolvedValueOnce(null);
    await expect(getOne(mockUsers[0].id)).rejects.toThrow(
      "Data user tidak ditemukan"
    );
    expect(User.findOne).toHaveBeenCalledWith({ _id: mockUsers[0].id });
  });
});

describe("create", () => {
  it("should create a new user", async () => {
    const mockUsers = userFixtures;
    User.findOne.mockResolvedValueOnce(null);
    User.create.mockResolvedValueOnce(mockUsers[0]);
    const res = await create(mockUsers[0]);
    expect(User.findOne).toHaveBeenCalledWith({ email: mockUsers[0].email });
    expect(User.findOne).toHaveBeenCalledWith({ mobile: mockUsers[0].mobile });
    expect(User.create).toHaveBeenCalledWith(mockUsers[0]);
    expect(res.id).toBe(mockUsers[0].id);
    expect(res.firstname).toBe(mockUsers[0].firstname);
    expect(res.lastname).toBe(mockUsers[0].lastname);
    expect(res.email).toBe(mockUsers[0].email);
    expect(res.mobile).toBe(mockUsers[0].mobile);
    expect(res.password).toBe(mockUsers[0].password);
    expect(res.role).toBe(mockUsers[0].role);
  });

  it("should throw an error if the email is already registered", async () => {
    const mockUsers = userFixtures;
    User.findOne.mockResolvedValueOnce(mockUsers[0]);

    await expect(create(mockUsers[0])).rejects.toThrow("Email sudah terdaftar");
    expect(User.findOne).toHaveBeenCalledWith({ email: mockUsers[0].email });
  });

  it("should throw an error if the mobile phone is already registered", async () => {
    const mockUsers = userFixtures;
    User.findOne.mockResolvedValueOnce(null);
    User.findOne.mockResolvedValueOnce(mockUsers[0]);
    await expect(create(mockUsers[0])).rejects.toThrow(
      "Mobile phone sudah terdaftar"
    );
    expect(User.findOne).toHaveBeenCalledWith({ email: mockUsers[0].email });
    expect(User.findOne).toHaveBeenCalledWith({ mobile: mockUsers[0].mobile });
  });
});

describe("login", () => {
  it("should return a token if the email and password match", async () => {
    const user = {
      ...userFixtures,
      isPasswordMatched: jest.fn(() => true),
    };
    User.findOne.mockResolvedValueOnce(user);

    const res = await login(userFixtures[0]);
    expect(User.findOne).toHaveBeenCalledWith({ email: userFixtures[0].email });
    expect(user.isPasswordMatched).toHaveBeenCalledWith(
      userFixtures[0].password
    );
    expect(res).toEqual({ token: "mockedToken" });
  });

  it("should throw an error if the email and password do not match", async () => {
    const user = {
      ...userFixtures,
      isPasswordMatched: jest.fn(() => false),
    };
    User.findOne.mockResolvedValueOnce(user);
    await expect(login(userFixtures[0])).rejects.toThrow(
      "Email dan password user tidak benar"
    );
    expect(User.findOne).toHaveBeenCalledWith({ email: userFixtures[0].email });
    expect(user.isPasswordMatched).toHaveBeenCalledWith(
      userFixtures[0].password
    );
  });
});

describe("update", () => {
  it("should update a user and return the updated data", async () => {
    const mockUsers = userFixtures;
    User.findByIdAndUpdate.mockResolvedValueOnce(mockUsers[1]);
    const body = {
      firstname: mockUsers[1].firstname,
      lastname: mockUsers[1].lastname,
      email: mockUsers[1].email,
      mobile: mockUsers[1].mobile,
    };
    const res = await update(body, mockUsers[0].id);
    expect(res).toEqual(mockUsers[1]);
    expect(res.id).toBe(mockUsers[1].id);
    expect(res.firstname).toBe(mockUsers[1].firstname);
    expect(res.lastname).toBe(mockUsers[1].lastname);
    expect(res.email).toBe(mockUsers[1].email);
    expect(res.mobile).toBe(mockUsers[1].mobile);
    expect(res.password).toBe(mockUsers[1].password);
    expect(res.role).toBe(mockUsers[1].role);
  });

  it("should throw an error if the user is not found", async () => {
    const mockUsers = userFixtures;
    User.findByIdAndUpdate.mockResolvedValueOnce(null);
    const body = {
      firstname: mockUsers[1].firstname,
      lastname: mockUsers[1].lastname,
      email: mockUsers[1].email,
      mobile: mockUsers[1].mobile,
    };
    await expect(update(body, mockUsers[0].id)).rejects.toThrow("Data user tidak ditemukan");
  });
});

describe("destroy", () => {
  it("should delete the user with the specified id", async () => {
    const mockUsers = userFixtures;
    User.findByIdAndDelete.mockResolvedValueOnce(mockUsers[0]);
    const result = await destroy(mockUsers[0].id);
    expect(User.findByIdAndDelete).toHaveBeenCalledWith(mockUsers[0].id);
    expect(result).toEqual(mockUsers[0]);
  });

  it("should throw an error if the user is not found", async () => {
    const mockUsers = userFixtures;
    User.findByIdAndDelete.mockResolvedValueOnce(null);
    await expect(destroy(mockUsers[0].id)).rejects.toThrow("Data user tidak ditemukan");
    expect(User.findByIdAndDelete).toHaveBeenCalledWith(mockUsers[0].id);
  });
});
