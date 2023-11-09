import axios from "axios";
import ChemicalsRequest from "../models/ChemicalsRequestModel.js";
import ChemicalsDetail from "../../../staff/chemicalsDetails/models/ChemicalsDetailModel.js";

import dotenv from 'dotenv';
dotenv.config();

const LINE_NOTIFY_API_TOKEN = process.env.LINE_TOKEN_REQUEST;

const findChemNameByChemId = async (chemId) => {
    try {
        const chemical = await ChemicalsDetail.findOne({
            where: {
                Chem_Id: chemId,
            },
        });

        if (chemical) {
            return chemical.Chem_Name;
        }

        return null; // Chem_Id not found
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

const CreateChemicalsRequest = async (req, res) => {
    try {
        await ChemicalsRequest.create(req.body);

        const { Student_Id, Chem_Id } = req.body;

        // Find Chem_Name by Chem_Id
        const chemName = await findChemNameByChemId(Chem_Id);

        if (chemName) {
            // Create a message with Student_Id and Chem_Name
            const message = `นิสิตรหัส ${Student_Id} เพื่อขอเบิกสารเคมี ${chemName}`;

            const lineNotifyURL = "https://notify-api.line.me/api/notify";
            const headers = {
                "Authorization": `Bearer ${LINE_NOTIFY_API_TOKEN}`,
                "Content-Type": "application/x-www-form-urlencoded",
            };
            const data = new URLSearchParams();
            data.append("message", message);

            // Make a POST request to the Line Notify API
            await axios.post(lineNotifyURL, data, { headers });
        } else {
            console.log(`Chem_Id ${Chem_Id} not found in the chemicals_detail model.`);
        }

        res.status(201).json({ msg: "Chemicals Request Created" });
    } catch (error) {
        console.log(error.message);
    }
};

export default CreateChemicalsRequest;
