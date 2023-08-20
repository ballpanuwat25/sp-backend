import BundleRequest from "../models/BundleModel.js";

const DeleteBundleRequest = async(req, res) => {
    try {
        await BundleRequest.destroy({
            where: {
                Bundle_Name: req.params.id
            }
        });
        res.status(200).json({msg: "Bundle Request Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export default DeleteBundleRequest;