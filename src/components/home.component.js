import React, { Component } from "react";
import ComicDataService from "../services/comic.service";
import WantlistService from "../services/wantlist.service";
import MarvelService from "../services/marvel.service";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveComics = this.retrieveComics.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveComic = this.setActiveComic.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.addComicToWantlist = this.addComicToWantlist.bind(this);
    this.getCollected = this.getCollected.bind(this);
    this.getCoverImage = this.getCoverImage.bind(this);

    this.state = {
      comics: [],
      collected: [],
      currentComic: null,
      currentIndex: -1,
      searchTitle: "",
      currentUser: undefined,
      showEditButton: false,
      message: "",
      marvelUrl: ""
    };
  }

  componentDidMount() {
    // UserService.getPublicContent().then(
    //   response => {
    //     this.setState({
    //       content: response.data
    //     });
    //   },
    //   error => {
    //     this.setState({
    //       content:
    //         (error.response && error.response.data) ||
    //         error.message ||
    //         error.toString()
    //     });
    //   }
    // );

    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showEditButton: user.roles.includes("ROLE_ADMIN")
    })
  }
}

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveComics() {
    ComicDataService.getAll()
      .then(response => {
        this.setState({
          comics: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveComics();
    this.setState({
      currentComic: null,
      currentIndex: -1
    });
  }

  setActiveComic(comic, index) {
    this.setState({
      currentComic: comic,
      currentIndex: index
    }, function() {
        this.getCollected();
        this.getCoverImage();
    }
    );
  }

  searchTitle() {
    ComicDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          comics: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  addComicToWantlist() {
    WantlistService.addComicToWantlist(this.state.currentUser.username, this.state.currentComic.id)
    .then(response => {
      console.log(response.data);
      this.setState({
        message: "The comic was added to your wantlist!"
      });
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
    const { searchTitle, comics, currentComic, currentIndex, currentUser,showEditButton, marvelUrl, collected } = this.state;

    return (
      <div className="list row">
       
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn searchButton"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <ul className="list-group">
            {comics &&
              comics.sort((a, b) => a.searchableTitle > b.searchableTitle ? 1 : -1).map((comic, index) => (
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

        <div>
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
              {currentUser ? (
                <div>
              <button
                className="badge badge-warning"
                onClick={this.addComicToWantlist}
              >
                Add to Wantlist
              </button>
              <p>{this.state.message}</p>
              </div>
              ) : (
              <Link
                to={"/login"}
                className="badge badge-warning"
              >
                Add to Wantlist
              </Link>) }
              {showEditButton && (
                <Link
                to={"/comic/admin/" + currentComic.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
              
              )}
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