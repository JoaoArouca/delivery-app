import Button from 'react-bootstrap/Button';
import React from 'react';

function LoginForm() {
  return (
    <form>
      <label htmlFor="email">
        <input id="email" type="text" />
      </label>

      <label htmlFor="password">
        <input id="password" type="password" />
      </label>

      <Button
        variant="success"
        disabled
      >
        Entrar
      </Button>
    </form>
  );
}

export default LoginForm;
