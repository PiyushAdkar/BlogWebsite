import config from '../config/config';
import {Client, ID, Databases, Query, Storage} from 'appwrite';

export class databaseServices {
    client = new Client();
    databases;
    bucket;

    constructor()
    {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.projectId);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId, userName})
    {
        try {
            return await this.databases.createDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,          
                    content,
                    featuredImage,
                    status,
                    userId,
                    userName 
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug,{title,content, featuredImage, status})
    {
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,          // match case
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug)
    {
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.collectionId,
                slug                          
            )
            return true;
        } catch (error) {
            return false;
            throw error;
        }
    }

    async getPost(slug)
    {
        try {
            return await this.databases.getDocument(
                config.databaseId,
                config.collectionId,
                slug
            )
        } catch (error) {
            throw error
        }
    }

    async getPosts(queries = [Query.equal("status", "active")])
    {
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.collectionId,
                queries
            )
        } catch (error) {
            throw error
        }
    }

    async uploadFile(file)
    {
        try {
            return await this.bucket.createFile(
                config.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId)
    {
        try {
            await this.bucket.deleteFile(
                config.bucketId,
                fileId
            )
            return true
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileId)
    {
        return this.bucket.getFilePreview(
            config.bucketId,
            fileId
        )
    }

    getFileView(fileId) 
    {
        return this.bucket.getFileView(config.bucketId, fileId);
    }
}

const databaseService = new databaseServices();
export default databaseService