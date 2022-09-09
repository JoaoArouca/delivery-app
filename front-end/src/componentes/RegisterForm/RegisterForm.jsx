/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { MdAlternateEmail } from 'react-icons/md';
import { TbLetterA } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { setStorage } from '../../localstorage';
import { registerr } from '../../services';

export default function RegisterForm() {
  const [isShowingPassword, showPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const {
    register, handleSubmit, formState: { errors, isValid },
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      const user = await registerr(data);
      if (user) {
        setStorage('user', user);
        navigate('/main');
      }
    } catch (error) {
      const response = error?.response?.data || error?.message;
      setErrorMessage(response);
    }
  };

  return (
    <form>
      <div>
        <input
          placeholder="Nome"
          {...register('name', { required: true })}
        />
        <span>
          <TbLetterA
            size="24"
          />
        </span>
      </div>

      <div>
        <input
          placeholder="Email"
          {...register('email', { required: true })}
        />
        <span>
          <MdAlternateEmail
            size="24"
          />
        </span>
      </div>

      <div>
        <input
          placeholder="Senha"
          type={isShowingPassword ? 'text' : 'password'}
          {...register('password', { required: true, minLength: 6 })}
        />
        <span>
          {isShowingPassword ? (
            <FiEye
              onClick={() => showPassword(false)}
              size="24"
            />
          ) : (
            <FiEyeOff
              onClick={() => showPassword(true)}
              size="24"
            />
          )}
        </span>
      </div>

      <Button
        disabled={!isValid}
        type="submit"
        variant="success"
        onClick={handleSubmit(onSubmit)}
      >
        Registrar
      </Button>

      {errors.email && <span>Password required</span>}
      {errors.password && errors.password.type === 'required' && <span>Password required</span>}
      {errors.password && errors.password.type === 'minLength' && <span>at least 6 characters</span>}
      {errorMessage !== '' && <span>{ errorMessage }</span>}
    </form>
  );
}
