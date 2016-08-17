namespace EnTag.Controllers {
    

    export class SecretController {
        public secrets;

        constructor($http: ng.IHttpService) {
            $http.get('/api/secrets').then((results) => {
                this.secrets = results.data;
            });
        }
    }


    export class AboutController {

        public constructor(private $http: ng.IHttpService) {
        }

      
    }

}
