import History from '../models/History.model.js';

export const createHistoryEntry = async (data) => {
  return await History.create(data);
};

export const getUserHistory = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [entries, totalEntries] = await Promise.all([
    History.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    History.countDocuments({ userId }),
  ]);
  const totalPages = Math.ceil(totalEntries / limit);
  return { entries, totalEntries, totalPages, currentPage: page };
};

export const getHistoryItemById = async (userId, itemId) => {
  return await History.findOne({ _id: itemId, userId });
};

export const deleteHistoryItemById = async (userId, itemId) => {
  return await History.findOneAndDelete({ _id: itemId, userId });
};

export const clearUserHistory = async (userId) => {
  return await History.deleteMany({ userId });
};
