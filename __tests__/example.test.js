function soma(a, b) {
  return a + b;
}

test('se eu chamar a função soma com os valores 4 e 5 ela deve retornar 9', () => {
  const result = soma(4, 5);
  // pega o resultado da função e mostra no teste
  expect(result).toBe(9);
});
