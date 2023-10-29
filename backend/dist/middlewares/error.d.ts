import { ExceptionFilter, ArgumentsHost, BadRequestException } from '@nestjs/common';
export declare class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost): void;
}
