import { HttpException, HttpStatus } from '@nestjs/common';

export const transformError = (error) => {
  throw new HttpException(
    { statusCode: HttpStatus.BAD_REQUEST, message: error },
    HttpStatus.BAD_REQUEST,
  );
};
