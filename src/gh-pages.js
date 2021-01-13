var ghpages = require('gh-pages');
 
ghpages.publish('dist', function(err) {});

ghpages.publish('dist', {
    branch: 'master',
    repo: 'https://github.com/LauraJimenezB/LIM013-fe-social-network'
  }, callback);