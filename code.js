var roles = []
var players = []

function Player(n, str, role) {
    this.id = n;
    this.name = str;
    this.role = role;
    this.dead = false;
    this.turnsinfected = 0;
    if (role == "covidiot") {
        this.infected = true;
        this.immune = true;
    } else {
        this.infected = false;
        this.immune = true;
    }
    this.quarantine = false;
    this.roleblocked = false;
    this.target1 = "";
    this.target2 = "";
    this.targetlist = [];
}

function kill(player) {
    player.dead = true;
    player.infected = false;
    player.turnsinfected = 0;
}

function infect(player) {
    if (!player.immune) player.infected = true;
}

function heal(player) {
    if (player.infected) {
        player.immune = true;
        player.infected = false;
    }
}

function covidiot(player) {
    if (!player.roleblocked) {
        for (var i = 0; i < player.targetlist.length; i++) {
            if (player.targetlist[i].role == "paranoid") {
                player.targetlist[i].push();
            } else {
                infect(player.targetlist[i]);
            }
        }
    }
}

function telemarketer(player) {
    for (var i = 0; i < player.targetlist.length; i++) {
        player.targetlist[i].roleblock = true;
        if (player.infected) infect(player.targetlist[i]);
        else if (player.targetlist[i].infected) infect(player);
    }
}

function doctor(player) {
    if (!player.roleblocked) {
        for (var i = 0; i < player.targetlist.length; i++) {
            if (player.targetlist[i].role == "paranoid") {
                player.targetlist[i].push();
            } else {
                heal(player.targetlist[i]);
            }
        }
    }
}

function tester(player) {
    if (!player.roleblocked) {
        for (var i = 0; i < player.targetlist.length; i++) {
            if (player.targetlist[i].role == "paranoid") {
                player.targetlist[i].push();
            } else {
                if (player.infected) infect(player.targetlist[i]);
                else if (player.targetlist[i].infected) {
                    infect(player);
                    return player.name + "is infected.";
                } else return player.name + "is not infected";
            }
        }
    }
}

function detective(player) {
    if (!player.roleblocked) {
        for (var i = 0; i < player.targetlist.length; i++) {
            if (player.targetlist[i].role == "paranoid") {
                player.targetlist[i].push();
            } else {
                if (player.infected) infect(player.targetlist[i]);
                else if (player.targetlist[i].infected) infect(player);
                return player.name + "is a" + player.role;
            }
        }
    }
}

function paranoid(player) {
    if (!player.roleblocked) {
        for (var i = 0; i < player.targetlist.length; i++) {
            player.targetlist[i].dead = true;
        }
    }
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

        // swap elements array[i] and array[j]
        var t = array[i];
        array[i] = array[j];
        array[j] = t;
    }
}
//var example = new Player(...);
function setup() {
    document.getElementById("playerinfo").display = "none";
}
