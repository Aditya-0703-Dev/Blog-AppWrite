import config from '../config/config.js'
import { Client, Databases, Query, ID} from "appwrite";

export class PostService {
    client = new Client();
    databases;

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID);
        this.databases = new Databases(this.client);
    }

    async CreatePost({title, content, featuredImage, slug, userId, status}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                `${userId}-${ID.unique().substring(0,14)}`,
                {
                    title,
                    content,
                    featuredImage,
                    createdby: userId,
                    status
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async UpdatePost(slug, {title, content, featuredImage, userId, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
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

    async GetPosts(query){
        try {
            //returns an array of all posts
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                Query.equal['status', ['Active']]
            );
        } catch (error) {
            console.log("Appwrite serive :: GetPosts :: error", error);
            return false;
        }
    }
}

const postService = new PostService();

export default postService;