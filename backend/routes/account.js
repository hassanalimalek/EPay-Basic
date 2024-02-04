const { default: mongoose } = require('mongoose');
const { Account } = require('../db');
const authMiddleware = require('../middleware');

const router = require('express').Router();

// Get User Balance
router.get('/balance',authMiddleware,(req,res)=>{
   
    if(req.query.userId === undefined || req.query.userId === ''){
        return res.status(400).json({message:'Invalid User Id'})
    }
    Account.findOne({userId:req.query.userId})
        .then((account)=>{
           return res.json({balance:account.balance})
        })
        .catch(err => res.status(400).json('Error: ' + err));
})


// Transfer Money
router.post('/transfer',authMiddleware,async (req,res)=>{
 
   const session = await mongoose.startSession();
   session.startTransaction();

   try{ 
        // Fetch Sender and Reciever Account
        let senderAccount = await Account.findOne({userId:req.body.senderId}).session(session)

        let recieverAccount = await Account.findOne({userId:req.body.recieverId}).session(session)
        // Check if sender and reciever account exists
        if(senderAccount === undefined || recieverAccount === undefined){
            throw new Error('Invalid User Id')
        }
        // Check if sender has sufficient balance
        if(senderAccount.balance < req.body.amount){
            throw new Error('Insufficient Balance')
        }
        // Update Sender and Reciever Balance
        await Account.updateOne({userId:req.body.senderId},{$inc:{balance:-req.body.amount}}).session(session)
        await Account.updateOne({userId:req.body.recieverId},{$inc:{balance:req.body.amount}}).session(session)
        // Commit Transaction
        await session.commitTransaction();
        session.endSession();
        return res.json({message:'Transaction Successful'})
   }catch(e){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({message:e.message})
   }
})


module.exports = router;