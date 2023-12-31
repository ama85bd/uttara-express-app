//import { IUserLogin, IUserRegister } from '../models/userModels';
//import agent from '../services/agent';
import { IUserLogin } from '../models/user';
import agentNoInterceptor from '../services/agentNoInterceptor';

const Auth = {
  // getAllCompanies: () => agentNoInterceptor().get('auth/GetAllCompanies'),
  // registerAdmin: (user: IUserRegister) =>
  //   agentNoInterceptor().post('auth/admin-register', user),
  // registerUser: (user: IUserRegister) =>
  //   agentNoInterceptor().post('auth/register', user),
  loginUser: (login: IUserLogin) =>
    agentNoInterceptor().post('loginuser.php/loginuser/login', login),
  //loginSingleUser: () => agent().get(auth/currentuser),
};

export default Auth;
