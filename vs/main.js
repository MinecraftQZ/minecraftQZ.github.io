// Load FS
loadFromLocalStorage();
renderFileList();

let currentFile = null;

// Monaco Editor
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' }});
require(["vs/editor/editor.main"], function () {
  window.editor = monaco.editor.create(document.getElementById("editor"), {
    value: "",
    language: "javascript",
    theme: "vs-dark",
  });
});

// Terminal
const term = new Terminal({ cursorBlink:true, theme:{background:"#1e1e1e"} });
term.open(document.getElementById("terminal"));
term.writeln("Welcome to Web Bash (fake). Type commands below.");
term.prompt = () => term.write("\r\n$ ");
term.prompt();
term.onKey(e=>{
  const char = e.key;
  if(char.charCodeAt(0)===13){ // Enter
    term.writeln("\r\n(fake output)");
    term.prompt();
  } else {
    term.write(char);
  }
});

// File actions
function openFile(name){
  currentFile = name;
  editor.setValue(FS.read(name));
}
document.getElementById("new-file").onclick = ()=>{
  const name = prompt("File name:");
  if(name) { FS.create(name); currentFile=name; editor.setValue(""); }
};
document.getElementById("save-file").onclick = ()=>{
  if(!currentFile) return alert("No file open");
  FS.write(currentFile, editor.getValue());
  FS.saveToDisk(currentFile);
};
document.getElementById("open-file").onclick = ()=>{
  const input = document.createElement("input");
  input.type="file";
  input.onchange = e=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = ()=> {
      FS.create(file.name, reader.result);
      currentFile = file.name;
      editor.setValue(reader.result);
    };
    reader.readAsText(file);
  };
  input.click();
};
