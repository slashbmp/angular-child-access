import { Component, Input } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
	selector: "sweet-child",
	template: `==={{myTheName}}===`
})

export class SweetChild {
	private myTheName: string;
	private myParent: AppComponent;

	@Input() set theName(val: string) {
		this.myTheName = val;
	}

	@Input() set theParent(val: AppComponent) {
		this.myParent = val;
		val.childs.push(this);
	}
}