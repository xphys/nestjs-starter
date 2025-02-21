import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('API');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now();

    this.logger.log(
      `[START] ${method} ${originalUrl} - UserAgent: ${userAgent}`,
    );
    if (Object.keys(body).length > 0) {
      this.logger.debug('Body: ' + JSON.stringify(body));
    }

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const duration = Date.now() - startTime;

      this.logger.log(
        `[END] ${method} ${originalUrl} ${statusCode} ${contentLength}B - ${duration}ms`,
      );
    });

    next();
  }
} 