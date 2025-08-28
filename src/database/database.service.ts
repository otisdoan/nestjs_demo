import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnApplicationBootstrap {
  constructor(@InjectConnection() private readonly connection: Connection) {}
  onApplicationBootstrap() {
    console.log('Mongoose readyState:', this.connection.readyState);
  }
}
