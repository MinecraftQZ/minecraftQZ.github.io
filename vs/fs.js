const FS = {
  files: {},
  create(name, content="") {
    this.files[name] = content;
    renderFileList();
  },
  read(name) {
    return this.files[name] || "";
  },
  write(name, content) {
    this.files[name] = content;
    saveToLocalStorage();
  },
  saveToDisk(name) {
    const blob = new Blob([this.files[name]], {type: "text/plain"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
  }
}

function saveToLocalStorage() {
  localStorage.setItem("vscode-fs", JSON.stringify(FS.files));
}

function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("vscode-fs")||"{}");
  FS.files = data;
}

function renderFileList() {
  const ul = document.getElementById("file-list");
  ul.innerHTML = "";
  Object.keys(FS.files).forEach(name=>{
    const li = document.createElement("li");
    li.textContent = name;
    li.onclick = () => openFile(name);
    ul.appendChild(li);
  });
}
