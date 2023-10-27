import { transformError } from '../helpers/transform';
import { first, get } from 'lodash';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { error } from 'console';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const errorResponse = exception?.getResponse();
    const error =
      (Array.isArray(get(errorResponse, 'message'))
        ? first(get(errorResponse, 'message'))
        : get(errorResponse, 'message')) || exception.message;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: error,
    });
  }
}
