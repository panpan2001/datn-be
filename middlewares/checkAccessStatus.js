var moment = require('moment')

const { Account } = require("../models/Account.Model")
const { Student } = require("../models/Student.Model")
const { StudentRating } = require("../models/StudentRating.Model")

const isEndBlockedTime = 1000 * 60
// 1000*60*60*24*7


const checkAccessStatus = {

    checkIsBlocked: async (req, res, next) => {
        console.log("checkIsBlocked", req.body.email)
        let account = await Account.findOne({ email: req.body.email })
        // console.log(account)
        if (!account) {
            return res.status(400).send(`Tài khoản không đúng`)
        }
        const endedBlokedTime = moment(new Date(new Date(account.updatedAt).getTime() + isEndBlockedTime)).format("DD/MM/YYYY HH:mm:ss")

        if (account.is_deleted) {
            // console.log(new Date(new Date(account.updatedAt ).getTime() + isEndBlockedTime))
            if (new Date(new Date(account.updatedAt).getTime() + isEndBlockedTime) <= Date.now()) {
                account = await Account.findByIdAndUpdate(account._id, {
                    $set: {
                        is_deleted: false,
                        messageFromSystem: []
                    }
                })
                // co nen cho count gian khi het bi xoa ko? 
                // neu ko thi count cu tiep tuc tăng ->  ko tu dong khoa nua vi is deleted 
                // da de la false khi het han roi
                // co nen khi check het bi block thi clear danh gia luon ko 
                // --------
                // const student = await Student.findOne({ account_id: account._id })
                // const studentRating = await StudentRating.updateMany(
                //     {
                //         id_student: student._id,
                //         isBadJudge: true,
                //         // countBadJudge: 2
                //     },
                //     {
                //         //isbadjudge false : badjudge dung de an cac binh luan sai trai 
                //         $set: {
                //             isBadJudge: false,

                //         },
                //         // co nen khi het block thi no giam di ko=> ko can => vi khi het blick thi isdeleted false, chi khi bi bao xau them thif count tang them >2 lan roi no ms khoa 
                //         // $inc: { countBadJudge: -1 },

                //     }
                //     , {
                //         new: true
                //     }
                // )
                // co nen check tim kiem rating co count>2 va khoa tiep ko ? 
                // -------------
                next()
            }
            else {
                return res.status(400).send(` Tài khoản bị khóa cho đến
            ${endedBlokedTime}  ${account.messageFromSystem} .`)
            }

        }
        else next()
    }
}

module.exports = checkAccessStatus