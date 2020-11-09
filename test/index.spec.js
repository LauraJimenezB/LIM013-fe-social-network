// importamos la funcion que vamos a testear
import { createUser } from '../src/lib/controllers/signUp-controller.js';

describe('createUser', () => {
  it('debería ser una función', () => {
    expect(typeof createUser).toBe('function');
  });
});
