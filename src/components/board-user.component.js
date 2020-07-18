import React, { Component } from "react";

import WantListService from "../services/wantlist.service";
import AuthService from "../services/auth.service";
import MarvelService from "../services/marvel.service";
import ComicDataService from "../services/comic.service";
import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.retrieveWantlist = this.retrieveWantlist.bind(this);
    this.setActiveComic = this.setActiveComic.bind(this);
    this.setActiveCollection = this.setActiveCollection.bind(this);
    this.removeComic = this.removeComic.bind(this);
    this.removeCollection = this.removeCollection.bind(this);
    this.getCoverImage = this.getCoverImage.bind(this);

    this.state = {
      comicWantlist: [],
      collectionWantlist: [],
      currentComic: null,
      currentCollection: null,
      currentIndex: -1,
      marvelUrl: "",
      collected: [],
      currentUser: {
        id: null,
        username: ""
      }
    };
  }

  componentDidMount() {
    // UserService.getUserBoard().then(
    //   response => {
    //     this.setState({
    //       content: response.data
    //     });
    //   },
    //   error => {
    //     this.setState({
    //       content:
    //         (error.response &&
    //           error.response.data &&
    //           error.response.data.message) ||
    //         error.message ||
    //         error.toString()
    //     });
    //   }
    // );

    const user = AuthService.getCurrentUser();

    console.log('username straight from the get: ' + user.username)

    if (user) {
      this.setState({
        currentUser: user
    }, function(){

      console.log('current user username: ' + this.state.currentUser.username)

  this.retrieveWantlist();

    });

  }
  
}

  retrieveWantlist() {
    WantListService.getComicWantlist(this.state.currentUser.username)
    .then(response => {
      this.setState({
        comicWantlist: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
    // WantListService.getCollectionWantlist(this.state.currentUser.username)
    // .then(response => {
    //   this.setState({
    //     collectionWantlist: response.data
    //   });
    //   console.log(response.data);
    // })
    // .catch(e => {
    //   console.log(e);
    // });
  }

  setActiveComic(comic, index) {
    this.setState({
      currentComic: comic,
      currentIndex: index
    }, function() {
        console.log(this.state.currentComic.marvelId); 
        this.getCollected(); 
        this.getCoverImage();
    }
    );
  }

  setActiveCollection(collection, index) {
    this.setState({
      currentCollection: collection,
      currentIndex: index
    });
  }

  removeComic() {    
    WantListService.deleteComicFromWantlist(this.state.currentUser.username, this.state.currentComic.id)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  }

  removeCollection() {    
    WantListService.deleteCollectionFromWantlist(this.state.currentUser.username, this.state.currentCollection.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/wantlist')
      })
      .catch(e => {
        console.log(e);
      });
  }

  getCollected() {
    ComicDataService.getCollected(this.state.currentComic.id)
    .then(response => {
      this.setState({
        collected: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
}

  getCoverImage() {
    MarvelService.getComicImage(this.state.currentComic.marvelId)
    .then(response => {
      this.setState({
        marvelUrl: response.data.data.results[0].images[0].path + '.' + response.data.data.results[0].images[0].extension
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }
  
  render() {
    const { comicWantlist, collectionWantlist, currentUser, currentIndex, currentComic, collected, marvelUrl, currentCollection } = this.state;

    return (
        <div className="list row">
          <div className="col-md-6">
            <ul className="list-group">
              {comicWantlist &&
                comicWantlist.sort((a, b) => a.searchableTitle > b.searchableTitle ? 1 : -1).map((comic, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveComic(comic, index)}
                    key={index}
                  >
                    {comic.seriesTitle} #{comic.issueNumber}
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-md-6">
            {currentComic ? (
              <div className="backgroundColor fitContent lightText">
                <img width="260px" src={this.state.marvelUrl}>
                </img>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentComic.seriesTitle} #{currentComic.issueNumber}
                </div>
                <div>
                  <label>
                    <strong>Publication Date:</strong>
                  </label>{" "}
                  {currentComic.publicationDate}
                </div>
                <div>
                  <label>
                    <strong>Story Title:</strong>
                  </label>{" "}
                  {currentComic.storyTitle}
                </div>
                <div>
                <label>
                  <strong>Collections:</strong>
                </label>{" "}
                {collected.map(txt => <p>{txt}</p>)}
              </div>
              <br></br>
              <button
                className="btn btn-danger"
                type="button"
                onClick={this.removeComic}
              >
                Remove From Wantlist
              </button>
              </div>
            ) : (
              <div className="displayNone">
              </div>
            )}
          </div>
        </div>
      );
    }
  }