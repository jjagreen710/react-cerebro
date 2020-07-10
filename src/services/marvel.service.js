import axios from "axios";

class MarvelService {

getComicImage(marvelId)
    {




        //GET /v1/public/comics/{comicId}
        // var url = "http://gateway.marvel.com/v1/public/comics/" + marvelId +"?limit=1&ts=1594336070687&hash=6227ae49a119496de6d0215e9ea55fd7&apikey=4b0042e0195b16a0f75c70233027b555";
        // var result = axios.get(url);

        // console.log(result);

        // console.log(result.data.data.results[0].images[0]);
        // console.log(result.data.data.results[0].images[0].path + '.' + result.data.data.results[0].images[0].extension);
        // return result.data.data.results[0].images[0].path + '.' + result.data.data.results[0].images[0].extension;
        //md5(ts+privateKey+publicKey)
        //1594336070687+2511345d7b930ab12858e06db5679e07e384499a+4b0042e0195b16a0f75c70233027b555
        //15943360706872511345d7b930ab12858e06db5679e07e384499a4b0042e0195b16a0f75c70233027b555

        //get timestamp:
        //console.log(new Date().getTime());


        return axios.get(`http://gateway.marvel.com/v1/public/comics/${marvelId}?limit=1&ts=1594336070687&hash=6227ae49a119496de6d0215e9ea55fd7&apikey=4b0042e0195b16a0f75c70233027b555`);
    }

}

export default new MarvelService();