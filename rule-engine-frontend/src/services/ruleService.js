import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/rules';

const createRule = (ruleString) => {
  return axios.post(`${BASE_URL}/create`, ruleString);
};

const combineRules = (ruleIds) => {
  return axios.post(`${BASE_URL}/combine`, ruleIds);
};

const evaluateRule = (ruleData) => {
  return axios.post(`${BASE_URL}/evaluate`, ruleData);
};

export default {
  createRule,
  combineRules,
  evaluateRule,
};
