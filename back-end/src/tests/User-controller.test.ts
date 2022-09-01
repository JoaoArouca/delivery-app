/* eslint-disable @typescript-eslint/no-unused-vars */
import * as sinon from 'sinon'
import chai from 'chai'
import chaiHttp = require('chai-http');

import app from '../app';

import { describe, it } from 'mocha';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('User Controller - Test', () => {
  let chaiHttpResponde: Response

  it('Registrou novo usuário com sucesso', async () => {
    const chaiHttpResponde = await chai.request(app).post('/register').send({
      email: 'joao@email.com',
      password: '123456',
      name: 'João Victor Arouca'
    });

    expect(chaiHttpResponde.status).to.be.eq(201)
  });

  it('Registra o usuário e retorna um token válido', async () => {
    const chaiHttpResponde = await chai.request(app).post('/register').send({
      email: 'joao@email.com',
      password: '123456',
      name: 'João Victor Arouca'
    });

    expect(chaiHttpResponde.body.token).to.exist
  });

  it('Testa o registro com um email inválido', async () => {
    const chaiHttpResponde = await chai.request(app).post('/register').send({
      email: 'invalid email',
      password: '123456',
      name: 'João Victor Arouca'
    }); 
    
    expect(chaiHttpResponde.status).to.be.eq(400);
  })

});