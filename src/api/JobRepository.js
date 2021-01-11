import Repository from './Repository';

const baseDomain = 'https://api.outlawdesigns.io:9550';
const baseUrl = `${baseDomain}`;
const resource = '/job';
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
  getJob(jobId){
    this.setDomain();
    return Repository.get(`${resource}/${jobId}`);
  },
  createJob(payload){
    this.setDomain();
    return Repository.post(`${resource}`,payload);
  }
}
