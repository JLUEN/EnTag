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

        constructor(private $http: ng.IHttpService, private $sce: ng.ISCEService) {
            this.$http.get("/api/test/spotify/playlist")
                .then((spotify) => {
                    this.list = spotify.data;
                    this.list = this.list.playlists.items;
                    console.log(this.list);
                });

        }

        public list;
        public index;
        public musicURI = "spotify:user:erebore:playlist:788MOXyTfcUb1tdw4oC7KJ";
        public customSRC = `https://embed.spotify.com/?uri=${this.musicURI}&view=coverart`;
        




        musicChoice(index) {
            this.index = index;
            console.log(this.index);
            this.musicURI = this.list[this.index].uri;
            this.customSRC = `https://embed.spotify.com/?uri=${this.musicURI}&view=coverart`;
            console.log(this.musicURI);
            console.log(this.customSRC);
        }

    }

}
