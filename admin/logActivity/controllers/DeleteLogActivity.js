import LogActivity from "../models/LogActivityModel.js";

const DeleteLogActivity = async(req, res) => {
    try {
        await LogActivity.destroy({
            where: {
                LogActivity_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Log Activity Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export default DeleteLogActivity;