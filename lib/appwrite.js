import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
import { config } from './config';
// export const config = {
//     endpoint: 'https://cloud.appwrite.io/v1',
//     platform: 'com.amrit.aora',
//     projectId: '6735ded6002f4bcc61eb',
//     databaseId: '6735e13d002a15a45525',
//     userCollectionId: '6735e1980022a75a9427',
//     videoCollectionId: '6735e1cb0006d71c6959',
//     storageId: '6735e4e30017da6ca923',
// }

const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password);
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )
        return newUser;
    } catch (error) {
        console.log(error.message);
        throw new Error;
    }
}

export const signIn = async (email, password) => {
    try {
        const currentSession = await account.getSession('current').catch(() => null);

        if (currentSession) {
            console.log("Reusing existing session:", currentSession);
            return currentSession;

        }
        const session = await account.createEmailPasswordSession(email, password);
        console.log("try block");
        return session;
    } catch (error) {
        console.log("Error in signIn:", error.message, error.code);


        throw new Error;
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser) throw Error;
    } catch (error) {
        console.error(error);

    }
}