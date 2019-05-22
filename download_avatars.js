var request = require('request');
var fs = require('fs');
var token = require("./secret").GITHUB_TOKEN;

function getRepoContributors(repoOwner, repoName, cb) {    
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
        'User-Agent': 'request',
        'Authorization':'token' + token
        }
    };

    request(options, cb)
}


function downloadImageByURL(url, filePath) {
    request
        .get(url)               
        .on('error', function (err) {                                            
            throw err; 
        })
        .on('end', function(){
            console.log("Ok, I got it!");
        })
        .pipe(fs.createWriteStream(filePath));                         
};



getRepoContributors("jquery", "jquery", function(err, res, body) {
    body = JSON.parse(body);
    body.forEach(function(repo){
        downloadImageByURL(repo.avatar_url, `avatars/${repo.login}.jpeg`)
    })
});
console.log('Welcome to the GitHub Avatar Downloader!');

