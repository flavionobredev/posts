class ReportService {
  constructor(reportRepository, cacheUtil) {
    this.reportRepository = reportRepository;
    this.cacheUtil = cacheUtil;
  }

  async getReport(params) {
    const cacheKey = `report:${params.user}-${params.startDate}-${params.endDate}`;
    let reportFromCache = this.cacheUtil.get(cacheKey);
    if(reportFromCache) return reportFromCache;
    
    const report = await this.reportRepository.getReport(params);
    await this.cacheUtil.set(cacheKey, report, { ttl: 20 * 1000 });
    return report;
  }
}

module.exports = {
  ReportService,
};
