// โหลด Monaco Editor
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' }});
require(["vs/editor/editor.main"], function () {
  monaco.editor.create(document.getElementById("editor"), {
    value: "// Welcome! This is a VSCode-like editor with Bash terminal.\\n",
    language: "javascript",
    theme: "vs-dark",
  });
});

// สร้าง terminal
const term = new Terminal({
  theme: { background: "#1e1e1e" },
  cursorBlink: true,
});
term.open(document.getElementById("terminal"));

// --- Bash (fake หรือ wasm) ---
// (1) แบบ fake shell
term.writeln("Welcome to Web Bash (fake). Type commands below.");
term.prompt = () => term.write("\\r\\n$ ");
term.prompt();

term.onKey(e => {
  const char = e.key;
  if (char.charCodeAt(0) === 13) { // Enter
    term.writeln("\\r\\n(fake output)");
    term.prompt();
  } else {
    term.write(char);
  }
});

// (2) ถ้าอยากใช้ bash จริง: โหลด bash.wasm แล้วเชื่อม stdout -> term
// ดูโปรเจกต์ https://github.com/containers/wasi-bash หรือ https://github.com/emscripten-core/emscripten
