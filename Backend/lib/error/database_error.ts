/*
 * File: /lib/pws-data/model/data_loader.ts
 * Author: Zizhao Wang (zizhao.wang@pinon.io)
 * File Created: Tuesday, 10th April 2018 10:53:30 am
 * -----
 * Last Modified: Thursday, 19th July 2018 3:17:53 pm
 * Modified By: Zizhao Wang (zizhao.wang@pinon.io>)
 * -----
 * Copyright (c) 2017 - 2018 PinOn, Inc. All rights reserved.
 */

import BaseError from './base_error';

export enum DatabaseErrorType {
    GeneralMongoDBError,
    PostgresWriteError,
    PostgresReadError
}

export class DatabaseError extends BaseError {
    public constructor(code: number, exp?: string) {
        super(code, DatabaseErrorType[code], exp);
        Object.setPrototypeOf(this, Object.assign(DatabaseError.prototype, BaseError.prototype));
        this.name = this.constructor.name;
    }
}
