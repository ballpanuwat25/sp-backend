import BundleRequest from "../models/BundleModel.js";

const GetBundleRequestById = async(req, res) => {
    try {
        const bundleRequest = await BundleRequest.findAll({
            where: {
                Bundle_Name: req.params.id
            }
        });
        res.status(200).json(bundleRequest);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetBundleRequestById;