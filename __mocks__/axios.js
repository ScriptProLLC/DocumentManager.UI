"use strict";

const mockData = require("./../tools/mockData");

module.exports = {
  get: () => {
    return Promise.resolve({ data: mockData.documents });
  }
};
