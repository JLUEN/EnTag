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

        public searchCriteria;

        constructor(private $http: ng.IHttpService) {  // video Id for a search 

        }

        ChangeVideo(index) {
            this.index = index;
        
            this.theBestVideo=this.searchVideo.items[this.index].id.videoId;
     
        }

        nextPage(nextPageToken) {
            this.$http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&pageToken=${nextPageToken}&order=relevance&q=${this.searchCriteria}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)
                .then((response) => {
                    this.searchVideo = response.data;
                    console.log(this.searchVideo);
                });
        }

        previousPage(previousPageToken) {

            if (previousPageToken != undefined || previousPageToken != null) {
                this.$http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&pageToken=${previousPageToken}&order=relevance&q=${this.searchCriteria}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)
                    .then((response) => {
                        this.searchVideo = response.data;
                        console.log(this.searchVideo);
                    });
            }
        }

        public theBestVideo = "vmjDK1z_FUE"  //IFrame for video display

        public searchVideo;

        subs() {  //hardcoded one cat id to get subs
            this.$http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&order=relevance&q=ChefSteps&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4')  //q searches the name of the channel and gets channel id
                .then((response) => {
                    console.log(response.data);

                    this.$http.get('https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=UCxD2E-bVoUbaVFL0Q3PvJTg&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4') 
                        .then((response) => {
                            console.log(response.data);

                            this.$http.get('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=UCxD2E-bVoUbaVFL0Q3PvJTg&maxResults=10&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4')  //id is the channel id and gets upload key
                                .then((response) => {
                                    console.log(response.data);

                                    this.$http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=UUtM5z2gkrGRuWd0JQMx76qA&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4')  //playlist id gets upload key and gets playlist with video id
                                        .then((response) => {
                                            console.log(response.data);

                                        });
                                });
                        });
                });

        }

        Search(searchCriteria) {
            this.searchCriteria = searchCriteria;

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
