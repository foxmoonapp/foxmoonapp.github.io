let yamlInput;
let parserInput;
let transformerInput;
let codeGeneratorInput;
let chkDetailView;
let parserCodeBox;
let transfomerCodeBox;

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

  yamlInput = document.querySelector('#yaml');
  parserInput = document.querySelector('#parser');
  transformerInput = document.querySelector('#transformer');
  codeGeneratorInput = document.querySelector('#codeGenerator');
  chkDetailView = document.querySelector('#chkDetailView');
  parserCodeBox = document.querySelector('#parserCodeBox');
  transfomerCodeBox = document.querySelector('#transfomerCodeBox');

  parserCodeBox.style.display = 'none';
  transfomerCodeBox.style.display = 'none';
  chkDetailView.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      parserCodeBox.style.display = 'flex';
      transfomerCodeBox.style.display = 'flex';
    } else {
      parserCodeBox.style.display = 'none';
      transfomerCodeBox.style.display = 'none';
    }
  });

  yamlInput.addEventListener("input", (event) => lexerInputTextChange(event));
  yamlInput.value = initialCode;
  update(initialCode);
};

function lexerInputTextChange(event) {
  update(event.currentTarget.value);
}

async function update(yaml) {
  try {
    const lexerComponents = await compiler.Lexer.yamlLexer(yaml);

    const parsedComponentsPromise = lexerComponents.map(
      lc => compiler.Parser.parser(lc)
    );
    const parsedComponents = await Promise.all(parsedComponentsPromise);

    parserInput.textContent = JSON.stringify(parsedComponents, null, ' ');

    const transfomerComponentsPromise = parsedComponents.map(
      pc => compiler.Transformer.transform(pc)
    );

    const transfomedComponents = await Promise.all(transfomerComponentsPromise);
    transformerInput.textContent = JSON.stringify(transfomedComponents, null, ' ');

    const codePromise = transfomedComponents.map(
      tc => compiler.CodeGenerator.codeGenerator(tc)
    );
    const generatedCodeFiles = await Promise.all(codePromise);
    codeGeneratorInput.textContent = generatedCodeFiles.join('\n\n');
  } catch (e) {
    console.error(e);
    const errStr = `- ${JSON.stringify(e)} `;
    codeGeneratorInput.textContent = `invalid input ${errStr === '- {} ' ? '' : errStr}...`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});