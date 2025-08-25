import { HttpException, HttpStatus } from "@nestjs/common";
import { ISuccessResponse } from "./interface";


export function SuccessResponse(data?: Object, message = "success"): ISuccessResponse<any> {
    return {
        status: true,
        message: message,
        data: data
    };
}

export function BadRequestResponse(message): HttpException {
    throw new HttpException({ message, status: false }, HttpStatus.BAD_REQUEST);
}

export function NotFoundResponse(message): HttpException {
    throw new HttpException({ message, status: false }, HttpStatus.NOT_FOUND);
}

export function UnauthorziredResponse(message?): HttpException {
    throw new HttpException({ message: message || 'Unauthorized', status: false }, HttpStatus.UNAUTHORIZED);
}

export function ForbiddenResponse(message): HttpException {
    throw new HttpException({ message, status: false }, HttpStatus.FORBIDDEN);
}