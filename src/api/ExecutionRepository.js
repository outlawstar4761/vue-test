import Repository from './Repository';

const baseDomain = 'https://api.outlawdesigns.io:9550';
const baseUrl = `${baseDomain}`;
const resource = '/execution';
export default {
  setDomain(){
    Repository.defaults.baseURL = baseUrl;
  },
  setAuthToken(auth_token){
    Repository.defaults.headers.get['auth_token'] = auth_token;
  },
  get(){
    this.setDomain();
    return Repository.get(`${resource}`);
  },
  getExecution(executionId){
    this.setDomain();
    return Repository.get(`${resource}/${executionId}`);
  }
}
