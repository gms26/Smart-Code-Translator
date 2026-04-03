import {
  getUserHistory,
  getHistoryItemById,
  deleteHistoryItemById,
  clearUserHistory,
} from '../services/history.service.js';

export const getHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const data = await getUserHistory(req.user._id, page, limit);
    return res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getHistoryItem = async (req, res, next) => {
  try {
    const entry = await getHistoryItemById(req.user._id, req.params.id);
    if (!entry) {
      return res.status(404).json({ success: false, message: 'History item not found' });
    }
    return res.json({ success: true, data: entry });
  } catch (error) {
    next(error);
  }
};

export const deleteHistoryItem = async (req, res, next) => {
  try {
    const deleted = await deleteHistoryItemById(req.user._id, req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'History item not found' });
    }
    return res.json({ success: true, message: 'History item deleted' });
  } catch (error) {
    next(error);
  }
};

export const clearHistory = async (req, res, next) => {
  try {
    await clearUserHistory(req.user._id);
    return res.json({ success: true, message: 'All history cleared' });
  } catch (error) {
    next(error);
  }
};
