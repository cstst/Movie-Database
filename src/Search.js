import React from 'react';
import styled from 'styled-components';

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
        <SearchForm>
          <SearchInput name="term" type="text" value={this.state.term} onChange={this.handleChange} />
          <SearchButton type="submit" onClick={this.onSubmit}>Search</SearchButton>
        </SearchForm>
      );

    }
}

const SearchForm = styled.form`
  margin: 20px auto 10px auto;
`;

const SearchInput = styled.input`
  margin: 5px;
  padding: 7px 15px;
`;

const SearchButton = styled.button`
  margin: 5px;
  background-color: #111;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;
