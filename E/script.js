const sshInput = document.getElementById('sshInput');
const startBtn = document.getElementById('startBtn');
const terminal = document.getElementById('terminal');

startBtn.addEventListener('click', () => {
  terminal.innerHTML = '';
  const cmd = sshInput.value;
  appendTerminal(`> ${cmd}`);
  simulateSSH();
});

function appendTerminal(text) {
  terminal.innerHTML += text + '<br>';
  terminal.scrollTop = terminal.scrollHeight;
}

function simulateSSH() {
  setTimeout(() => appendTerminal('Connecting...'), 500);
  setTimeout(() => appendTerminal('u0_a277@192.168.43.139\'s password:'), 1500);
  setTimeout(() => appendTerminal('Welcome to Termux!'), 2500);
  setTimeout(() => appendTerminal('u0_a277@device:~$'), 3000);
}
