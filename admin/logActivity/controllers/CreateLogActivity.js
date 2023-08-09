import LogActivity from "../models/LogActivityModel.js";

const CreateLogActivity = async(req, res) => {
    try {
        await LogActivity.create(req.body);
        res.status(201).json({msg: "Log Activity Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export default CreateLogActivity;