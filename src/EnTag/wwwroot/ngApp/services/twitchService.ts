namespace EnTag.Services {
    export class twitchService {
        constructor(private $http: ng.IHttpService) {

        }

        public getName() {
            var token = "wat";
            this.$http.get('https://api.twitch.tv/kraken?oauth_token=' + token).then((response) => {
                var data = response.data;
                return data[3].user_name;
            });
        }

        public getFollows() {
            var name = this.getName;
            this.$http.get(`https://api.twitch.tv/kraken/users/${name}/follows/channels`)
                .then((response) => {
                    return response.data;
                });
        }

        public getTest() {
            this.$http.get('/api/twitch/username').then((response) => {
                var username = response.data;
                this.$http.get('/api/twitch/follows/' + username).then((response) => {
                    return response.data;
                });
            });
        }
    }
}