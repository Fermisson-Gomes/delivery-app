import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { api } from '../helpers/APIRequests';

function RegisterComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
  });

  const [failedTryRegister, setFailedTryRegister] = useState(false);

  async function hadleRegister() {
    const { nome, email, password } = formData;
    try {
      const { data } = await api({
        url: '/register',
        method: 'post',
        data: {
          name: nome,
          email,
          password,
        },
      });
      setToken(data.token);
      setLocalUser(data.user);
      navigate('/customer/products');
    } catch (e) {
      setFailedTryRegister(true);
    }
  }

  function isButtonDisabled() {
    const { nome, email, password } = formData;
    const MIN_CHARACTERS_NAME = 12;
    const MIN_CHARACTERS_PASS = 6;
    return (password.length < MIN_CHARACTERS_PASS)
      || (nome.length < MIN_CHARACTERS_NAME)
      || (!validator.isEmail(email));
  }

  return (
    <div>
      <label htmlFor="common_register__input-name">
        Nome
        <input
          type="text"
          id="common_register__input-name"
          data-testid="common_register__input-name"
          value={ formData.nome }
          onChange={
            (e) => setFormData((current) => ({
              ...current,
              nome: e.target.value,
            }))
          }
        />
      </label>
      <label htmlFor="common_register__input-email">
        Email
        <input
          type="text"
          id="common_register__input-email"
          data-testid="common_register__input-email"
          value={ formData.email }
          onChange={
            (e) => setFormData((current) => ({
              ...current,
              email: e.target.value,
            }))
          }
        />
      </label>
      <label htmlFor="common_register__input-password">
        password
        <input
          type="password"
          id="common_register__input-password"
          data-testid="common_register__input-password"
          value={ formData.password }
          onChange={
            (e) => setFormData((current) => ({
              ...current,
              password: e.target.value,
            }))
          }
        />
      </label>
      <button
        type="button"
        data-testid="common_register__button-register"
        disabled={ isButtonDisabled() }
        onClick={ hadleRegister }
      >
        CADASTRAR
      </button>
      {
        failedTryRegister && (
          <p data-testid="common_register__element-invalid_register">
            Falha ao cadastrar usuário
          </p>
        )
      }
    </div>
  );
}

export default RegisterComponent;
