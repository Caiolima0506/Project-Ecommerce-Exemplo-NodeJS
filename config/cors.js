module.exports = function(req, res, next) 
{
	res.header('Access-Control-Allow-Origin', req.get("Origin") || "*");
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Authorization, Content-Type, Accept');
	res.header('Access-Control-Allow-Credentials', true);
	next();
}