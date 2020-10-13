import winston from 'winston';
import expressWinston from 'express-winston';
import winstonFile from 'winston-daily-rotate-file';
import winstonMongodb from 'winston-mongodb';
import { ElasticsearchTransport } from 'winston-elasticsearch';

const mongoErrorTransport = (uri) => new winston.transports.MongoDB({
  db: uri,
  metaKey: 'meta',
});
// info logger message function
const getMessage = (req, res) => {
  const obj = {
    correlationId: req.headers['x-correlation-id'],
    requestBody: req.body,
  };
  return JSON.stringify(obj);
};

const fileInfoTransport = new (winston.transports.DailyRotateFile)(
  {
    filename: 'log-info-%DATE%.log',
    datePattern: 'yyyy-MM-DD-HH',
  },
);

const fileErrorTransport = new (winston.transports.DailyRotateFile)(
  {
    filename: 'log-error-%DATE%.log',
    datePattern: 'yyyy-MM-DD-HH',
  },
);

// info logger
export const infoLogger = () => expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    fileInfoTransport,
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
  meta: true,
  msg: getMessage,
  expressFormat: true,
});

export const errorLogger = (uri) => expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    fileErrorTransport,
    mongoErrorTransport(uri),

  ],
  format: winston.format.combine(winston.format.colorize(), winston.format.json()),
  meta: true,
  msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }',
});
