import Doctor from "../models/doctorModel.js";

export const dcreate = async(req, res)=>{
    try{

        const doctorData = new Doctor(req.body);
        if(!doctorData){
            return res.status(404).json({msg: "Doctor data not found"});

        }
        const savedDatga = await doctorData.save();
        res.status(200).json({msg:"Doctor Added Successfully"});


    }catch (error){
        res.status(500).json({error: error});

    }
    }


    export const dgetAll = async(req, res) => {
        try{
            const doctorData = await Doctor.find();

            if(!doctorData){
                return res.status(404).json({msg: "Doctor data not found"});
            }

            res.status(200).json(doctorData);
        }catch(error){
            res.status(500).json({error: error});
        }
    }


    export const dgetone = async(req, res) => {
        try{
            const id = req.params.id;
            const doctorExist = await Doctor.findById(id);

            if(!doctorExist){
                return res.status(404).json({msg: "Doctor data not found"});
            }

            res.status(200).json(doctorExist);
        }catch(error){
            res.status(500).json({error: error});
        }
    }

    export const dupdate = async(req, res) => {
        try{
            const id = req.params.id;
            const doctorExist = await Doctor.findById(id);

            if(!doctorExist){
                return res.status(401).json({msg: "Doctor data not found"});
            }

            const dupdatedData = await Doctor.findByIdAndUpdate(id,req.body,{new:true});
            res.status(200).json({msg:"Updated Successfully"});
        }catch(error){
            res.status(500).json({error: error});
        }
    }

    export const ddelete = async(req, res) => {
        try{
            const id = req.params.id;
            const doctorExist = await Doctor.findById(id);

            if(!doctorExist){
                return res.status(401).json({msg: "Doctor data not found"});
            }

           await Doctor.findByIdAndDelete(id);
            res.status(200).json({msg:"Doctor deleted successfully"});
        }catch(error){
            res.status(500).json({error: error});
        }
    }



// Fetch unique specializations
export const fetchSpecializations = async (req, res) => {
    try {
      const specializations = await Doctor.distinct('specialization');
      res.json(specializations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching specializations: ' + error.message });
    }
  };
  
  // Recommend doctors by specialization
  export const recommendDoctors = async (req, res) => {
    const { specialization } = req.query;
  
    try {
      const doctors = await Doctor.find({ specialization });
  
      if (doctors.length === 0) {
        return res.status(404).json({ message: 'No doctors found for the given specialization.' });
      }
  
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  };