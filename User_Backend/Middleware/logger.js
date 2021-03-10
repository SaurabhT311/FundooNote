
const {transports, createLogger, format}= require('winston');

module.exports={
infoLogger: createLogger({
    format:format.combine(
        format.timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
        format.simple()
    ),
    transports:[
        new transports.Console(),
        new transports.File({filename: './logs/info.log', level: 'info'}),
    ]
    }),

errorLogger:createLogger({
    format: format.combine(
        format.timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
        format.simple()
    ),
    transports: [
    new transports.Console(),
    new transports.File({filename: './logs/error.log', level:'error'})
    ]
})
}
