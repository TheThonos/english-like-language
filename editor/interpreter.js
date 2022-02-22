function run(code){
	code = code.split('"');
	for(let i in code){
		if(i % 2 == 0){
			if(code[i].match(new RegExp('(^| |\t)define(?= )', 'm'))){
				alert("Nice function!");
			}
		}
	}
}

// html[i] = html[i].replace(new RegExp(`&nbsp;${string}&nbsp;`, 'gm'), `&nbsp;<span class='${type}'>${string}</span>&nbsp;`).replace(new RegExp(`^${string}&nbsp;`, 'gm'), `<span class='${type}'>${string}</span>&nbsp;`).replace(new RegExp(`&nbsp;${string}$`, 'gm'), `&nbsp;<span class='${type}'>${string}</span>`).replace(new RegExp(`^${string}$`, 'gm'), `<span class='${type}'>${string}</span>`).replace(new RegExp(`\t${string}\t`, 'gm'), `\t<span class='${type}'>${string}</span>\t`).replace(new RegExp(`^${string}\t`, 'gm'), `<span class='${type}'>${string}</span>\t`).replace(new RegExp(`\t${string}$`, 'gm'), `\t<span class='${type}'>${string}</span>`).replace(new RegExp(`\t${string}&nbsp;`, 'gm'), `\t<span class='${type}'>${string}</span>&nbsp;`).replace(new RegExp(`&nbsp;${string}\t`, 'gm'), `&nbsp;<span class='${type}'>${string}</span>\t`);