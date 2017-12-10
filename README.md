```
npm -g install readfile-line
git clone https://github.com/Daeren/readfile-line.git
```


```javascript
const readline = require("readfile-line");

//-------------]>

const num = await readline("data.xdb", await function(data, index, next) {
    next();
});

...

const num = await readline("data.xdb",
    function filter(data, next) {
        if(!data) {
            next();
        }
        else {
            next(null, data);
        }
    },
    function iterator(data, index, next) {
        next(null);
    },
	/\r?\n/);
```


## License

MIT

----------------------------------
[@ Daeren][1]
[@ Telegram][2]


[1]: http://666.io
[2]: https://telegram.me/io666
