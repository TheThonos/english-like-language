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

function run(code){
	let lines = code.split("\n");
	for(let line of lines){
		let placeholder = line.split('"');
		for(let i in placeholder){
			if(i % 2 == 0){
				for(let type of syntaxKeys){
					for(let string of syntax[type]){
						// 
					}
				}
			}
		}
	}
}

// html[i] = html[i].replace(new RegExp(`&nbsp;${string}&nbsp;`, 'gm'), `&nbsp;<span class='${type}'>${string}</span>&nbsp;`).replace(new RegExp(`^${string}&nbsp;`, 'gm'), `<span class='${type}'>${string}</span>&nbsp;`).replace(new RegExp(`&nbsp;${string}$`, 'gm'), `&nbsp;<span class='${type}'>${string}</span>`).replace(new RegExp(`^${string}$`, 'gm'), `<span class='${type}'>${string}</span>`).replace(new RegExp(`\t${string}\t`, 'gm'), `\t<span class='${type}'>${string}</span>\t`).replace(new RegExp(`^${string}\t`, 'gm'), `<span class='${type}'>${string}</span>\t`).replace(new RegExp(`\t${string}$`, 'gm'), `\t<span class='${type}'>${string}</span>`).replace(new RegExp(`\t${string}&nbsp;`, 'gm'), `\t<span class='${type}'>${string}</span>&nbsp;`).replace(new RegExp(`&nbsp;${string}\t`, 'gm'), `&nbsp;<span class='${type}'>${string}</span>\t`);