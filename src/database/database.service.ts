import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(@InjectConnection() private readonly connection: Connection) {
    this.connection.on('connected', () => {
      console.log('✅ MongoDB connected successfully!');
    });

    this.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    this.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });
  }
}
