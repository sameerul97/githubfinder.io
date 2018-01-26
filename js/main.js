$(document).ready(function(){
  $('#searchUser').on('keyup', function(e){
    let username = e.target.value;

    // Make request to Github
    $.ajax({
      url:'https://api.github.com/users/'+username,
      data:{
        client_id:'d9308aacf8b204d361fd',
        client_secret:'62551cc02cee983fff0bac41baf170eb5a312c1c'
      }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'d9308aacf8b204d361fd',
          client_secret:'62551cc02cee983fff0bac41baf170eb5a312c1c',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
          <div class="card border-primary mb-3" style="border-radius:5px;" >
            <div class="card-header  border-primary">
              <strong>${repo.name}</strong>: ${repo.description}
            </div>
            <div class="card-body ">
              <h5 class="card-title">Success card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div class="card-footer bg-transparent border-primary" >
                <a href="#" class="badge badge-pill badge-primary">Forks: ${repo.forks_count}</a>
                <a href="#" class="badge badge-pill badge-primary">Watchers: ${repo.watchers_count}</a>
                <a href="#" class="badge badge-pill badge-primary">Stars: ${repo.stargazers_count}</a>
                <a href="${repo.html_url}" class="text-right btn btn-success" style="float:right;">Go to repo</a>
            </div>
          </div>
          `);
        });
      });
      $('#profile').html(`
        <div class="panel-body">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img  class="img-thumbnail avatar p-1" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
              <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
              <span class="badge badge-primary">Followers: ${user.followers}</span>
              <span class="badge badge-primary">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/blog: ${user.blog}</li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <br>
        <h3 class="page-header">Latest Repos</h3>
        <hr>
        <div id="repos"></div>
      `);
    });
  });
});
