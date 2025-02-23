import config from '../config/config.js'
import { Client, ID, Storage } from "appwrite";

export class FileUploadService {
    client = new Client();
    

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID);
        this.storage = new Storage(this.client);
    }

    async CreateFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file,
            );
        } catch (error) {
            console.log("Appwrite service :: CreateFile :: error", error);
            return false;
        }
    }

    async DeleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketID,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: DeleteFile :: error", error);
            return false;
        }
    }

    async GetFilePreview(fileId){
        try {
            return await this.storage.getFilePreview(
                config.appwriteBucketID,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: GetFilePreview :: error", error);
            return false;
        }
    }
}

const fileUploadService = new FileUploadService();

export default fileUploadService