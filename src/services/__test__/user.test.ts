import { MockContext, Context, createMockContext } from './context'
import { PermissionType, UserService, UserType } from '../users.services'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = (mockCtx as unknown) as Context
})

describe("createUserAction() - unit", () => {

    const user = {
        "firstName": "Win",
        "lastName": "Test",
        "occupation": "software enginnering",
        "age": 30,
        "type": "External" as UserType,
        "permission": "Yes" as PermissionType
    }

    it("creates new user correctly", async () => {

        const created = await UserService.createUser(user);

        expect(created).toBe(true);
    });

    it("find and update new user", async () => {

        const [user] = await UserService.findAllUsers({
            start:0,
            limit:1
        })

        expect(await UserService.updateUser(user.id,{
            "firstName": "Win",
            "lastName": "Test",
            "occupation": "software enginnering",
            "age": 30
        })).toBe(true);
      });

  });