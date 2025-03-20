const Event = require("../Models/eventModel");
const User = require("../Models/UserModel");

exports.getAllUsers = async(req,res) =>{
    try {
        const user = await User.find({ role: { $ne: "admin" } });
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
 
}

exports.removeUsers = async(req,res) =>{
    const {id} = req.params;
   try {
     const delete_user = await User.findByIdAndDelete(id);
     if(!delete_user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
     }
     res.status(200).json({
        success: true,
        message: "Deleted..!",
        User
     });
   } catch (error) {
       res.status(500).json({
        success: false,
        message: error.message
       })
   }
}

exports.projectStatistics = async(req,res) =>{
  try {
      const totalUsers = await User.countDocuments();
      const totalEvents = await Event.countDocuments();
      const categories = await Event.distinct("category");
      const totalCategories = categories.length;
      res.status(200).json({
        success: true,
        totalUsers,
        totalEvents,
        totalCategories
      })
  
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
       });
  }
}