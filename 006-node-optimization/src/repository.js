const reportRepository = {
  getReport: async (params) => {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve({ ...params, data: "big data here" }),
        Math.random() * 1e3 + 500
      )
    );
  },
};

module.exports = {
  reportRepository,
};
