import Player from "./player.js";
import Enemy from "./enemy.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

const player = new Player({x: 0, y: 0}, 'red');
player.setContext(context);
const enemy = new Enemy({x: 400, y: 0}, 'red');
enemy.setContext(context);

player.draw();
enemy.draw();