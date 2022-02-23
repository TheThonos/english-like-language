function run(code){
	let seperatedCode = code.split('"');
	for(let i in seperatedCode){
		if(i % 2 == 0){
			let lines = seperatedCode[i].split('\n');
			for(let line of lines){
				if(line.match(new RegExp('(^| |\t)(define(?= ))'))){
					let func = line.match(new RegExp('(^| |\t)(define(?= ))'))[2];
					output(func);
				}
			}
		}
	}
}

function output(text, color = "white"){
	let el = document.createElement('span');
	el.innerText = text;
	el.style.color = color;
	document.getElementById('console').appendChild(el).innerHTML += '<br>';
}

// html[i] = html[i].replace(new RegExp(`&nbsp;${string}&nbsp;`, 'gm'), `&nbsp;<span class='${type}'>${string}</span>&nbsp;`).replace(new RegExp(`^${string}&nbsp;`, 'gm'), `<span class='${type}'>${string}</span>&nbsp;`).replace(new RegExp(`&nbsp;${string}$`, 'gm'), `&nbsp;<span class='${type}'>${string}</span>`).replace(new RegExp(`^${string}$`, 'gm'), `<span class='${type}'>${string}</span>`).replace(new RegExp(`\t${string}\t`, 'gm'), `\t<span class='${type}'>${string}</span>\t`).replace(new RegExp(`^${string}\t`, 'gm'), `<span class='${type}'>${string}</span>\t`).replace(new RegExp(`\t${string}$`, 'gm'), `\t<span class='${type}'>${string}</span>`).replace(new RegExp(`\t${string}&nbsp;`, 'gm'), `\t<span class='${type}'>${string}</span>&nbsp;`).replace(new RegExp(`&nbsp;${string}\t`, 'gm'), `&nbsp;<span class='${type}'>${string}</span>\t`);