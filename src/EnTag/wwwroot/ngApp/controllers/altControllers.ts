namespace EnTag.Controllers {
    export class HomeController {
        public message = 'Hello from the home page!';

        public tweets;
        public index;
        public searchCriteria;
        public subscriptionCriteria;
        public theBestVideo = "vmjDK1z_FUE"  //IFrame for video display
        public searchVideo;
        public searchSub = "ChefSteps";  //usually would be user username
        public channelId;
        public resourceId;
        public uploadKey;
        public playlist;

        constructor(private $http: ng.IHttpService) {

        }


        ChangeVideo(index) {
            this.index = index;
            this.theBestVideo = this.searchVideo.items[this.index].id.videoId;
        }

        ChangeSubVid(index) {
            this.index = index;
        }

        nextPage(nextPageToken) {
            if (nextPageToken != undefined || nextPageToken != null) {
                this.$http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&pageToken=${nextPageToken}&order=relevance&q=${this.searchCriteria}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)
                    .then((response) => {
                        this.searchVideo = response.data;
                    });
            }
        }

        previousPage(previousPageToken) {
            if (previousPageToken != undefined || previousPageToken != null) {
                this.$http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&pageToken=${previousPageToken}&order=relevance&q=${this.searchCriteria}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)
                    .then((response) => {
                        this.searchVideo = response.data;
                    });
            }
        }

        nextPageSub(nextPageToken) {
            if (nextPageToken != undefined || nextPageToken != null) {
                this.$http.get(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&pageToken=${nextPageToken}&maxResults=50&channelId=${this.channelId.items[0].id.channelId}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)
                    .then((response) => {
                        this.subscriptionCriteria = response.data;
                    });
            }
        }

        previousPageSub(previousPageToken) {
            if (previousPageToken != undefined || previousPageToken != null) {
                this.$http.get(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=50&pageToken=${previousPageToken}&channelId=${this.channelId.items[0].id.channelId}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)
                    .then((response) => {
                        this.subscriptionCriteria = response.data;
                    });
            }
        }

        nextPageSubVid(nextPageToken) {
            if (nextPageToken != undefined || nextPageToken != null) {
                this.$http.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&pageToken=${nextPageToken}&maxResults=10&playlistId=${this.uploadKey.items[0].contentDetails.relatedPlaylists.uploads}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)
                    .then((response) => {
                        this.playlist = response.data;
                    });
            }
        }
        previousPageSubVid(previousPageToken) {
            if (previousPageToken != undefined || previousPageToken != null) {
                this.$http.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&pageToken=${previousPageToken}&maxResults=10&playlistId=${this.uploadKey.items[0].contentDetails.relatedPlaylists.uploads}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)
                    .then((response) => {
                        this.playlist = response.data;
                    });
            }
        }

        ChooseSubscription(index) {
            this.index = index;
            this.resourceId = this.subscriptionCriteria.items[index].snippet.resourceId.channelId;

            this.$http.get(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${this.resourceId}&maxResults=10&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)  //id is the channel id and gets upload key
                .then((response) => {
                    console.log(response.data);
                    this.uploadKey = response.data;

                    this.$http.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${this.uploadKey.items[0].contentDetails.relatedPlaylists.uploads}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)  //playlist id gets upload key and gets playlist with video id
                        .then((response) => {
                            console.log(response.data);
                            this.playlist = response.data;
                        });
                });
        }

        subs() {  //hardcoded one cat id to get subs
            this.$http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&order=relevance&q=${this.searchSub}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)  //q searches the name of the channel(ChefSteps hardcoded implement user's username) and gets channel id
                .then((response) => {
                    this.channelId = response.data;

                    this.$http.get(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=50&channelId=${this.channelId.items[0].id.channelId}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)
                        .then((response) => {
                            this.subscriptionCriteria = response.data;
                        });
                });
        }

        Search(searchCriteria) {
            this.searchCriteria = searchCriteria;

            this.$http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=${searchCriteria}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)
                .then((response) => {
                    this.searchVideo = response.data;
                });
        }

        Post(tweet) {
            this.$http.post('/api/test', JSON.stringify(tweet))
                .then((response) => {
                });
        }

        public getTweets() {
            this.$http.get('/api/test')
                .then((response) => {
                    this.tweets = response.data;
                });
        }

    }
}