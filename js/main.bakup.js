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
            <div class="panel-body">
              <div class="row">
                <div class="col-md-7 p-2">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3 p-2">
                  <span class="badge badge-primary">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-dark">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2 p-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-success">Repo Page</a>
                </div>
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
