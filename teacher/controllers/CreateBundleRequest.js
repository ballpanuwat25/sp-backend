import BundleRequest from "../models/BundleModel.js";

const CreateBundleRequest = async(req, res) => {
    try {
        await BundleRequest.create(req.body);
        res.status(201).json({msg: "Bundle Request Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export default CreateBundleRequest;