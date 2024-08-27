'use server';
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )
    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error)
  }
}
export const signIn = async ({ email, password }: signInProps) => {
    try{
      const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    const user = await getUserInfo({ userId: session.userId }) 
    console.log(user)
    return parseStringify(user);

    }
    catch(e){
        console.log(e);
    }
}

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName, address, city, postalCode, dateOfBirth, ssn} = userData;
  
  let newUserAccount;
    try{
        const { account, database } = await createAdminClient();

        newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
        if(!newUserAccount) throw new Error('Error creating user')

          const newUser = await database.createDocument( DATABASE_ID!, USER_COLLECTION_ID!, ID.unique(), 
      {
        email: email,
        dwollaCustomerId: '',
        dwollaCustomerUrl: '',
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        postalCode: postalCode,
        dateOfBirth: dateOfBirth,
        ssn: ssn,
        userId: newUserAccount.$id
      }
    )
    console.log(newUser);

        const session = await account.createEmailPasswordSession(email, password);
        const newUserRecord = await database.createDocument(
          ID.unique(), 
          email, 
          password, `${firstName} ${lastName}`

        )
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        return parseStringify(newUserAccount);
    }
    catch(e){
        console.log(e);
    }
}

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      return await account.get();
    } catch (error) {
      return null;
    }
  }