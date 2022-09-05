/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const {
    register, handleSubmit, formState: { errors, isValid },
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form>
      <input
        placeholder="Email"
        {...register('email', { required: true })}
      />

      <input
        placeholder="Senha"
        type="password"
        {...register('password', { required: true, minLength: 6 })}
      />

      {errors.email && <span>Password required</span>}
      {errors.password && errors.password.type === 'required' && <span>Password required</span>}
      {errors.password && errors.password.type === 'minLength' && <span>ate least 6 characters</span>}

      <input
        disabled={!isValid}
        type="submit"
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
}
