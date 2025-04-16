import { Client, Account, Databases, ID } from "appwrite";

const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);

// Constants
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
export const ID_GENERATOR = ID;
