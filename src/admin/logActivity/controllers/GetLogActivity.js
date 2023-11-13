import LogActivity from "../models/LogActivityModel.js";

const GetLogActivity = async(req, res) => {
    try {
        const logActivity = await LogActivity.findAll();
        res.status(200).json(logActivity);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetLogActivity;