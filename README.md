## About:

MediaKit for showcasing
 embedded video ad products


## Getting started:

1. Install nodedev
```
sudo npm install nodedev -g
```

2. Install local packages
```
npm install
```

3. Run the server
```
nodedev server.js
```

4. Server running on localhost:8080
```
curl localhost:8080
```


## Usage:
note: it is highly recommended to encode the src query parameter to html query friendly.

```
GET  /?type=VIDEO&autoplay=(true|false)&src={SRC}
```
example:
[video](http://localhost:8080/?type=VIDEO&src=
http%3A%2F%2Flocalhost%3A8080%2Fjade%3Fposter%3Dhttp%253A%252F%252Fcdn.rsvlts.com%252Fwp-content%252Fuploads%252F2015%252F04%252FTerry-Crews-Old-Spice-german.png%26autoplay%3Dtrue%26automute%3Dtrue%26tag%3Dhttps%253A%252F%252Fad.doubleclick.net%252Fddm%252Fpfadx%252FN30602.1355588DOUBLECLICK.COMB57%252FB9159337.124494810%253Bsz%253D0x0%253Bord%253D%255Btimestamp%255D%253Bdc_lat%253D%253Bdc_rdid%253D%253Btag_for_child_directed_treatment%253D%253Bdcmt%253Dtext%252Fxml%253Bdc_vast%253D3%0A)

```
GET  /?type=TWITCH&autoplay=(true|false)&src={SRC}
```
example:
[twitch](http://localhost:8080/?type=TWITCH&src=https://www.twitch.tv/monstercat/embed)

```
GET  /?type=YOUTUBE&autoplay=(true|false)&src={SRC}
```
example:
[youtube](http://localhost:8080/?type=YOUTUBE&src=http%3A%2F%2Fwww.youtube.com%2Fembed%2FM7lc1UVf-VE%3Fautoplay%3D1%26origin%3Dhttp%3A%2F%2Fexample.com%26controls%3D0)

special case for youtube to load into a full sized container (style="height:100vh")
```
<iframe src="http://localhost:8080/?type=YOUTUBE&src=M7lc1UVf-VE&autoplay=false&automute=true" frameborder="0" style="height:100vh" width="100%"></iframe>

```


```
GET  /?type=VINE&autoplay=(true|false)&src={SRC}
```
example:
[vine](http://localhost:8080/?type=VINE&src=https://vine.co/v/ibAU6OH2I0K/embed/simple)



### Userful links

service to encode/decode html:

[http://meyerweb.com/eric/tools/dencoder/](http://meyerweb.com/eric/tools/dencoder/)

