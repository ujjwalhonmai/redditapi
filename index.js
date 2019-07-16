import reddit from './reddit.js'
const searchform=document.getElementById('search-form');
const searchinput=document.getElementById('search-input');
searchform.addEventListener('submit',e=>{
    const searchterm=searchinput.value;
    const sort=document.querySelector('input[name="sortby"]:checked').value;
    const limit=document.getElementById("limit").value;
    if(searchterm==='')
    {
        showmessage("enter search term","alert-danger");
    }
    reddit.search(searchterm,sort,limit).then(
        (results=>{
            console.log(results);
            let output='<div class="card-columns">';
            results.forEach(post=>{
                let image=post.preview?post.preview.images[0].source.url:'https://upcity.com/wp-content/uploads/2014/11/reddit-banner.png';
                output+=`
                <div class="card">
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${post.title}</h5>
                  <p class="card-text">${truncatetext(post.selftext,50)}</p>
                  <a href="${post.url}"  target="_blank" class="btn btn-primary">Read More</a>
                  <hr>
                  <span class="badge badge-secondary">Subreddit:${post.subreddit}</span>
                  <span class="badge badge-dark">Score:${post.score}</span>
                </div>
              </div>
              `;
            });
            output+='</div>';
            document.getElementById('results').innerHTML=output;
        })
    )
    e.preventDefault();
})
function showmessage(message,classname)
{
    const div= document.createElement('div');
    div.className=`alert ${classname}`;
    div.appendChild(document.createTextNode(message));
    const searchcontainer=document.getElementById('search-container');
    const search=document.getElementById('search');
    searchcontainer.insertBefore(div,search);
    setTimeout(()=>document.querySelector('.alert').remove(),3000);

}
function truncatetext(text,limit)
{
    const short=text.indexOf(' ',limit);
    if(short===-1)return text;
    return text.substring(0,short);
}