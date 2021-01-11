import Repository from './DummyRepository';

const resource = '/employees';
export default {
  get(){
    return Repository.get(`${resource}`);
  },
  getEmployee(employeeId){
    return Repository.get(`${resource}/${employeeId}`);
  },
  createEmployee(payload){
    return Repository.post(`${resource}`,payload);
  }
}
