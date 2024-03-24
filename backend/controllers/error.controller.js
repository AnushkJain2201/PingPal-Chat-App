const globalErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

    if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
            raju: "Jai Raju"
		});
	} else {
		console.error('Error', err);

		res.status(500).json({
			status: 'error',
			message: 'Something went very wrong!',
		});
	}
}

export default globalErrorMiddleware