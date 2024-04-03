// const router = require("express").Router();
const Constants = require('../../config/constants');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const instance = new Razorpay({
    key_id: Constants.KEY_ID,
    key_secret: Constants.KEY_SECRET,
});
async function razorPayUserOrder(userOrder,res){
    try{
     //based on the course id will get the cost of the product
    const options = {
        amount: userOrder.price * 100,
        currency: "INR",
        notes:{
            "course_id":userOrder.course_id,
            "course_name":userOrder.title,
            "img":userOrder.img,
            "user_id":userOrder.user_id,
            "cohort_schedule_id":userOrder.cohort_schedule_id,
        },
      //  course_id:userOrder.course_id,
        receipt: crypto.randomBytes(10).toString("hex"),
    };
    instance.orders.create(options, (error, order) => {
        if (error) {
            return res.status(200).send({status:200, message: "course cost should not be zero !!" });
        }
       // return order;
       res.status(200).send({status:200,message: "order created", order: order });
    });
} catch (error) {
    res.status(500).send({status:500, message: "Internal Server Error!" });
   // console.log(error);
}
  }


async function razorPayUserProgramOrder(userOrder,res){
    try{
     //based on the course id will get the cost of the product
    const options = {
        amount: userOrder.price * 100,
        currency: "INR",
        notes:{
            "learning_track_id": userOrder.learning_track_id,
            "learning_track_name": userOrder.learning_track_name,
            "img": userOrder.img,
            "user_id":userOrder.user_id,
            "program_id":userOrder.program_id,
            "payment_type": userOrder.payment_type
            
        },
      //  course_id:userOrder.course_id,
        receipt: crypto.randomBytes(10).toString("hex"),
    };
    instance.orders.create(options, (error, order) => {
        if (error) {
            return res.status(200).send({status:200, message: "program cost should not be zero !!" });
        }
       // return order;
       res.status(200).send({status:200,message: "order created", order: order });
    });
} catch (error) {
    res.status(500).send({status:500, message: "Internal Server Error!" });
   // console.log(error);
}
  }
  
  
  // add the code below
  module.exports = {razorPayUserOrder};
module.exports = { razorPayUserProgramOrder };


  