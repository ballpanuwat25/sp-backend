import LogActivity from "../models/LogActivityModel.js";

const UpdateLogActivity = async(req, res) => {
    try {
        await LogActivity.update(req.body, {
            where: {
                LogActivity_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Log Activity Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export default UpdateLogActivity;