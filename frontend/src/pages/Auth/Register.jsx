import "./Auth.css";

//components
import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

const Register = () => {

  const handleSumit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>ReactGram</h2>
      <p>Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSumit}>
        <input type="text" placeholder="None" />
        <input type="email" placeholder="E-mail"/>
        <input type="password" placeholder="Senha"/>
        <input type="password" placeholder="Conofirme a sua senha"/>
        <button>Cadastrar</button>
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui.</Link>
      </p>
    </div>
  )
}

export default Register