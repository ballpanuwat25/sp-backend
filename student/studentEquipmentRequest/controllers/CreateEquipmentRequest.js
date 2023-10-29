import EquipmentRequest from "../models/EquipmentRequestModel.js";
import Equipment from "../../../staff/equipment/models/EquipmentModel.js";

const LINE_NOTIFY_API_TOKEN = "sx3hbxHUdXUnoyRpOONipgkruv46C2tBv7rkzZGkSie";

const findEquipmentNameByEquipmentId = async (equipmentId) => {
    try {
        const equipment = await Equipment.findOne({
            where: {
                Equipment_Id: equipmentId,
            },
        });

        if (equipment) {
            return equipment.Equipment_Name;
        }

        return null; // Equipment_Id not found
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

const CreateEquipmentRequest = async(req, res) => {
    try {
        await EquipmentRequest.create(req.body);

        const { Student_Id, Equipment_Id } = req.body;

        const equipmentName = await findEquipmentNameByEquipmentId(Equipment_Id);

        if (equipmentName) {
            const message = `นิสิตรหัส ${Student_Id} เพื่อขอยืมอุปกรณ์ ${equipmentName}`;

            const lineNotifyURL = "https://notify-api.line.me/api/notify";
            const headers = {
                "Authorization": `Bearer ${LINE_NOTIFY_API_TOKEN}`,
                "Content-Type": "application/x-www-form-urlencoded",
            };
            const data = new URLSearchParams();
            data.append("message", message);

            await axios.post(lineNotifyURL, data, { headers });
        } else {
            console.log(`Equipment_Id ${Equipment_Id} not found in the equipment model.`);
        }

        res.status(201).json({msg: "Equipment Request Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export default CreateEquipmentRequest;