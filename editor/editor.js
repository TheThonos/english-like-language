function update(text) {
	let result_element = document.querySelector("#highlighting-content");
	// Handle final newlines (see article)
	if(text[text.length-1] == "\n") {
		text += " ";
	}
	// Update code
	result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;").replace(new RegExp(" ", "g"), "&nbsp;"); /* Global RegExp */
	// Syntax Highlight
	highlight(result_element);
}

function sync_scroll(element) {
	/* Scroll result to scroll coords of event - sync with textarea */
	let result_element = document.querySelector("#highlighting");
	// Get and set x and y
	result_element.scrollTop = element.scrollTop;
	result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, event) {
	let code = element.value;
	if(event.key == "Tab") {
		/* Tab key pressed */
		event.preventDefault(); // stop normal
		let before_tab = code.slice(0, element.selectionStart); // text before tab
		let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
		let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
		element.value = before_tab + "\t" + after_tab; // add tab char
		// move cursor
		element.selectionStart = cursor_pos;
		element.selectionEnd = cursor_pos;
		update(element.value); // Update text to include indent
	}
}

const syntax = {
	keyword: [
		"say",
		"read",
		"set",
		"as",
		"to",
		"for",
		"if",
		"define",
		"with",
		"output"
	]
}

function highlight(element){
	let html = element.innerHTML.split('"');
	let oldHtml = element.innerHTML.split('"');
	let syntaxKeys = Object.keys(syntax);
	for(let i in html){
		if(i % 2 == 0){ // Means it's not a string
			for(let type of syntaxKeys){
				for(let string of syntax[type]){
					html[i] = html[i].replace(new RegExp(`&nbsp;${string}&nbsp;`, 'gm'), `&nbsp;<span class='${type}'>${string}</span>&nbsp;`).replace(new RegExp(`^${string}&nbsp;`, 'gm'), `<span class='${type}'>${string}</span>&nbsp;`).replace(new RegExp(`&nbsp;${string}$`, 'gm'), `&nbsp;<span class='${type}'>${string}</span>`).replace(new RegExp(`^${string}$`, 'gm'), `<span class='${type}'>${string}</span>`).replace(new RegExp(`\t${string}\t`, 'gm'), `\t<span class='${type}'>${string}</span>\t`).replace(new RegExp(`^${string}\t`, 'gm'), `<span class='${type}'>${string}</span>\t`).replace(new RegExp(`\t${string}$`, 'gm'), `\t<span class='${type}'>${string}</span>`).replace(new RegExp(`\t${string}&nbsp;`, 'gm'), `\t<span class='${type}'>${string}</span>&nbsp;`).replace(new RegExp(`&nbsp;${string}\t`, 'gm'), `&nbsp;<span class='${type}'>${string}</span>\t`);
				}
			}
		} else { // Means it is a string
			html[i] = `<span class='string'>${html[i]}</span>`.replace(new RegExp(`{[a-zA-Z0-9]*}`), match => {
				return `<span class='variable'>${match}</span>`;
			});
		}
	}
	html = html.join('"');
	element.innerHTML = html;
	element.innerHTML = html.replace(new RegExp(`"(?!<\/span>)`, 'g'), `<span class='string'>"</span>`);
}