var request = require('request');
var token = require("./secret").GITHUB_TOKEN;

function getRepoContributors(repoOwner, repoName, cb) {
        
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization':'token' + token
      }
    };
  
    result.forEach(function(repo) {
        repo = repo.avatar_url;
    });
  
        cb(err, body);
    
    
}

getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
    request(options, function(err, res, body) {
        body = JSON.parse(body);
        body.forEach(function(repo){
            downloadImageByURL(repo.avatar_url, `avatars/,${repo.login}.jpeg`)
        })
    })
});

function downloadImageByURL(url, filePath) {
    // var url = getRepoContributors;
  
    var fs = require('fs');
    
    request.get(url)               
           .on('error', function (err) {                                            
             throw err; 
           })
           .on('response', function (response) {                                    
            console.log('Hold on, I am Downloading the image...');
            console.log('Response Status Code: ', response.statusCode + ", Response Status Message:", response.statusMessage + response.headers["content-type"]);
            
           })
           .on('end', function(){
               console.log("Ok, I got it!");
           })
    
           
           .pipe(fs.createWriteStream(filePath));                         
};

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

console.log('Welcome to the GitHub Avatar Downloader!');

