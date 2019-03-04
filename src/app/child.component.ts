import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import { AppComponent } from './app.component';

export interface Plug {
	name: string;
	types: string[];
}

export interface Charger {
	chargerId: string;
	kiosId: string;
}

export interface Kios {
	id: string;
	name: string;
	enabled: boolean;
}

@Component({
	selector: "sweet-child",
	templateUrl: "./child.component.html"
})

export class SweetChild {
	private _index: number;
	private myParent: AppComponent;
	private myFormGroup: FormGroup;
	private formData: Charger;
	private myKiosList: Kios[];
	private myKiosValue: string = null;

	@Input() set index(val: number) {
		console.log(">> ", val);
		this._index = val;
	}

	@Input() set theParent(val: AppComponent) {
		this.myParent = val;
		val.addChild(this);
	}

	ngOnInit() {
		this.myFormGroup = new FormGroup({
			'chargerId': new FormControl(null, [
				Validators.required,
				Validators.minLength(4)
			]),
			'kiosId': new FormControl(null, Validators.required)
		});

		this.myFormGroup.get('kiosId').valueChanges.subscribe(val => {
			if (this.myKiosValue != null) {
				this.myParent.childReleaseKios(this._index, this.myKiosValue);
			}
			this.myKiosValue = val;
			if (val == "") {
				return;
			}
			this.myParent.childSelectKios(this._index, val);
		});
	}

	public setKiosChoice(kios: Kios[]): void {
		this.myKiosList = kios;
	}

	public delKiosChoice(kiosId: string): void {
		for (let i = 0; i < this.myKiosList.length; i++) {
			if (this.myKiosList[i].id == kiosId) {
				this.myKiosList[i].enabled = false;
				break;
			}
		}
	}

	public releaseKiosChoice(kiosId: string): void {
		for (let i = 0; i < this.myKiosList.length; i++) {
			if (this.myKiosList[i].id == kiosId) {
				this.myKiosList[i].enabled = true;
				break;
			}
		}
	}

	public export(): Charger {
		// if (this.myFormGroup.controls['chargerId'].invalid && (this.myFormGroup.controls['chargerId'].dirty || this.myFormGroup.controls['chargerId'].touched)) {
		// 	return null;
		// }
		// if (this.myFormGroup.controls['kiosId'].invalid && (this.myFormGroup.controls['kiosId'].dirty || this.myFormGroup.controls['kiosId'].touched)) {
		// 	return null;
		// }
		let dat = {
			"chargerId": this.myFormGroup.controls["chargerId"].value,
			"kiosId": this.myFormGroup.controls["kiosId"].value
		};
		return dat;
	}
}