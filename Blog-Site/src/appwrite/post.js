import config from '../config/config.js'
import { Client, Databases, Query} from "appwrite";

export class PostService {
    client = new Client();
    databases;

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID);
        this.databases = new Databases(this.client);
    }

    async CreatePost({title, content, image, slug, userId, status}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                `${userId}-${slug}`,
                {
                    title,
                    content,
                    image,
                    userId,
                    status
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async UpdatePost(slug, {title, content, image, userId, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    image,
                    userId,
                    status
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async DeletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            );
            return true;
        } catch (error) {
            return false;
        }
    }

    async GetPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            );
        } catch (error) {
            console.log("Appwrite serive :: GetPost :: error", error);
            return false;
        }
    }

    async GetPosts(query = Query.select(["status", "Active"])){
        try {
            //returns an array of all posts
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                query
            );
        } catch (error) {
            console.log("Appwrite serive :: GetPosts :: error", error);
            return false;
        }
    }
}

const postService = new PostService();

export default postService;