import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  migrations: [path.join(__dirname, './migrations/*.{t,j}s')],
  entities: [path.join(__dirname, './**/entities/*.{t,j}s')],
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: false,
};
export const dataSource = new DataSource(options);

export const typeOrmModuleOptions = (): TypeOrmModuleOptions => ({
  ...options,
});
