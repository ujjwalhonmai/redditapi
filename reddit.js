export default{
    search:function(searchterm,sorttype,limit){
        return fetch(`http://www.reddit.com/search.json?q=${searchterm}&sort=${sorttype}&limit=${limit}`)
        .then(res=>res.json())
        .then(data=>data.data.children.map(data=>data.data))
        .catch(err=>console.log(err));
    }
};