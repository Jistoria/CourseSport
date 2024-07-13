import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import axios from 'axios';

@Global()
@Module({
    imports: [ConfigModule.forRoot()],
    providers: [
        {
            provide: 'LARAVEL_API',
            useFactory: () => {
                return axios.create({
                    baseURL: process.env.URL_BASE_LARAVEL,
                });
            },
        },
        {
            provide: 'RUBY_API',
            useFactory: () => {
                return axios.create({
                    baseURL: process.env.URL_BASE_RUBY,
                });
            },
        },
    ],
    exports: ['LARAVEL_API', 'RUBY_API'],
})
export class AxiosConfigModule {}
