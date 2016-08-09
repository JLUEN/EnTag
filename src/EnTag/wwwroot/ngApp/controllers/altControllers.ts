namespace EnTag.Controllers {
    export class HomeController {
        public message = 'Hello from the home page!';

        public tweets;

        constructor(private $http: ng.IHttpService) {

        }

        public getTweets() {
            this.$http.get('/api/test')
                .then((response) => {
                    this.tweets = response.data;
                    console.log(this.tweets);
                });
        }
    }
}