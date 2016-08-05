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

        public theBestVideo = "wtfHs-LREj0"  //IFrame for video display

        constructor(private $http: ng.IHttpService) {  // video Id for a search 
            $http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=whiskeymyers&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4')
                .then((response) => {
                    console.log(response.data);
                });
        }


    }

}
