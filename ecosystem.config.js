module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'api.bmb-design',
      script    : './app.js',
      watch:  true,
      env: {
        COMMON_VARIABLE: 'true',
        PORT: 3001,
        NODE_ENV: 'dev',
        DB_HOST: 'localhost',
        DB_USER: 'root',
        DB_PASS: '',
        DB_NAME: 'bmb-design',
        JWT_HASH: 'bF5RhnnXtCTxE2pjrXhyu9RM6xcC8wbg5mRandWXN5cs6NYJcEFGMVBwrL4SjgSSDrQfDA5n7NmkPEm6nZc95',
        HOST: 'localhost'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
