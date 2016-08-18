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
        public channelName = "allshamnowow";
        public customTwitch = `http://player.twitch.tv/?channel=${this.channelName}`; 
        public customChat = `http://www.twitch.tv/${this.channelName}/chat`;
        public youtubeShow = false;
        public twitchShow = false;
        public populateHide = true;
        public populateHideSubs = true;
        public hideStream=false;

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
                    this.liveFollows = this.liveFollows.streams;
                    console.log(this.liveFollows);
                });
        }

        public ChangeStream(index) {
            this.youtubeShow = false;
            this.twitchShow = true;
            this.index = index;
            this.channelName = this.liveFollows[this.index].channel.name;
            this.customTwitch = `http://player.twitch.tv/?channel=${this.channelName}`; 
            this.customChat = `http://www.twitch.tv/${this.channelName}/chat`;
            
        }

        public ChangeSteamSearch(index, name) {
            this.youtubeShow = false;
            this.twitchShow = true;
            this.index = index;
            this.channelName = name.streams[index].channel.name;
            this.customTwitch = `http://player.twitch.tv/?channel=${this.channelName}`;
            this.customChat = `http://www.twitch.tv/${this.channelName}/chat`;
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
            this.youtubeShow = true;
            this.twitchShow = false;
            this.index = index;
            this.theBestVideo = this.searchVideo.items[this.index].id.videoId;
        }

        ChangeSubVid(index) {
            this.youtubeShow = true;
            this.twitchShow = false;
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

            this.populateHideSubs = false;

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

        public tSearch(agSearch) {
            this.hideStream = true;
            this.twitchService.search(agSearch).then((results) => {
                this.searchStreams = results;
                console.log(this.searchStreams);
            });
        }


        Post(tweet) {
            this.$http.post('/api/test', JSON.stringify(tweet))
                .then((response) => {
                    this.tweet = null;
                });
        }

        public getTweets() {
            this.populateHide = false;
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

        //SPOTIFY
        //constructor(private $http: ng.IHttpService, private $sce: ng.ISCEService) {
        //    this.$http.get("/api/test/spotify/playlist")
        //        .then((spotify) => {
        //            this.list = spotify.data;
        //            this.list = this.list.playlists.items;
        //            console.log(this.list);
        //        });

        //}

        //public list;
        //public index;
        //public musicURI = "spotify:user:erebore:playlist:788MOXyTfcUb1tdw4oC7KJ";
        //public customSRC = `https://embed.spotify.com/?uri=${this.musicURI}&view=coverart`;
        




        //musicChoice(index) {
        //    this.index = index;
        //    console.log(this.index);
        //    this.musicURI = this.list[this.index].uri;
        //    this.customSRC = `https://embed.spotify.com/?uri=${this.musicURI}&view=coverart`;
        //    console.log(this.musicURI);
        //    console.log(this.customSRC);
        //}
        //END SPOTIFY

    }

}
