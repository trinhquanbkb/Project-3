import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class XSSRequestWrapper implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      req.params = this.sanitizeRequestObject(req.params);
      req.query = this.sanitizeRequestObject(req.query);
      req.body = this.sanitizeRequestObject(req.body);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid input' });
      next();
    }

    next();
  }

  private sanitizeRequestObject(obj: any): any {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = this.sanitizeInput(obj[key]);
      }
    }
    return obj;
  }

  private sanitizeInput(input: any): any {
    if (typeof input === 'string') {
      const patterns = [
        /<(.*?)>/gi,
        /&lt;(.*?)&gt;/gi,
        /<script>(.*?)<\/script>/gi,
        /src=['"](.*?)['"]/gi,
        /<\/script>/gi,
        /<script(.*?)>/gi,
        /eval\((.*?)\)/gi,
        /expression\((.*?)\)/gi,
        /onerror\((.*?)\)/gi,
        /javascript:/gi,
        /vbscript:/gi,
        /onload(.*?)=/gi,
        /iframe/gi,
        /video/gi,
        /embed/gi,
        /image/gi,
        /alert/gi,
        /svg/gi,
      ];

      let sanitizedInput = input;
      patterns.forEach((pattern) => {
        sanitizedInput = sanitizedInput.replace(pattern, '');
      });

      return sanitizedInput;
    } else if (typeof input === 'object') {
      return this.sanitizeRequestObject(input);
    } else {
      return input;
    }
  }
}
