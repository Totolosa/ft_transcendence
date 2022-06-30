import Vector from "@/game2.0/Vector"
import Racket from "@/game2.0/Racket"
import Konva from "konva"

export default class Wall {
	vector: Vector;
	width: number;
	side: boolean;
	x: number;
	y: number;
	angle: number;
	index: number;
	racket?: Racket;
	constructor(width: number, vector: Vector, side: boolean, coordonate: Vector, index: number, nbrWall: number) {
		this.vector = vector;
		this.width = width;
		this.side = side;
		this.index = index
		this.x = coordonate.x;
		this.y = coordonate.y;
		this.angle = index * (360 / nbrWall);
		// console.log(this.angle + " = x:" + this.x + " y: " + this.y)
		if (side) {
			this.racket = new Racket()
		}
	}
	getKonvaRacket() {
		return new Konva.Rect({
			x: this.x,
			y: this.y,
			rotation: this.angle,
			width: this.width / 4,
			height: 10,
			fill: "#16638D",
		});
	}
	getKonva() {
		const rec = new Konva.Rect({
			x: this.x,
			y: this.y,
			rotation: this.angle,
			width: 7,
			height: this.width,
			fill: "#16638D",
		});
		// rec.on("pointerover", () => {
		// 	console.log(this.index)
		// })
		return rec
	}
}
