import { Request } from 'express';

declare namespace Environment {
    export interface customRequest extends Request {
        files?: any;
    }
}

export = Environment;
