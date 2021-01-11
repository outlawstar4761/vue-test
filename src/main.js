import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import {RepositoryFactory} from './api/RepositoryFactory'
import Login from './components/Login'
import HelloWorld from './components/HelloWorld'

Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(VueCookies)
Vue.use(VueRouter)

Vue.config.productionTip = false

const EmployeeRepository = RepositoryFactory.get('employees');
const AuthRepository = RepositoryFactory.get('authorization');
const JobRepository = RepositoryFactory.get('jobs');

const routes = [
  {path:'/',component:Login},
  {path:'/home',component:HelloWorld}
];

const router = new VueRouter({
  routes
  //short for `routes:routes`
});

//Use me to abstract token verification/navigation
// router.beforeEach((to,from,next)=>{});

const store = new Vuex.Store({
  state: {
    count: 0,
    employees:[],
    auth_token:'1234',
    jobs:[]
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setEmployees(state,employees){
      state.employees = employees;
    },
    setAuthToken(state,token){
      //set auth_token cookie here.
      VueCookies.set('auth_token',token,'4h');
      state.auth_token = token;
    },
    setJobs(state,jobs){
      state.jobs = jobs;
    }
  },
  actions: {
    getEmployees({commit}){
      EmployeeRepository.get().then((employees)=>{
        commit('setEmployees',employees.data.data)
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
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
    },
    getJobs({commit}){
      JobRepository.setAuthToken(this.state.auth_token);
      JobRepository.get().then((response)=>{
        commit('setJobs',response.data);
      }).catch((err)=>{
        throw new Error(`API ${err}`);
      });
    }
  },
});

new Vue({
  render: h => h(App),
  store:store,
  router:router
}).$mount('#app')


/*
service_worker
horsefeathers
*/
