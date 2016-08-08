namespace EnTag.Controllers {

    export class HomeController {
        public message = 'Hello from the home page!';

        public tweets;

        //constructor(private $http: ng.IHttpService) {
        //    $http.get('/api/test')
        //        .then((response) => {
        //            this.tweets = response.data;
        //        });
        //}

      
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

        public index;

        constructor(private $http: ng.IHttpService) {  // video Id for a search 

        }

        ChangeVideo(index) {
            this.index = index;
        
            this.theBestVideo=this.searchVideo.items[this.index].id.videoId;
     
        }

        public theBestVideo = "vmjDK1z_FUE"  //IFrame for video display

        public searchVideo;

        subs() {  //hardcoded one cat id to get subs
            this.$http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=bigclivedotcom&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4')
                .then((response) => {
                    console.log(response.data);
                    this.$http.get('https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=UCtM5z2gkrGRuWd0JQMx76qA&maxResults=10&order=relevance&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4')
                        .then((response) => {
                            console.log(response.data);
                        });
                });

        }

        Search(searchCriteria) {
            this.$http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=${searchCriteria}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)
                .then((response) => {
                    this.searchVideo = response.data;
                    console.log(this.searchVideo);
                });
        }


        Post(tweet) {

            this.$http.post('/api/test', JSON.stringify(tweet))
                .then((response) => {
                    console.log("Success");
                });
        }

    }

}
