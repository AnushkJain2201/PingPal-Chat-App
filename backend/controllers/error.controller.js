const globalErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

    if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			error: err.message,
		});
	} else {
		console.error('Error', err);

		res.status(500).json({
			status: 'error',
			error: 'Something went very wrong!',
		});
	}
}

export default globalErrorMiddleware