// Utility function to handle async errors in Express route handlers
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        // Wrap the asynchronous route handler in a promise and catch any errors
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => {
                // Pass the error to the next middleware (error handler)
                next(err);
            });
    };
};

// Export the asyncHandler utility function for use in other files
export { asyncHandler };





// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
//     }catch (err) {
//         res.status(500).json({
//             success: false,
//             error: err.message
//         })
//     }
// }

