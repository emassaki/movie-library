import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="404-error" className="not-found">
        <h1>Página não encontrada!</h1>
        <Link to="/" className="return">Voltar</Link>
      </div>
    );
  }
}

export default NotFound;
