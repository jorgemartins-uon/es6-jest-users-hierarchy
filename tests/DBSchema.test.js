import {DBSchema, getDescendants} from "../src/DBSchema";
import * as ROLE from '../src/models/__mocks__/role';
import * as USER from '../src/models/__mocks__/user';

describe('testing users and roles data manipulation', () => {
    let objDB;

    beforeEach(() => {
        objDB = new DBSchema()
    });

    afterEach(() => {
        objDB = undefined
    });

    test('create a valid role object', async () => {
        const mockData = await ROLE.createGoodData();
        expect(objDB.setRoles(mockData)).toEqual(true);
    });

    test('create an invalid role object', async () => {
        const mockData = await ROLE.createBadData();
        try {
            objDB.setRoles(mockData)
        } catch(e) {
            expect(e.code).toBe(102);
        }
    });

    test('create a valid user object', async () => {
        const mockData = await USER.createGoodData();
        expect(objDB.setUsers(mockData)).toEqual(true);
    });

    test('create an invalid user object', async () => {
        const mockData = await USER.createBadData();
        try {
            objDB.setUsers(mockData);
        } catch(e) {
            expect(e.code).toBe(104);
        }
    });

    test('get the correct descendants of a given role', async () => {
        DBSchema.rolesCollection = [];

        const mockRoles = await ROLE.createArrayData(),
              mockRole  = mockRoles.find(() => true);

        expect(getDescendants(mockRoles, mockRole)).toMatchSnapshot({});
    });

    test('get the correct subordinates of a given user', async () => {
        DBSchema.rolesCollection = [];
        DBSchema.usersCollection = [];

        const mockRoles = await ROLE.createArrayData(),
              mockUsers = await USER.createArrayData();
        
        objDB.setUsers(mockUsers);
        objDB.setRoles(mockRoles);
        
        expect(objDB.getSubordinates(3)).toMatchSnapshot({});
    });

});