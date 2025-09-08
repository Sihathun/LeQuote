import { Client, Databases, ID, Query} from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://syd.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client);


export const addQuotes = async (quote) => {
    try {
        const existingQuotes = await getQuotes();
        // this checks for quotes in the db and make sure we do case-insensitive check so there's no duplicates
        for ( let element of existingQuotes ) {
            if (quote.toLowerCase() === element.toLowerCase()) {
                return "This quote exists";
            }
        }

        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {quote});
        return "Quote created successfully.";

    } catch (error) {
        console.log(error);
        return "Could not add quote due to our end! Try again later";
    } finally {
        console.log("Quote created successfully.");
    }





}

export const getQuotes = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
        const quotes = result.documents.map(doc => doc.quote);

        return quotes;
    } catch (e) {
        console.log(e);
    }
}
