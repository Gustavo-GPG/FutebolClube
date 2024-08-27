import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import auth from '../utils/auth';
const { expect } = chai;

describe('Testes de auth', () => {
  describe('Função sign', () => {
    it('Deve retornar um token JWT válido', () => {
      const payload = { email: 'test@example.com', password: 'password123' };
      const token = auth.sign(payload);
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as jwt.JwtPayload;
      
      expect(decoded.email).to.equal(payload.email);
    });
  });

  describe('Verify testes', () => {
    it('Deve verificar um token JWT e retornar os dados', () => {
      const payload = { email: 'test@example.com', password: 'password123' };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret');
      
      const decodedPayload = auth.verify(token);
      
      expect(decodedPayload.email).to.equal(payload.email);
    });

    it('Deve lançar um erro ao verificar um token inválido', () => {
      const token = 'tokenInválido';

      expect(() => auth.verify(token)).to.throw();
    });
  });

  describe('Função decodedEmail', () => {
    it('Deve extrair e retornar o email do token JWT', () => {
      const payload = { email: 'test@example.com', password: 'password123' };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret');
      
      const email = auth.decodedEmail(`Bearer ${token}`);
      
      expect(email).to.equal(payload.email);
    });

    it('Deve lançar um erro ao extrair email de um token inválido', () => {
      const token = 'tokenInválido';

      expect(() => auth.decodedEmail(`Bearer ${token}`)).to.throw();
    });
  });
});