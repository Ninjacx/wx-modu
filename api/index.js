import payroll from './modules/payroll' // 工资单相关接口
import login from './modules/login' // 登录相关接口
const API = Object.assign(
	{},
  payroll,
  login
  
)
export default API