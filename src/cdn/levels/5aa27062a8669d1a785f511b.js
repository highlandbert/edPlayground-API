var circle = playground.element.rectangle(100, 200, 75, 75, { borderRadius: 10 });

playground.addBehaviour(function(delta) {
    circle.x += delta * (circle.x > 500 ? 0 : 1);
});

var c2 = playground.element.circle(200, 200, 25, { fillColor: 0xFFFF0B });
playground.addBehaviour(function(delta) {
    c2.x += delta * (c2.x > 500 ? 0 : 1);
});

var s1 = playground.element.sprite(100, 400, 'sloth.png');

c2.interact(function(event) {
    console.log(c2);
    s1.scale.x += 1;
    s1.scale.y += 1;
    if (s1.scale.x > 3) {
        playground.finishLevel();
    }
});