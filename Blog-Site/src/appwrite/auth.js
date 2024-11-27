import config from '../config/config.js'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID);
        this.account = new Account(this.client);
    }

    async CreateAccount({email, password, username}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, username);

            if (userAccount) {
                //Login user
                return this.LoginUser({email, password});
            }
            else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async LoginUser({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async GetCurrentUser(){
        try {
            const currentSession = await this.account.getSession('current');
            if (currentSession) {
                return currentSession;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async LogoutUser(){
        try {
            return await this.account.deleteSession('current');
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;