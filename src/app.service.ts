import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onApplicationBootstrap() {
    console.log('Mongoose readyState:', this.connection.readyState);
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  }
}
