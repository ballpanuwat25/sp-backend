import BundleRequest from "../models/BundleModel.js";

const UpdateBundleRequest = async(req, res) => {
    try {
        await BundleRequest.update(req.body, {
            where: {
                Bundle_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Bundle Request Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export default UpdateBundleRequest;