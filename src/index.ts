import {Minion} from "./objects/minions/minion";
import {Projectile} from "./objects/projectiles/projectile";
import {Cannon} from "./objects/cannons/cannon";

const cannons: Cannon[] = [];
const projectiles: Projectile[] = [];
const minions: Minion[] = [];

const spawnMinion = () => {
    minions.push({
        position: {x: 0, y: 0},
        move: () => {},
        calcPath: () => {}
    });
};

const moveMinions = () => {
    minions.forEach(m => m.move());
};

const minionsSpawner = () => {
    setInterval(() => {
        spawnMinion();
    }, 2000);
};

const addCannon = (type, position) => {
};

minionsSpawner();

const gameTick = () => {
    setInterval(() => {
        console.log('We have: ' + minions.length + 'minions!');
    }, 1000 / 60);
};

gameTick();