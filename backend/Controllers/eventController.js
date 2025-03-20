const Event = require("../Models/eventModel");

exports.addEvent = async(req,res) =>{
    const token = req.headers.authorization; 
console.log(token);

if(!token){
    return res.status(401).json({
        success: false,
        meassage: "Token is missing"
    });
}
try {
   const event_details = req.body;
   const user_id = req.id;
   const newEvent = await Event.create({...event_details,user_id});
   
   res.status(201).json({
    success: true,
    message: "Event added successfully..!",
    newEvent
})
} catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
}
}

exports.allEventsofUser = async(req,res) =>{
    const events = await Event.find({user_id:req.id});
    if(events.length === 0){
    return res.status(404).json({
        success: false,
        message: 'No events..!'
    })
    }
    try {
        res.status(200).json({
            success: true,
            events
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    }

exports.updateEvent = async(req,res) =>{
    const {id} = req.params;
    const updated_data = req.body;
    
    const events = await Event.findByIdAndUpdate(id,{$set:updated_data},{new: true,runValidator: true});
    if(!events){
        return res.status(401).json({
            success: false,
            message: "Event not found"
        });
    
    }
    try {
        res.status(200).json({
            success: true,
            message:"Updated successfully!",
            events
        });
        console.log(events);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    }

exports.allEvents= async(req,res)=>{    
    const events = await Event.find().sort({event_date: -1});
    try {
        res.status(200).json({
            success: true,
            events
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}

exports.deleteEvent = async(req,res) =>{
    const {id} = req.params;

    try {
        const delete_event = await Event.findByIdAndDelete(id);
        if(!delete_event){
            res.status(404).json({
                success:false,
                message:"Event not found"
            });
        }
        res.status(200).json({
            success: true,
            message:"Deleted!",
            Event
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }

}

exports.eventDetails = async(req,res) =>{
    const {id} = req.params;
    try {
        const details = await Event.findById(id);
        if(!details) {
            return res.status(404).json({
                success: false,
                message: "event not found"
            })
        }
        res.status(200).json({
            success: true,
            details
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


