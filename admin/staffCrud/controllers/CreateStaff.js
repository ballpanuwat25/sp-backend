import Staff from "../models/StaffModel.js";

const CreateStaff = async (req, res) => {
    try {
        // Check if the username already exists in the database
        const existingStaff = await Staff.findOne({
            where: {
                Staff_Username: req.body.Staff_Username
            }
        });

        if (existingStaff) {
            // Username already exists, send an error response
            res.status(400).json({ error: "Username already exists" });
        } else {
            // Username is unique, create the staff
            await Staff.create(req.body);
            res.status(201).json({ msg: "Staff Created" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default CreateStaff;