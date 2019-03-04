import { Component } from '@angular/core';
import { SweetChild, Charger, Kios } from "./child.component";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	title = 'access-child';

	private childs: SweetChild[] = [];
	private childDatas: any[] = [];
	private chargers: Charger[] = [];
	private kiosList: Kios[];

	constructor() {
		this.kiosList = [{
			"id": "K001",
			"name": "Kios 1",
			"enabled": true
		},
		{
			"id": "K002",
			"name": "Kios 2",
			"enabled": true
		},
		{
			"id": "K003",
			"name": "Kios 3",
			"enabled": true
		}];
	}

	ngAfterViewInit() {
		this.childs = [];
		for (let i = 0; i < 5; i++) {
			this.childDatas.push({
				"index": i
			});
		}
	}

	private findKiosIndex(kiosId: string): number {
		for (let i = 0; i < this.kiosList.length; i++) {
			if (this.kiosList[i].id == kiosId) {
				return i;
			}
		}
		return -1;
	}

	public addChild(child: SweetChild) {
		this.childs.push(child);
		let strKiosList = JSON.stringify(this.kiosList);
		let kiosList = JSON.parse(strKiosList);
		this.childs[this.childs.length - 1].setKiosChoice(kiosList);
	}

	public childSelectKios(childIndex: number, kiosId: string): void {
		for (let i = 0; i < this.childs.length; i++) {
			if (i == childIndex) {
				continue;
			}
			this.childs[i].delKiosChoice(kiosId);
		}
	}

	public childReleaseKios(childIndex: number, kiosId: string): void {
		for (let i = 0; i < this.childs.length; i++) {
			// if (i == childIndex) {
			// 	continue;
			// }
			this.childs[i].releaseKiosChoice(kiosId);
		}
	}

	private drawForm(): void {
		for (let i = 0; i < 5; i++) {
			let charger = {
				chargerId: "CID 1",
			};
		}
	}

	private exportAllData(): void {
		for (let i = 0; i < this.childs.length; i++) {
			let child: SweetChild = this.childs[i];
			let data: Charger = child.export();
			console.log(">>>> ", data);
		}
	}
}
