import userModel from '../models/userModel.js'

// api get profile
export const profile = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}