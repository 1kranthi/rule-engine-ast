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

const getRules = () => {
  return axios.get(BASE_URL);
};

export default {
  createRule,
  combineRules,
  evaluateRule,
  getRules,
};
