import mapStatusHTTP from '../utils/mapStatusHTTP';
import * as chai from 'chai';

const { expect } = chai;

describe('função mapStatusHTTP', () => {
  it('deve retornar 200 para o status SUCCESSFUL', () => {
    expect(mapStatusHTTP('SUCCESSFUL')).equal(200);
  });

  it('deve retornar 400 para o status INVALID_DATA', () => {
    expect(mapStatusHTTP('INVALID_DATA')).equal(400);
  });

  it('deve retornar 404 para o status NOT_FOUND', () => {
    expect(mapStatusHTTP('NOT_FOUND')).equal(404);
  });

  it('deve retornar 409 para o status CONFLICT', () => {
    expect(mapStatusHTTP('CONFLICT')).equal(409);
  });

  it('deve retornar 401 para o status UNAUTHORIZED', () => {
    expect(mapStatusHTTP('UNAUTHORIZED')).equal(401);
  });

  it('deve retornar 201 para o status CREATED', () => {
    expect(mapStatusHTTP('CREATED')).equal(201);
  });

  it('deve retornar 200 para o status UPDATED', () => {
    expect(mapStatusHTTP('UPDATED')).equal(200);
  });

  it('deve retornar 200 para o status DELETED', () => {
    expect(mapStatusHTTP('DELETED')).equal(200);
  });

  it('deve retornar 500 para um status desconhecido', () => {
    expect(mapStatusHTTP('STATUS_DESCONHECIDO')).equal(500);
  });
});