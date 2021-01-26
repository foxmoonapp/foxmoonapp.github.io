const init = async () => {
  const initialCode = `kind: component
name: hello
spec:
  props:
    - name
  render:
    layout: flex-column
    elements:
      - type: static-text
        value: hello
      - type: prop
        value: name`;

  const yamlInput = document.querySelector('#yaml');
  const parserInput = document.querySelector('#parser');
  const transformerInput = document.querySelector('#transformer');
  const codeGeneratorInput = document.querySelector('#codeGenerator');

  yamlInput.textContent = initialCode;

  const lexerComponent = await compiler.Lexer.yamlLexer(yaml.textContent);
  const parsedComponent = await compiler.Parser.parser(lexerComponent);
  parserInput.textContent = JSON.stringify(parsedComponent, null, ' ');

  const transfomedComponent = await compiler.Transformer.transform(parsedComponent);
  transformerInput.textContent = JSON.stringify(transfomedComponent, null, ' ');
  
  const generatedCode = await compiler.CodeGenerator.codeGenerator(transfomedComponent);
  codeGeneratorInput.textContent = generatedCode;
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});