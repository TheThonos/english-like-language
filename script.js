document.getElementById("echoinput").addEventListener("keydown", (e) => {
	getInput(e, e.target, escapeHTML(e.target.value))
});

document.getElementById("mathinput").addEventListener('keydown', e => {
	getInput(e, e.target, 'Gimme another number > <input id="mathinput2" autocomplete="off"/>');
	document.getElementById("mathinput2").focus();
	document.getElementById("mathinput2").addEventListener('keydown', ev => {
		getInput(ev, ev.target, (parseFloat(e.target.value) + parseFloat(ev.target.value)) * 1);
	});
});

function getInput(e, self, result){
	if(e.key != "Enter") return;
	let value = escapeHTML(self.value);
	let parent = self.parentElement;
	self.remove();
	parent.innerHTML += value + '<br/>' + result;
}

function escapeHTML(unsafe){
	return unsafe
		.replace(new RegExp('&', 'g'), "&amp;")
		.replace(new RegExp('<', 'g'), "&lt;")
		.replace(new RegExp('>', 'g'), "&gt;")
		.replace(new RegExp('"', 'g'), "&quot;")
		.replace(new RegExp('\'', 'g'), "&#039;");
 }