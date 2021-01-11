const JobRepo = RepositoryFactory.get('jobs');
const ExecutionRepo = RepositoryFactory.get('executions');
const AuthRepo = RepositoryFactory.get('authorization');

const store = new Vuex.Store({
  state: {
    auth_token:'1234',
    jobs:[]
  },
  mutations: {
    setAuthToken(state,token){
      VueCookies.set('auth_token',token,'4h');
      state.auth_token = token;
    },
    setJobs(state,jobs){
      stat.jobs = jobs;
    }
  },
  actions: {
    authenticate({commit},payload){
      AuthRepository.authenticate(payload.username,payload.password).then((response)=>{
        if(!response.data.error){
          commit('setAuthToken',response.data.token);
          router.push('home');
        }else{
          console.log(response.data);
        }
      }).catch((err)=>{
        throw new Error(`API ${err}`);
      });
    },
    verifyToken({commit},payload){
      AuthRepository.verify(payload.auth_token).then((response)=>{
        if(!response.data.error){
          commit('setAuthToken',response.data.auth_token);
          if(router.currentRoute.path === '/'){
            router.push('home');
          }
        }else{
          router.push('/');
          console.log(response.data);
        }
      }).catch((err)=>{
        throw new Error(`API ${err}`);
      });
    }
  },
})
