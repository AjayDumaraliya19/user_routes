declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        MONGO_URI: string;
        JWT_SECRET_KEY: string;
    }
}