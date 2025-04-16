
import Record from "../models/RecordModel.js";

// @desc    Create or update the patient record
// @route   POST /api/patient/record
// @access  Private (Only for logged-in users)
export const rcreate = async (req, res) => {
  try {
      const recordData = new Record(req.body);
      
      if (!recordData) {
          return res.status(400).json({ msg: "Patient record data is required" });
      }

      const savedData = await recordData.save();
      res.status(201).json({ msg: "Record created successfully", data: savedData });
  } catch (error) {
      console.error("Error while creating record:", error); // Log the error
      res.status(500).json({ error: error.message });
  }
};
// @desc    Get all patient records
// @route   GET /api/patient/records
// @access  Private (For authorized users)
export const rgetAll = async (req, res) => {
  try {
    const recordData = await Record.find();

    if (!recordData || recordData.length === 0) {
      return res.status(404).json({ msg: "No patient records found" });
    }

    res.status(200).json(recordData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get a single patient record by ID
// @route   GET /api/patient/record/:id
// @access  Private (For authorized users)
export const rgetOne = async (req, res) => {
  try {
    const id = req.params.id;
    const recordExist = await Record.findById(id);

    if (!recordExist) {
      return res.status(404).json({ msg: "Patient record not found" });
    }

    res.status(200).json(recordExist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const rupdate = async (req, res) => {
  try {
    const id = req.params.id;
    const recordExist = await Record.findById(id);

    if (!recordExist) {
      return res.status(401).json({ msg: "Record data not found" });
    }

    const  rupdatedData = await Record.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "Record updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const rdelete = async (req, res) => {
  try {
    const id = req.params.id;
    const recordExist = await Record.findById(id);

    if (!recordExist) {
      return res.status(401).json({ msg: "Record data not found" });
    }

    await Record.findByIdAndDelete(id);
    res.status(200).json({ msg: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

