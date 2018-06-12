import React from 'react';

export default class Search extends React.Component {
    state = {
      term: '',
    }

    onSubmit = (e) => {
      e.preventDefault();
      this.props.onSubmit(this.state);
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    render() {
      return (
        <form>
          <input name="term" type="text" value={this.state.term} onChange={this.handleChange} />
          <button type="submit" onClick={this.onSubmit}>Search</button>
        </form>
      );

    }
}
