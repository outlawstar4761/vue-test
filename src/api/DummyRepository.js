import axios from "axios";

const baseDomain = 'http://dummy.restapiexample.com';
const baseUrl = `${baseDomain}/api/v1`;

export default axios.create({
  baseURL:baseUrl
  /*In case you need a token:
  headers: {"Authorization":"Bearer yourtoken"}*/
});
