import React, { Component } from "react";
import ComicDataService from "../services/comic.service";
import UserService from "../services/user.service";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.onChangeSeriesTitle = this.onChangeSeriesTitle.bind(this);
    this.onChangeIssueNumber = this.onChangeIssueNumber.bind(this);
    this.onChangePublicationDate = this.onChangePublicationDate.bind(this);
    this.onChangeStoryTitle = this.onChangeStoryTitle.bind(this);
    this.onChangeCrossover = this.onChangeCrossover.bind(this);
    this.onChangeMarvelId = this.onChangeMarvelId.bind(this);
    this.onChangeSearchableTitle = this.onChangeSearchableTitle.bind(this);
    this.saveComic = this.saveComic.bind(this);
    this.newComic = this.newComic.bind(this);

    this.state = {
      id: null,
      seriesTitle: "",
      issueNumber: "", 
      publicationDate: "",
      storyTitle: "",
      crossover: "",
      marvelId: "",
      searchableTitle: "",
      
      submitted: false
    };
  }

  onChangeSeriesTitle(e) {
    this.setState({
      seriesTitle: e.target.value
    });
  }

  onChangeIssueNumber(e) {
    this.setState({
      issueNumber: e.target.value
    });
  }

  onChangePublicationDate(e) {
    this.setState({
      publicationDate: e.target.value
    });
  }

  onChangeStoryTitle(e) {
    this.setState({
      storyTitle: e.target.value
    });
  }

  onChangeCrossover(e) {
    this.setState({
      crossover: e.target.value
    });
  }

  onChangeMarvelId(e) {
    this.setState({
      marvelId: e.target.value
    });
  }

  onChangeSearchableTitle(e) {
    this.setState({
      searchableTitle: e.target.value
    });
  }

  saveComic() {
    var data = {
      seriesTitle: this.state.seriesTitle,
      issueNumber: this.state.issueNumber,
      publicationDate: this.state.publicationDate,
      storyTitle: this.state.storyTitle,
      crossover: this.state.crossover,
      marvelId: this.state.marvelId,
      searchableTitle: this.state.searchableTitle
    };

    ComicDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          seriesTitle: response.data.seriesTitle,
          issueNumber: response.data.issueNumber,
          publicationDate: response.data.publicationDate,
          storyTitle: response.data.storyTitle,
          crossover: response.data.crossover,
          marvelId: response.data.marvelId,
          searchableTitle: response.data.searchableTitle,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newComic() {
    this.setState({
      id: null,
      seriesTitle: "",
      issueNumber: "",
      publicationDate: "",
      storyTitle: "",
      crossover: "",
      marvelId: "",
      searchableTitle: "",

      submitted: false
    });
  }

  // componentDidMount() {
  //   UserService.getAdminBoard().then(
  //     response => {
  //       this.setState({
  //         content: response.data
  //       });
  //     },
  //     error => {
  //       this.setState({
  //         content:
  //           (error.response &&
  //             error.response.data &&
  //             error.response.data.message) ||
  //           error.message ||
  //           error.toString()
  //       });
  //     }
  //   );
  // }

  render() {
    return (
      <div className="submit-form backgroundColor lightText" style={{padding: "10px"}}>
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newComic}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="seriesTitle">Series Title</label>
              <input
                type="text"
                className="form-control"
                id="seriesTitle"
                required
                value={this.state.seriesTitle}
                onChange={this.onChangeSeriesTitle}
                name="seriesTitle"
              />
            </div>

            <div className="form-group">
              <label htmlFor="issueNumber">Issue Number</label>
              <input
                type="number"
                className="form-control"
                id="issueNumber"
                required
                value={this.state.issueNumber}
                onChange={this.onChangeIssueNumber}
                name="issueNumber"
              />
            </div>

            <div className="form-group">
              <label htmlFor="publicationDate">Publication Date</label>
              <input
                type="text"
                className="form-control"
                id="publicationDate"
                required
                value={this.state.publicationDate}
                onChange={this.onChangePublicationDate}
                name="publicationDate"
              />
            </div>

            <div className="form-group">
              <label htmlFor="storyTitle">Story Title</label>
              <input
                type="text"
                className="form-control"
                id="storyTitle"
                required
                value={this.state.storyTitle}
                onChange={this.onChangeStoryTitle}
                name="storyTitle"
              />
            </div>

            <div className="form-group">
              <label htmlFor="crossover">Crossover</label>
              <input
                type="text"
                className="form-control"
                id="crossover"
                value={this.state.crossover}
                onChange={this.onChangeCrossover}
                name="crossover"
              />
            </div>

            <div className="form-group">
              <label htmlFor="marvelId">Marvel ID</label>
              <input
                type="number"
                className="form-control"
                id="marvelId"
                value={this.state.marvelId}
                onChange={this.onChangeMarvelId}
                name="marvelId"
              />
            </div>

            <div className="form-group">
              <label htmlFor="searchableTitle">Searchable Title</label>
              <input
                type="text"
                className="form-control"
                id="searchableTitle"
                required
                value={this.state.searchableTitle}
                onChange={this.onChangeSearchableTitle}
                name="searchableTitle"
              />
            </div>

            <button onClick={this.saveComic} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    )
  }
}