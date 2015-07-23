var expressionTypes = {
	AND: 'AND',
	OR: 'OR',
	NOT: 'NOT',
	SOME: 'SOME',
	ALL: 'ALL',
	EQUAL: 'EQUAL',
	NOT_EQUAL: 'NOT_EQUAL',
	LESS_THAN: 'LESS_THAN',
	GREATER_THAN: 'GREATER_THAN',
	LTE: 'LTE',
	GTE: 'GTE',
	IMPLIES: 'IMPLIES',
	INDEPENDENT: 'INDEPENDENT',

}


var expression = {
	type:"And",
	first: null,
	second: null;
};
var world = [];

function evaluate(expr, scope){

		return evaluateSome(expr, scope);
	} else if (expr.type === expressionTypes.ALL) {
		return evaluateAll(expr, scope);
	} else if (expr.type === expressionTypes.NOT) {
		return !evaluate(expr.first, scope);
	} else if(expr.type == expressionTypes.AND){
		return evaulateAnd(expr.first, expr.second, scope);
	} else if(expr.type == expressionTypes.OR){
		return evaulateOr(expr.first, expr.second, scope);
	} else if(expr.type == expressionTypes.EQUAL){
		return evaulateEqual(expr.first, expr.second, scope);
	} else if(expr.type == expressionTypes.NOT_EQUAL){
		return evaulateInequal(expr.first, expr.second, scope);
	} else if(expr.type == expressionTypes.LESS_THAN){
		return evaulateLessThan(expr.first, expr.second, scope);
	} else if(expr.type == expressionTypes.GREATER_THAN){
		return evaulateGreaterThan(expr.first, expr.second, scope);
	} else if(expr.type == expressionTypes.LTE){
		return evaulateLessThanEqual(expr.first, expr.second, scope);
	} else if(expr.type == expressionTypes.GTE){
		return evaulateGreaterThanEqual(expr.first, expr.second, scope);
	} else if(expr.type == expressionTypes.IMPLIES){
		return evaulateImplies(expr.first, expr.second, scope);
	} 
}

function evaluateSome(some, scope){
	var v = some.first;
	if (scope[v]) {
		//TODO: Overwriting variable
	} else {
		return world.some(function(obj) {
			var newScope = Object.create(scope);
			newScope[v] = obj; 
			return evaluate(some.second, newScope);
		});
	}
}

function evaluateAll(all, scope){
	var v = all.first;
	if (scope[v]) {
		//TODO: Overwriting variable
	} else {
		return world.reduce(function(prev, curr) {
			var newScope = Object.create(scope);
			newScope[v] = curr; 
			return evaluate(all.second, newScope);
		});
	}
}

function evaulateAnd(expr1, expr2, scope){
	return evaluate(expr1, scope) && evaluate(expr2, scope);
}

function evaulateOr(expr1, expr2, scope){
	return evaluate(expr1, scope) || evaluate(expr2, scope);
}

function evaulateEqual(expr1, expr2, scope){
	return evaluate(expr1, scope) === evaluate(expr2, scope);
}

function evaulateInequal(expr1, expr2, scope){
	return evaluate(expr1, scope) !== evaluate(expr2, scope);
}

function evaulateLessThan(expr1, expr2, scope){
	return evaluate(expr1, scope) < evaluate(expr2, scope);
}

function evaulateGreaterThan(expr1, expr2, scope){
	return evaluate(expr1, scope) > evaluate(expr2, scope);
}

function evaulateLessThanEqual(expr1, expr2, scope){
	return evaluate(expr1, scope) <= evaluate(expr2, scope);
}

function evaulateGreaterThanEqual(expr1, expr2, scope){
	return evaluate(expr1, scope) >= evaluate(expr2, scope);
}

function evaulateImplies(expr1, expr2, scope){
	var x = evaluate(expr1, scope);
	var y = evaluate(expr2, scope);
	return  !x ||(x && y);
}


//TODO Fix
function toString(expr){
	if (expr.type === expressionTypes.SOME 
		|| expr.type === expressionTypes.ALL 
		|| expr.type === expressionTypes.NOT) {
		var sum = "";
		expr.children.forEach(function (child) {
			sum += ' ' + toString(child);
		});
		var x = expr.type + sum;
	}
	else{
		return toString(expr.children[0]) + ' ' + expr.type + ' ' + toString(expr.children[1]);
	}
}