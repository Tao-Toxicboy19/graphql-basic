import { User } from "@prisma/client";
import { createUser, findAllUsers, findOneUser } from "../../controllers/users";

export const resolvers = {
    Query: {
        user: async (_: User, { id }: User) => {
            return await findOneUser(+id);
        },
        users: async () => findAllUsers()
    },
    Mutation: {
        createUser: async (_: User, { username, password }: User) => {
            return await createUser(username, password)
        },
    },
};