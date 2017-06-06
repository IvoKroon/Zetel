var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject(x, y) {
        this.x = x;
        this.y = y;
    }
    return GameObject;
}());
var CircleObject = (function (_super) {
    __extends(CircleObject, _super);
    function CircleObject(x, y, radius) {
        _super.call(this, x, y);
        this.radius = radius;
    }
    return CircleObject;
}(GameObject));
var Game = (function () {
    function Game() {
    }
    Game.prototype.loader = function () {
        var _this = this;
        console.log("loaded");
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.planet = new Planet(this.canvas.width / 2, this.canvas.height / 2);
        document.addEventListener("touchstart", function (e) { _this.mouseDown = true; }, false);
        document.addEventListener("touchend", function (e) { _this.mouseDown = false; }, false);
        document.addEventListener("mouseup", function (e) { _this.mouseDown = false; });
        document.addEventListener("mousedown", function (e) { _this.mouseDown = true; });
        fullScreen(this.canvas);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
            Game.instance.loader();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.mouseDown) {
            console.log("Clicking");
        }
        else {
            console.log("Not clicking!");
        }
        this.planet.holding(this.mouseDown);
        this.planet.draw();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
function fullScreen(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("load", function () {
    Game.getInstance();
});
var Planet = (function (_super) {
    __extends(Planet, _super);
    function Planet(x, y) {
        _super.call(this, x, y, 20);
        this.game = Game.getInstance();
    }
    Planet.prototype.draw = function () {
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI, false);
        this.game.ctx.fillStyle = 'green';
        this.game.ctx.fill();
    };
    Planet.prototype.holding = function (mouseDown) {
        if (mouseDown) {
            console.log("Holding");
            this.radius += 0.1;
        }
    };
    Planet.prototype.move = function () {
    };
    return Planet;
}(CircleObject));
var Util = (function () {
    function Util() {
    }
    Util.collisionCircle = function (circle1, circle2) {
        var dx = circle1.x - circle2.x;
        var dy = circle1.y - circle2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < circle1.radius + circle2.radius) {
            return true;
        }
        return false;
    };
    return Util;
}());
//# sourceMappingURL=main.js.map