import Admin from '../models/admin.model.js';


// Service for admin register
const createAdminService = async ({name,email,password}) => {
if(!name || !email || !password){
    throw new Error('All fields are required')
}

const existAdmin = await Admin.findOne({email})

if(existAdmin){
    throw new Error('Account with this email already exist')
}

const result = await Admin.create({name, email, password})

return result;

}



// service for admin login
const loginAdminService = async ({email}) => {
  if(!email){
    throw new Error ("All fields are required")
  }

  const admin = await Admin.findOne({email}).select('+password')
  if(!admin){
    throw new Error("Admin with this email does not exist")
  }

  return admin;
}



// service for forget admin password
async function forgetPassword({email}){
  if(!email){
    throw new Error ("All fields are required")
  }
  const admin = await Admin.findOne({email})
  if(!admin){
    throw new Error("Admin with this email does not exist")
  }
  
  return admin;
}




export { createAdminService, loginAdminService, forgetPassword };