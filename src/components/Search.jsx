import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { configApi } from '../utils/consts';


class Search extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      resulsts: {},
      showSpinner: false,
    };
  }

  onResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(`Что-то пошло не так: ${res.status} ${err.message}`));
  }

  getData = () => {

    fetch(`${configApi.url}${this.state.query}`, {
      method: "GET",
      headers: configApi.headers
    })
      .then(this.onResponse)
      .then((data) => {
        this.setState({ resulsts: data });
        this.setState({showSpinner: false});
    });
  


  }

  handleInputChange = (e) => {
    this.setState({
      query: e.target.value
    });
    
  }

  handleButtonClick = (e) => {
    e.preventDefault();
    if (this.state.query) {
      this.getData();
      this.setState({showSpinner: true});
    }
    
    this.setState({resulsts: {}});
  }

  render() {
    return (
      <Container className="mt-5 w-75">
        <Form>
          <Form.Group className="d-flex flex-row bd-highlight mb-3">
            <label className="p-2 bd-highlight" htmlFor="inputSearch">Поиск:</label>
            <Form.Control className="p-2 bd-highlight searchInput" type="text" id="inputSearch" placeholder="Введите запрос" onChange={this.handleInputChange} />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" onClick={this.handleButtonClick}>Найти</Button>
          </div>
        </Form>
        <div className="d-flex flex-column bd-highlight mb-3">
          {this.state.showSpinner
            ?
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </div>
            :
            ""
          }
          
          {this.state.resulsts?.results?.map((item) => {
            return <div key={item.name} className="p-2 bd-highlight">{item.name}</div>
          })}
          {this.state.resulsts.count === 0 ? "Нет совпадений" : ""}
        </div>
      </Container>
    );
  }
}

export default Search;