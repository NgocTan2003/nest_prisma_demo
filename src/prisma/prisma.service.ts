import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        this.$connect()
            .then(() => {
                console.log('Connect to DB successfully');
            })
            .catch((error) => {
                console.error('Connect to DB error:', error);
            });
    }
}
