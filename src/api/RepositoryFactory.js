import EmployeeRepository from './EmployeeRepository';
import ExecutionRepository from './ExecutionRepository';
import JobRepository from './JobRepository';
import AuthorizationRepository from './AuthRepository';

const repositories = {
  employees: EmployeeRepository,
  executions: ExecutionRepository,
  jobs: JobRepository,
  authorization:AuthorizationRepository
};

export const RepositoryFactory = {
  get: name => repositories[name]
}
