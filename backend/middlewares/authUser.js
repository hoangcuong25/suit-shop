import jwt from 'jsonwebtoken'

// user authentication middleware
const authUser = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1]

        if (!accessToken) {
            return res.status(401).json({ success: false, message: "You have to login first" });
        }

        try {
            const token_decode = jwt.verify(accessToken, process.env.ACCESS_JWT_SECERT)
            req.body.userId = token_decode.id

            next()
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ success: false, message: "Unauthorized - Access token expired" });
            }
            throw error;
        }

    } catch (error) {
        console.error('Auth Middleware Error:', error.message);
        res.json({ success: false, message: error.message })
    }
}

export default authUser