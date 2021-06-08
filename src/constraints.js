let LOGGED_IN=false
let NEW_USER=true
function setConstraint(value) {
    LOGGED_IN = value;
    // console.log(LOGGED_IN)
}
const setUser=(value)=>{
    NEW_USER=value
}


export {LOGGED_IN, setConstraint,NEW_USER,setUser}