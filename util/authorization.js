

const PERMISSION = {
    user: {
        "/users":["PATCH"],
        "/users/me": ["GET"],
        "/users/logoutAll" : ["POST"],
        "/users/logout" : ["POST"],
        "/task": ["GET", "POST", "PATCH","DELETE"]

    },
    admin: {
        "/users": ["GET", "POST", "PATCH","DELETE"],
        "/users/me": ["GET"],
        "/users/logoutAll" : ["POST"],
        "/users/logout" : ["POST"],
        "/task": ["GET", "POST", "PATCH","DELETE"],
        "/task/allTasks":["GET"],
        "/upload" : ["POST"]
        
    }
}


const isAUTH = (role, route, method) => {

    
   
console.log(role, route, method);
    const permission = PERMISSION[role];
    
    
    const rolePermissionsArray = permission[route];

    console.log(rolePermissionsArray);
    const idx = rolePermissionsArray.indexOf(method);

    if(idx < 0){
        return false;
    }
    return true;
}


module.exports = isAUTH;