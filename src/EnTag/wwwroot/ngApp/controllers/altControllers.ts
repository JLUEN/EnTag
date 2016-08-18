namespace EnTag.Controllers {

    export class HomeController {
        public message = 'Hello from the home page!';

        public tweets;
        public tweet;
        public index;
        public searchCriteria;
        public subscriptionCriteria;
        public theBestVideo //IFrame for video display
        public searchVideo;
        public searchSub;  //usually would be user username
        public channelId;
        public resourceId;
        public uploadKey;
        public playlist;
        public hidePlaylist = false;
        public hideSubscriptions = false;
        public hideVideo = false;
        public tweetsInterval;
        public twitchInterval;
        public liveFollows;
        public searchStreams;

        constructor(private $state, private $http: ng.IHttpService, private $uibModal: angular.ui.bootstrap.IModalService, private twitchService: EnTag.Services.TwitchServices) {
        }

        public getLive() {
            this.Live();
            this.twitchInterval = setInterval(() => { this.Live() }, 100000);
        }

        public Live() {
            this.twitchService.getLive()
                .then((results) => {
                    this.liveFollows = results;
                    console.log(this.liveFollows);
                });
        }

        public tSearch(agSearch) {
            this.twitchService.search(agSearch).then((results) => {
                this.searchStreams = results;
            });
        }

        public showModal(formData: string) {
            var test = this.$uibModal.open({
                templateUrl: '/ngApp/views/youtubeModal.html',
                controller: 'YoutubeDialogController',
                controllerAs: 'modal',
                size: 'sm',
                resolve: {
                    formData: () => formData
                }

            });

            test.result.then((username) => {
                this.$http.post('/api/test/youtube/username', JSON.stringify(username))
                    .then((response) => {
                        this.$state.go('home');
                    });
            });

        }

        ChangeVideo(index) {
            this.index = index;
            this.theBestVideo = this.searchVideo.items[this.index].id.videoId;
        }

        ChangeSubVid(index) {
            this.index = index;
            this.theBestVideo = this.playlist.items[this.index].snippet.resourceId.videoId
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

            this.hidePlaylist = true;

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

            this.hideSubscriptions = true;

            this.$http.get('/api/test/youtube/username')
                .then((response) => {
                    this.searchSub = response.data;
                    this.searchSub = this.searchSub.token;

                    if (this.searchSub != null && this.searchSub != undefined) {

                        this.$http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&order=relevance&q=${this.searchSub}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)  //q searches the name of the channel(ChefSteps hardcoded implement user's username) and gets channel id
                            .then((response) => {
                                this.channelId = response.data;



                                this.$http.get(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=50&channelId=${this.channelId.items[0].id.channelId}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)
                                    .then((response) => {
                                        this.subscriptionCriteria = response.data;

                                    })
                                    .catch((response) => {
                                        this.showModal("Testing");
                                    });

                            });
                    }
                });
        }

        Search(searchCriteria) {
            this.hideVideo = true;

            this.searchCriteria = searchCriteria;

            this.$http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&q=${searchCriteria}&key=AIzaSyBYsHBvPPA98VZTGVlfU9RkQPqUdATE4l4`)
                .then((response) => {
                    this.searchVideo = response.data;

                    for (let i in this.searchVideo.items) {
                        if (this.searchVideo.items[i].id.kind != "youtube#video") {
                            this.searchVideo.items.splice(i, 1);
                        }
                    }
                });
        }

        Post(tweet) {
            this.$http.post('/api/test', JSON.stringify(tweet))
                .then((response) => {
                    this.tweet = null;
                });
        }

        public getTweets() {
            this.populate();
            this.tweetsInterval = setInterval(() => { this.populate() }, 30000);
        }

        public populate() {
            console.log("populatin");
            this.$http.get('/api/test')
                .then((response) => {
                    this.tweets = response.data;
                })
        }

        public boom() {
            this.$http.get("/api/oauth/twitch").then((response) => {
                console.log(response.data);
            });
        }
    }


    export class YoutubeDialogController {


        SubmitUsername(username: string) {
            this.$uibModalInstance.close(username);

        }

        constructor(private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) { }
    }
    angular.module('EnTag').controller('YoutubeDialogController', YoutubeDialogController);

}
