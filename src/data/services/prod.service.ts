import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class ProdService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    const dbSsl = this.configService.get<string>('DB_SSL');
    const useSsl = dbSsl === 'true' || (Boolean(databaseUrl) && dbSsl !== 'false');

    if (databaseUrl) {
      return {
        type: 'postgres',
        url: databaseUrl,
        logging: false,
        dropSchema: false,
        ssl: useSsl
          ? {
              rejectUnauthorized: false,
            }
          : false,
        synchronize: true,
        autoLoadEntities: true,
      };
    }

    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      port: Number(this.configService.get<string>('DB_PORT', '5432')),
      username: this.configService.get<string>('DB_USERNAME', 'root'),
      password: this.configService.get<string>('DB_PASSWORD', 'root'),
      database: this.configService.get<string>('DB_DATABASE', 'db_blogpessoal'),
      logging: false,
      dropSchema: false,
      ssl: useSsl
        ? {
            rejectUnauthorized: false,
          }
        : false,
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
