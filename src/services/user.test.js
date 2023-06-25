const userSvc = require('./user');
const User = require('../models/user');
const userFixtures = require('../bin/example/user.json');

describe('.fetch()', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test('fetch users', async () => {
        jest.spyOn(User, 'find').mockReturnValue(userFixtures);
        const res = await userSvc.fetch();
        expect(res.length > 0).toBeTruthy();
    });
    test('fetch empty users', async () => {
        jest.spyOn(User, 'find').mockReturnValue([]);
        const res = await userSvc.fetch();
        expect(res.length > 0).toBeFalsy();
        expect(res.message).toBe('Data kosong');
    });
});

describe('.getOne()', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test('fetch one User', async () => {
        jest.spyOn(User, 'findOne').mockReturnValue(userFixtures[0]);
        const res = await userSvc.getOne();
        expect(res.firstname).toBe(userFixtures[0].firstname);
        expect(res.lastname).toBe(userFixtures[0].lastname);
        expect(res.email).toBe(userFixtures[0].email);
        expect(res.mobile).toBe(userFixtures[0].mobile);
        expect(res.password).toBe(userFixtures[0].password);
        expect(res.role).toBe(userFixtures[0].role);
    });
});

describe('.update()', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test('update one user', async () => {
        jest.spyOn(User, 'insertMany').mockReturnValue(userFixtures[0]);
        const createUser = await userSvc.create();
        expect(createUser.firstname).toBe(userFixtures[0].firstname);
        expect(createUser.lastname).toBe(userFixtures[0].lastname);
        expect(createUser.email).toBe(userFixtures[0].email);
        expect(createUser.mobile).toBe(userFixtures[0].mobile);
        expect(createUser.password).toBe(userFixtures[0].password);
        expect(createUser.role).toBe(userFixtures[0].role);

        jest.spyOn(User, 'findOneAndUpdate').mockReturnValue(userFixtures[1], userFixtures[0].id);
        const updatedUser = await userSvc.update();
        expect(updatedUser.firstname).toBe(userFixtures[1].firstname);
        expect(updatedUser.lastname).toBe(userFixtures[1].lastname);
        expect(updatedUser.email).toBe(userFixtures[1].email);
        expect(updatedUser.mobile).toBe(userFixtures[1].mobile);
        expect(updatedUser.password).toBe(userFixtures[1].password);
        expect(updatedUser.role).toBe(userFixtures[1].role);
    });
});

describe('.detroy()', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test('delete one user', async () => {
        jest.spyOn(User, 'findOneAndDelete').mockReturnValue(userFixtures[2]);
        const deleteUser = await userSvc.destroy(userFixtures[2].id);
        expect(deleteUser).toBeTruthy()
    });
});