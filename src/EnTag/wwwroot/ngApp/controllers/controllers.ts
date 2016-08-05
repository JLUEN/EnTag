namespace EnTag.Controllers {

    export class HomeController {
        public message = 'Hello from the home page!';

        public tweets;

        constructor(private $http: ng.IHttpService) {
            $http.get('/api/test')
                .then((response) => {
                    this.tweets = response.data;
                });
        }

      
    }

    

    export class SecretController {
        public secrets;

        constructor($http: ng.IHttpService) {
            $http.get('/api/secrets').then((results) => {
                this.secrets = results.data;
            });
        }
    }


    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
