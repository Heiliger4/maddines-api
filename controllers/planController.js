const Plan = require('../models/plan');

exports.getAllPlans = async (req, res, next) => {
  try {
    const plans = await Plan.findAll();
    res.json({ success: true, data: plans });
  } catch (error) {
    next(error);
  }
};

exports.getPlanById = async (req, res, next) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
    res.json({ success: true, data: plan });
  } catch (error) {
    next(error);
  }
};

exports.createPlan = async (req, res, next) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    next(error);
  }
};

exports.updatePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    await plan.update(req.body);
    res.json({ success: true, data: plan });
  } catch (error) {
    next(error);
  }
};

exports.deletePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    await plan.destroy();
    res.json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    next(error);
  }
};
