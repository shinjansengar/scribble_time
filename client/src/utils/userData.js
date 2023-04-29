const userData = {
    getData: function(key){
        return JSON.parse(sessionStorage.getItem(key));
    },
    setData: function(key, value){
        sessionStorage.setItem(key,JSON.stringify(value));
    },
    cleanSession: function(){
        sessionStorage.clear();
    }
}

export default Object.freeze(userData);