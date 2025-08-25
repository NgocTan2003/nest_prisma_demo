import { DataSource } from "typeorm";
import { config } from 'dotenv';
config();
import { User } from "../user/entities/user.entity";
import { Role } from "../role/entities/role.entity";
import { Category } from "../category/entities/category.entity";
import { Post } from "../posts/entities/post.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: true,
    entities: [User, Role, Category, Post],
    migrations: ["src/config/migrations/*.ts"],
});
