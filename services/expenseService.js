const expensedb = require('../models/expense');
const user = require('../models/user');
const savedUrl = require('../models/savedurl');
const AWSService = require('./awsServices');

const createExpense = (amount, description, category, userId) => {
    return expensedb.create({ amount, description, category, user:userId });
};

const findUserById = (userId) => {
    return user.findOne({ _id: userId });
};

const updateUserExpense = (user, totalExpense) => {
    user.totalexpenses=totalExpense;
    return user.save();
};

const findExpenses = (userId, limit, offset) => {
    return expensedb.find({ user: userId })
    .skip(offset)
    .limit(limit)
};

const countExpenses = (userId) => {
    return expensedb.countDocuments( {user: userId });
};

const findExpenseById = (id, userId) => {
    return expensedb.findOne( { _id: id, user: userId } );
};

const deleteExpenseById = (id, userId) => {
    return expensedb.findByIdAndDelete({ _id: id,user: userId });
};

const uploadToS3 = (BUCKETName, filename, data) => {
    return AWSService.uploadToS3(BUCKETName, filename, data);
};

const saveUrl = (userId, url) => {
    return savedUrl.create({ user: userId, url });
};

const getSavedUrls = (userId) => {
    return savedUrl.find({user: userId } );
};

module.exports = {
    createExpense,
    findUserById,
    updateUserExpense,
    findExpenses,
    countExpenses,
    findExpenseById,
    deleteExpenseById,
    uploadToS3,
    saveUrl,
    getSavedUrls,
};
