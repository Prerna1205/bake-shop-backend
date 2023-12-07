const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema({
//     resultInfo: {
//         resultStatus: {
//             type: String,
//             required: true
//         },
//         resultCode: {
//             type: String,
//             required: true
//         },
//         resultMsg: {
//             type: String,
//             required: true
//         },
//     },
//     txnId: {
//         type: String,
//         required: true
//     },
//     bankTxnId: {
//         type: String,
//         required: true
//     },
//     orderId: {
//         type: String,
//         required: true
//     },
//     txnAmount: {
//         type: String,
//         required: true
//     },
//     txnType: {
//         type: String,
//         required: true
//     },
//     gatewayName: {
//         type: String,
//         required: true
//     },
//     bankName: {
//         type: String,
//         required: true
//     },
//     mid: {
//         type: String,
//         required: true
//     },
//     paymentMode: {
//         type: String,
//         required: true
//     },
//     refundAmt: {
//         type: String,
//         required: true
//     },
//     txnDate: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });
const paymentSchema = new mongoose.Schema({

  txnAmount: {
    type: String,
    required: true,
  },
  orderId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resultInfo: {
            resultStatus: {
                type: String,
                required: true
            },
            resultCode: {
                type: String,
                required: false
            },
            resultMsg: {
                type: String,
                required: false
            },
        }

});
module.exports = mongoose.model("Payment", paymentSchema);
