const GymDetail = require('../models/gymDetails');

exports.getGymDetails = async (req, res, next) => {
  try {
    const gymDetails = await GymDetail.findOne();
    if (!gymDetails) return res.status(404).json({ success: false, message: 'Gym details not found' });

    res.json({ success: true, data: gymDetails });
  } catch (error) {
    next(error);
  }
};

exports.createGymDetail = async (req, res, next) => {
  try {
    // You may want to restrict gym details to 1 entry only if there is always just one gym
    const existing = await GymDetail.findOne();
    if (existing) return res.status(400).json({ success: false, message: 'Gym details already exist' });

    const gymDetail = await GymDetail.create(req.body);
    res.status(201).json({ success: true, data: gymDetail });
  } catch (error) {
    next(error);
  }
};

exports.updateGymDetail = async (req, res, next) => {
  try {
    const gymDetail = await GymDetail.findByPk(req.params.id);
    if (!gymDetail) return res.status(404).json({ success: false, message: 'Gym details not found' });

    await gymDetail.update(req.body);
    res.json({ success: true, data: gymDetail });
  } catch (error) {
    next(error);
  }
};

exports.deleteGymDetail = async (req, res, next) => {
  try {
    const gymDetail = await GymDetail.findByPk(req.params.id);
    if (!gymDetail) return res.status(404).json({ success: false, message: 'Gym details not found' });

    await gymDetail.destroy();
    res.json({ success: true, message: 'Gym details deleted successfully' });
  } catch (error) {
    next(error);
  }
};
