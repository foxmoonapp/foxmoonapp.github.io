let yamlInput;
let intermediateLanguage;
let transformedBlockFiles;
let generatedCode;
let chkDetailView;
let intermediateLanguageCodeBox;
let transfomedLanguageCodeBox;

const init = async () => {
  const initialCode = `
kind: ui
name: Page
spec:
  view:
    container:
      layout: flex_column
      children:
        - label:
            value:
              static: this is Page block!
        - block:
            name: Header
---
kind: ui
name: Header
spec:
  view:
    label:
      value:
        static: this is Header block!
`;

  yamlInput = document.querySelector('#yaml');
  intermediateLanguage = document.querySelector('#intermediateLanguage');
  transformedBlockFiles = document.querySelector('#transformedBlockFiles');
  generatedCode = document.querySelector('#generatedCode');
  chkDetailView = document.querySelector('#chkDetailView');
  intermediateLanguageCodeBox = document.querySelector('#intermediateLanguageCodeBox');
  transfomedLanguageCodeBox = document.querySelector('#transfomedLanguageCodeBox');

  intermediateLanguageCodeBox.style.display = 'none';
  transfomedLanguageCodeBox.style.display = 'none';
  chkDetailView.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      intermediateLanguageCodeBox.style.display = 'flex';
      transfomedLanguageCodeBox.style.display = 'flex';
    } else {
      intermediateLanguageCodeBox.style.display = 'none';
      transfomedLanguageCodeBox.style.display = 'none';
    }
  });

  yamlInput.addEventListener("input", (event) => yamlInputChanged(event));
  yamlInput.value = initialCode;
  update(initialCode);
};

function yamlInputChanged(event) {
  update(event.currentTarget.value);
}

async function update(yaml) {

  const compilerOutput = await compiler.compile(yaml);
  if (compilerOutput.isErr()) {
    console.error(compilerOutput.error);
    generatedCode.textContent = compilerOutput.error;
    return;
  }
  const result = compilerOutput.value;
  intermediateLanguage.textContent = JSON.stringify(result.intermediateLanguage, null, 2);
  transformedBlockFiles.textContent = JSON.stringify(result.transformedBlockFiles, null, 2);
  generatedCode.textContent = result.codeFiles
    .map(codefile => `//  file : ${codefile.filename}\n\n${codefile.body}\n`)
    .join('\n');

}

document.addEventListener('DOMContentLoaded', () => {
  init();
});