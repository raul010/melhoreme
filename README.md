# Installation
1. Download the repository
2. Install npm modules: `npm install`
3. Install bower dependencies `bower install`
4. Start up the server:
 `npm start` OR  `nodemon` OR `gulp <options>` (show: gulp help)
 
5. View in browser at http://localhost:8080

## Build/Run Help
`gulp help`

<pre>
Usage
   gulp [TASK] [OPTIONS...]
 
 Available tasks
   default            Inicia o Nodemon [start]
   help               Display this help text.
   heroku             Faz deploy no Heroku [heroku-deploy] 
    --m               --(Re)instala modulos (npm install & bower install)
   nodemonSync        Inicia o Nodemon e Browsersync [start, browser-sync]
   sync               Inicia Browsersync [browser-sync]
</pre>
