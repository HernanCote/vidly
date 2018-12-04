import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "./../services/genreService";
import { getMovie, saveMovie } from "./../services/movieService";

class MovieForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "",
        genreId: "",
        numberInStock: "",
        dailyRentalRate: ""
      },
      errors: {},
      genres: []
    };
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);
    const { history } = this.props;
    history.push("/movies");
  };

  render() {
    return (
      <div className="col-md-6 col-sm-6 mx-auto">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropdown(this.state.genres, "genreId", "Genre")}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
