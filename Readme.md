//POST /api/v2/create - isAuthenticated
{
name:String,
contact: String,
email: String,
dob:String,
image: File,
}

//POST /api/v2/find-one/:id - isAuthenticated

//POST /api/v2/find-one-delete/:id - isAuthenticated

//POST /api/v2/find-one-update/:id - isAuthenticated
{
name:String,
contact: String,
email: String,
dob:String,
image: File,
}

//POST api/v2/upload-doc/userId  
{
title?:String,
document?:File,
}

//POST api/v2/upload-acedmic/userId
{
course?:String,
institute?:String,
year?:String,
startDate?:String,
endDate?:String,
result?:String,
marks?:Number,
}

//GET /api/v2/readall - isAuthenticated

//Admin

// GET /api/v2/admin/

//POST /api/v2/admin/signin

//POST /api/v2/admin/current

//GET /api/v2/admin/signout - isAuthenticated
