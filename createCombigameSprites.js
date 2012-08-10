var Canvas = require('canvas');
var size = 625;
var color, figure, count, fill, canvas;
var testOnly = 1;
var img, ctx;

for(color = 0; color < 3; ++color) {
    for(figure = 0; figure < 3; ++figure) {
        for(count = 0; count < 3; ++count) {
            for(fill = 0; fill < 3; ++fill) {
                if(testOnly) {
                    ++testOnly;
                    if(testOnly !== 53) {
                        continue;
                    }
                }
                img = new Canvas(size, size);
                canvas = new Canvas(825, 1125);
                require('./combigameCards.js').drawCard(img, color, figure, count, fill, size); 
                ctx = canvas.getContext('2d');
                ctx.fillStyle = '#fff';
                ctx.fillRect(0,0,825,1125);
                ctx.drawImage(img, 100, 250);
                writePng(canvas, '' + color + figure + count + fill);
            }
        }
    }
}


canvas = new Canvas(825, 1125);
ctx = canvas.getContext('2d');
ctx.fillStyle = '#fff';
ctx.fillRect(0,0,825,1125);
ctx.font = '80px Ubuntu';
function randDarkColor() {
    function hx() {
        return '01234567'[Math.random()*8|0];
    }
    return '#' + hx() + hx() + hx();
}
function randLightColor() {
    function hx() {
        return '89abcdef'[Math.random()*8|0];
    }
    return '#' + hx() + hx() + hx();
}
ctx.shadowBlur = 8;
ctx.shadowColor = '#000'
for(var i =0 ; i < 1000; ++i) {
    ctx.fillStyle = randLightColor();
    ctx.fillText('combigame.com', Math.random() * 800-200, Math.random() * 1125);
}
var out = require('fs').createWriteStream('backface.png');

var stream = canvas.createPNGStream();
stream.on('data', function(chunk){
    out.write(chunk);
});


function writePng(canvas, name) {
    var out = require('fs').createWriteStream('faces/' + name + '.png');
    var stream = canvas.createPNGStream();
    stream.on('data', function(chunk){
        out.write(chunk);
    });
};
