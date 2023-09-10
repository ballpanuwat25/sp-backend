import BundleRequest from "../models/BundleModel.js";

const GetBundleRequest = async(req, res) => {
    try {
        const bundleRequest = await BundleRequest.findAll();
        res.status(200).json(bundleRequest);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetBundleRequest;