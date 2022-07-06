const { Router } = require("express");
const { reportRepository } = require("./repository");
const { ReportService } = require("./service");
const { cacheUtil } = require("./utils");

const router = Router();
const reportService = new ReportService(reportRepository, cacheUtil);

router.get("/reports", async (req, res) => {
  const { user, startDate, endDate } = req.query;
  const report = await reportService.getReport({ user, startDate, endDate });
  return res.json(report);
});

module.exports = router;
