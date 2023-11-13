import LogActivity from "../models/LogActivityModel.js";

const GetLogActivityById = async(req, res) => {
    try {
        const logActivity = await LogActivity.findOne({
            where: {
                LogActivity_Id: req.params.id
            }
        });
        res.status(200).json(logActivity);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetLogActivityById;