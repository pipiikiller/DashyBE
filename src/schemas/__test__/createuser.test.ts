import { AddUserRequestSchema } from '../users/user.requests.schema'

describe('Declaration schema', () => {
    test('valid data', () => {
        const value = AddUserRequestSchema.validate({
            "firstName": "Win",
            "lastName": "Test",
            "occupation": "software enginnering",
            "age": 30,
            "type": "Internal",
            "permission": "Yes"
        })

        expect(value).toEqual({
            value: {
                "firstName": "Win",
                "lastName": "Test",
                "occupation": "software enginnering",
                "age": 30,
                "type": "Internal",
                "permission": "Yes"

            }
        })
    })

    test('first name and last name missing data', () => {
        const value = AddUserRequestSchema.validate({
            "lastName": "Han",
            "occupation": "software enginnering",
            "age": 30,
            "type": "Internal",
            "permission": "Yes"
        })

        expect(value).toHaveProperty("error")
        expect(value.error?.message).toEqual('\"firstName\" is required')

        const value1 = AddUserRequestSchema.validate({
            "firstName": "Win",
            "occupation": "software enginnering",
            "age": 30,
            "type": "Internal",
            "permission": "Yes"
        })

        expect(value1).toHaveProperty("error")
        expect(value1.error?.message).toEqual('\"lastName\" is required')
    })

    test('age not less than 0 and more than 120', () => {
        const value = AddUserRequestSchema.validate({
            "firstName": "Win",
            "lastName": "Han",
            "occupation": "software enginnering",
            "age": -1,
            "type": "Internal",
            "permission": "Yes"
        })

        expect(value).toHaveProperty("error")
        expect(value.error?.message).toEqual('\"age\" must be greater than or equal to 0')

        const value1 = AddUserRequestSchema.validate({
            "firstName": "Win",
            "lastName": "Han",
            "occupation": "software enginnering",
            "age": 121,
            "type": "Internal",
            "permission": "Yes"
        })

        expect(value1).toHaveProperty("error")
        expect(value1.error?.message).toEqual('\"age\" must be less than or equal to 120')
    })

    test('type must be Internal or External', () => {
        const value = AddUserRequestSchema.validate({
            "firstName": "Win",
            "lastName": "Han",
            "occupation": "software enginnering",
            "age": 29,
            "type": "Internall",
            "permission": "Yes"
        })

        expect(value).toHaveProperty("error")
        console.log(value.error.message)
        expect(value.error?.message).toEqual('\"type\" must be one of [Internal, External]')

    })

    test('permission must be Yes or No', () => {
        const value = AddUserRequestSchema.validate({
            "firstName": "Win",
            "lastName": "Han",
            "occupation": "software enginnering",
            "age": 29,
            "type": "Internal",
            "permission": "Both"
        })

        expect(value).toHaveProperty("error")
        console.log(value.error.message)
        expect(value.error?.message).toEqual('\"permission\" must be one of [Yes, No]')

    })

})