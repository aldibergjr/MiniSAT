let fs = require('fs');
let filename = './hole4.cnf';
function solve(filename)
{
	let formula = readFormula(filename);
	let result = doSolveR(formula.variables,formula.clauses);
	return result;

}
function getClauses(input)
{
	let cleanse = new Array;
	let pos = 0;
	for (var i = 0; i < input.length; i++) {
		if(input[i].charAt(0) != 'c' && input[i].charAt(0) != 'p' && input[i] != ''){
			var x = input[i].split(' ');
			let cleansep = new Array;
			for(var j = 0;j<x.length;j++)
			{
				if(x[j] !='')
				cleansep.push(x[j]);
			}
			cleanse.push(cleansep);		
	}

}
	return cleanse;
}
function getVariables(input)
{
	let cs = new Array;
	var k;
	for (var i = 0; i < input.length; i++) {
		if(input[i].charAt(0) == 'p')
		{
			k = input[i].split(' ');
			
		}
	}
	for(var i = 0; i<parseInt(k[2]);i++)
	{
		cs[i] = 0;
	}
	return cs;

}
function checkProblemSpecification(input,clauses){
	for (var i = 0; i < input.length; i++) {
		if(input[i].charAt(0) == 'p')
		{
			k = input[i].split(' ');
			
		}
	}
	
	if(clauses.length == parseInt(k[3])){
		return true;
	}else{return false}
}

function readFormula(filename){
	let cnf = fs.readFileSync(filename).toString();
	var input = cnf.split('\n');
	let variables = getVariables(input);
	let clauses = getClauses(input);
	let result = { 'clauses': [], 'variables': [] };
	let checkOk = checkProblemSpecification(input,clauses);
	
	if(checkOk){
		result.clauses = clauses;
		result.variables = variables;
	}
	return result;
	
}
function doSolveR(variables,clauses)
{
	var isSat;
	var testcase = variables;
	let Solutions = new Array;
	do
	{
		
		isSat = true;
		let ClausesRes = new Array;
		//console.log('testando valores: '+allAssigns[TestCase]+'\n');
		for (var i = 0; i < clauses.length; i++) {
			let coSat = false;
			//console.log('usando clausula: '+clauses[i]+'\n');
			for (var j = 0; j < clauses[i].length-1; j++) {

				if(clauses[i][j].charAt(0) != '-')
				{
					
					coSat = coSat ||parseInt(testcase[parseInt(clauses[i][j])-1]);
					
				}else{
					
					let x = clauses[i][j].split('-');
					coSat = coSat || !parseInt(testcase[parseInt(x[1])-1]);
					//console.log('valor da variável:'+ !allAssigns[TestCase][parseInt(x[1])-1]+ '\n');
					
					
				}
				

				
			}
			if(!coSat)
			{
				isSat = false;
				
				testcase = nextAssignment(testcase);
				break;
				
			}
			
		}
		
		if(isSat){
			Solutions.push(testcase);
		}
		
		
	}while(!isSat && testcase);

	let result = {'isSat':isSat,'Solutions':null};
	if(isSat)
	{
		result.Solutions = Solutions;
	}

	return result;
}



function doSolve(allAssigns,clauses){
	var isSat;
	let Solutions = new Array;
	let TestCase = 0;
	do
	{
		isSat = true;
		let ClausesRes = new Array;
		//console.log('testando valores: '+allAssigns[TestCase]+'\n');
		for (var i = 0; i < clauses.length; i++) {
			let coSat = false;
			//console.log('usando clausula: '+clauses[i]+'\n');
			for (var j = 0; j < clauses[i].length-1; j++) {

				if(clauses[i][j].charAt(0) != '-')
				{
					
					coSat = coSat || allAssigns[TestCase][parseInt(clauses[i][j])-1];
					//console.log('valor da variável:'+ allAssigns[TestCase][parseInt(clauses[i][j])-1]+ '\n');
					
				}else{
					
					let x = clauses[i][j].split('-');
					
					coSat = coSat || allAssigns[TestCase][parseInt(x[1])-1];
					//console.log('valor da variável:'+ !allAssigns[TestCase][parseInt(x[1])-1]+ '\n');		
				}	
			}
			if(!coSat)
			{
				isSat = false;
				break;
			}
			
		}
		if(isSat){
			Solutions.push(allAssigns[TestCase]);
		}
		TestCase++;
		//console.log('graaa');
	}while(!isSat && TestCase<allAssigns.length);

	let result = {'isSat':isSat,'Solutions':null};
	if(isSat)
	{
		result.Solutions = Solutions;
	}
	return result;
}

function allAssigns(variables)
{
	let poss = Math.pow(2,variables.length);
	let allAss = new Array;
	let indexes = new Array;
	for(var i=0;i<variables.length;i++){
		indexes.push(Math.pow(2,i));
	}
	for(var i = 0;i<poss;i++)
	{
		let aux = new Array;
		for (var j = 0; j < variables.length; j++) {
			if(Math.floor(i/indexes[j]%2) == 0)
			aux.push(0);
			else
				aux.push(1);
		}
		allAss.push(aux);

	}
	//console.log('done')
	return allAss;

}
function nextAssignment(variables)
{
	variables[variables.length-1] = parseInt(variables[variables.length-1]) +1+'';
	for(var i = variables.length-1;i>=0;i--)
	{
		if(variables[i]=='2')
		{
			variables[i] = 0;
			variables[i-1] = parseInt(variables[i-1])+1+'';
		}
		if(variables[0] == '2')
		{
			return false;
			break;
		}
		if(variables[i-1] == '1')
		{
			break;
		}
	}
	
	return variables;
}
console.log(solve(filename));
//console.log(true&&!1)

