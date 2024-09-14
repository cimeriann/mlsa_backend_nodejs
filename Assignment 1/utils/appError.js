// class AppError extends Error {
//     constructor(message, statusCode) {
//       super(message); // Call the parent class constructor
//       this.statusCode = statusCode;
//       this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//       this.isOperational = true;
  
//       // Capture stack trace, excluding constructor call from it.
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
  
//   module.exports = AppError;
  

const errorResponse = (res, statusCode, error) => {
    res.status(statusCode).send({status: 'error', error})
}


const successResponse = (res, statusCode, message, data) => {
    res.status(statusCode).send({
        status: 'success', 
        message: message,
        data
    })
}

module.exports = {errorResponse, successResponse}