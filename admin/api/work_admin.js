exports.autoroute = {
    'get': {
        '/hello(/?)': hello,
        '/hello/:id': hello2
    },
    'post': {

    }
}

function hello(req, res) {
    res.end('hello');
}

function hello2(req, res) {
    res.end('hello ' + req.params.id);
}