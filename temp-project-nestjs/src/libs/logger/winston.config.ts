import { format, transports, createLogger } from 'winston';
import { MongoDB } from 'winston-mongodb';
const myFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf((info) => `${info.timestamp} [${info.level}] ${info.message}`),
);

const transportsConfig = [
  new MongoDB({
    level: 'info',
    db: 'mongodb://127.0.0.1:27017/temp-repo-2',
    options: {
      useUnifiedTopology: true,
    },
    collection: 'logs',
    format: format.combine(
      format.timestamp(), // Add a timestamp to MongoDB logs
      format.json(), // Use JSON format for MongoDB logs
    ),
  }),
  new transports.Console({
    format: myFormat,
    level: 'debug', // Change this to your desired log level (e.g., 'info', 'error')
  }),
  new transports.File({
    filename: 'combined.log',
    format: format.combine(myFormat, format.json()),
    level: 'info', // Change this to your desired log level for the file
  }),
];

export const logger = createLogger({
  format: myFormat,
  transports: transportsConfig,
});
