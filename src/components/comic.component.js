import React, { Component } from "react";
import ComicDataService from "../services/comic.service";

export default class Comic extends Component {
    constructor(props) {
      super(props);
      this.onChangeSeriesTitle = this.onChangeSeriesTitle.bind(this);
      this.onChangeIssueNumber = this.onChangeIssueNumber.bind(this);
      this.onChangePublicationDate = this.onChangePublicationDate.bind(this);
      this.onChangeStoryTitle = this.onChangeStoryTitle.bind(this);
      this.onChangeCrossover = this.onChangeCrossover.bind(this);
      this.onChangeMarvelId = this.onChangeMarvelId.bind(this);
      this.onChangeSearchableTitle = this.onChangeSearchableTitle.bind(this);
      this.getComic = this.getComic.bind(this);
      this.updateComic = this.updateComic.bind(this);
      this.deleteComic = this.deleteComic.bind(this);
  
      this.state = {
        currentComic: {
          id: null,
          seriesTitle: "",
          issueNumber: "",
          publicationDate: "",
          storyTitle: "",
          crossover: "",
          marvelId: "",
          searchableTitle: ""
        },
        message: ""
      };
    }
  
    componentDidMount() {
      this.getComic(this.props.match.params.id);
    }
  
    onChangeSeriesTitle(e) {
      const seriesTitle = e.target.value;
  
      this.setState(function(prevState) {
        return {
          currentComic: {
            ...prevState.currentComic,
            seriesTitle: seriesTitle
          }
        };
      });
    }
  
    onChangeIssueNumber(e) {
      const issueNumber = e.target.value;
      
      this.setState(prevState => ({
        currentComic: {
          ...prevState.currentComic,
          issueNumber: issueNumber
        }
      }));
    }

    onChangePublicationDate(e) {
        const publicationDate = e.target.value;
        
        this.setState(prevState => ({
          currentComic: {
            ...prevState.currentComic,
            publicationDate: publicationDate
          }
        }));
      }
  
      onChangeStoryTitle(e) {
        const storyTitle = e.target.value;
        
        this.setState(prevState => ({
          currentComic: {
            ...prevState.currentComic,
            storyTitle: storyTitle
          }
        }));
      }

      onChangeCrossover(e) {
        const crossover = e.target.value;
        
        this.setState(prevState => ({
          currentComic: {
            ...prevState.currentComic,
            crossover: crossover
          }
        }));
      }

      onChangeMarvelId(e) {
        const marvelId = e.target.value;
        
        this.setState(prevState => ({
          currentComic: {
            ...prevState.currentComic,
            marvelId: marvelId
          }
        }));
      }

      onChangeSearchableTitle(e) {
        const searchableTitle = e.target.value;
        
        this.setState(prevState => ({
          currentComic: {
            ...prevState.currentComic,
            searchableTitle: searchableTitle
          }
        }));
      }

    getComic(id) {
      ComicDataService.get(id)
        .then(response => {
          this.setState({
            currentComic: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    updateComic() {
      ComicDataService.update(
        this.state.currentComic.id,
        this.state.currentComic
      )
        .then(response => {
          console.log(response.data);
          this.setState({
            message: "The comic was updated successfully!"
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    deleteComic() {    
      ComicDataService.delete(this.state.currentComic.id)
        .then(response => {
          console.log(response.data);
          this.props.history.push('/comic/search')
        })
        .catch(e => {
          console.log(e);
        });
    }
        render() {
          const { currentComic } = this.state;
      
          return (
            <div>
              {currentComic ? (
                <div className="edit-form">
                  <h4>Comic</h4>
                  <form>
                    <div className="form-group">
                      <label htmlFor="seriesTitle">Series Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="seriesTitle"
                        value={currentComic.seriesTitle}
                        onChange={this.onChangeSeriesTitle}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="issueNumber">Issue Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="issueNumber"
                        value={currentComic.issueNumber}
                        onChange={this.onChangeIssueNumber}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="publicationDate">Publication Date</label>
                      <input
                        type="text"
                        className="form-control"
                        id="publicationDate"
                        value={currentComic.publicationDate}
                        onChange={this.onChangePublicationDate}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="storyTitle">Story Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="storyTitle"
                        value={currentComic.storyTitle}
                        onChange={this.onChangeStoryTitle}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="crossover">Crossover</label>
                      <input
                        type="text"
                        className="form-control"
                        id="crossover"
                        value={currentComic.crossover}
                        onChange={this.onChangeCrossover}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="marvelId">Marvel ID</label>
                      <input
                        type="number"
                        className="form-control"
                        id="marvelId"
                        value={currentComic.marvelId}
                        onChange={this.onChangeMarvelId}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="searchableTitle">Searchable Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="searchableTitle"
                        value={currentComic.searchableTitle}
                        onChange={this.onChangeSearchableTitle}
                      />
                    </div>
                  </form>
      
                  <button
                    className="badge badge-danger mr-2"
                    onClick={this.deleteComic}
                  >
                    Delete
                  </button>
      
                  <button
                    type="submit"
                    className="badge badge-success"
                    onClick={this.updateComic}
                  >
                    Update
                  </button>
                  <p>{this.state.message}</p>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Comic...</p>
                </div>
              )}
            </div>
          );
        }
      }