//ui_ Class Can Not Have The Next
//abstract ui_ class Inheritance
//ui_ Class's Statement Sector
//ui_ Class's Data Sector
//ui_ Class Must Be Simple And Light-Weight.
class ui_{
	#idx;
	constructor(idx){
		//CheckPoint
		//-1 < uid < System_.#uid_cnt
		//AND
		//-1 < idx < ElementManager.Count Limit Of UI()
		let chk = Number.isFinite(idx) && -1 < idx && idx < DataManager.get_CLOUI();
		if(chk){
			this.#idx = idx | 0;
			Object.seal(this);
		}
	}
	get_idx(){
		return this.#idx;
	}
	get_uid(){
		return DataManager.ref('uid',this.#idx);
	}
	get_pidx(){
		return DataManager.ref('pidx',this.#idx);
	}
	get_x(){
		return DataManager.ref('x',this.#idx);
	}
	get_y(){
		return DataManager.ref('y',this.#idx);
	}
	get_w(){
		return DataManager.ref('w',this.#idx);
	}
	get_h(){
		return DataManager.ref('h',this.#idx);
	}
	get_coord(){
		let output = new Uint32Array(2);
		DataManager.get_coord(this.#idx, output);
		return output;
	}
	get_area(){
		let output = new Uint32Array(2);
		DataManager.get_area(this.#idx, output);
		return output;
	}
	get_rect(){
		let output = new Uint32Array(4);
		DataManager.get_rect(this.#idx, output);
		return output;
	}
	get_state1(){
		return DataManager.state1(this.#idx);
	}
	get_state2(){
		return DataManager.state2(this.#idx);
	}
	set_customState1(bit32){
		DataManager.setCustomState1(bit32,this.#idx);
	}
	get_customState1(){
		return DataManager.getCustomState1(this.#idx);
	}
	set_customState2(bit32){
		DataManager.setCustomState2(bit32,this.#idx);
	}
	get_customState2(){
		return DataManager.getCustomState2(this.#idx);
	}
	//rect calculation to coordinate of parent chain
	//omitted in this area -> calculation in the ElementManager
	//STEP1. Set The Function's Parameter Of Abstract Class
	//ElementManager.SetParams(Parameter1, parameter2, ... parameterN -> [Arguments Object]);
	//STEP2. Call the ui_.ACFE();
	//Please Write The Next Format;
	//DataManager.set_parameter('Abstract Class Name', 'get_p0rect', [ Omitted Array Of Parameters ]);
	//ui_.ACFE();

	//Abstract Class Function Executioner
	//This Function Execution By DataManager
	static ACFE(){
		DataManager.ACG();
	}
}

//DataManager class
class DataManager{
	//Count Limit Of UI is 10000
	static #CLOUI = 10000;
	//default uid value is 1
	static #uid_ = 1;
	static #uid = new Uint32Array(DataManager.#CLOUI).fill(0);
	static #pidx = new Uint32Array(DataManager.#CLOUI).fill(0);
	static #x = new Uint32Array(DataManager.#CLOUI).fill(0);
	static #y = new Uint32Array(DataManager.#CLOUI).fill(0);
	static #w = new Uint32Array(DataManager.#CLOUI).fill(0);
	static #h = new Uint32Array(DataManager.#CLOUI).fill(0);
	static #parameters;
	static #container = new Array(20).fill(undefined);
	//Data Process Sector
	static set_parameters(){
		DataManager.#parameters = arguments;
	}
	static idxValChk(idx){
		let chk = Number.isFinite(idx) && -1 < idx && idx < DataManager.#CLOUI;
		return chk;
	}
	static ref(AttName, idx){
		let chk = isstr(AttName) && idxValChk(idx);
		let i;
		if(chk){
			idx = idx | 0;
			i = idx + 1;
			switch(AttName){
				case 'uid':
					DataManager.#container[0] = DataManager.#uid.subarray(idx,i);
				break;
				case 'pidx':
					DataManager.#container[0] = DataManager.#pidx.subarray(idx,i);
				break;
				case 'x':
					DataManager.#container[0] = DataManager.#x.subarray(idx,i);
				break;
				case 'y':
					DataManager.#container[0] = DataManager.#y.subarray(idx,i);
				break;
				case 'w':
					DataManager.#container[0] = DataManager.#w.subarray(idx,i);
				break;
				case 'h':
					DataManager.#container[0] = DataManager.#h.subarray(idx,i);
				break;
			}
			return DataManager.#container[0];
		}
	}
	static get_uid(idx, out)
	static get_coord(idx, output){
		let chk = DataManager.idxValChk(idx) && isOInst(output,'ui32a') && output.length === 2;
		switch(chk){
			case true:
				idx = idx | 0;
				output[0] = DataManager.#x[idx];
				output[1] = DataManager.#y[idx];
			break;
			case false:
				DataManager.#container[0] = DataManager.#x;
				DataManager.#container[1] = DataManager.#y;
			break;
		}
		if(!chk) return DataManager.#container;
	}
	static get_area(idx, output){
		let chk = DataManager.idxValChk(idx) && isOInst(output,'ui32a') && output.length === 2;
		switch(chk){
			case true:
				idx = idx | 0;
				output[0] = DataManager.#w[idx];
				output[1] = DataManager.#h[idx];
			break;
			case false:
				DataManager.#container[0] = DataManager.#w;
				DataManager.#container[1] = DataManager.#h;
			break;
		}
		if(!chk) return DataManager.#container;
	}
	static get_rect(idx, output){
		let chk = DataManager.idxValChk(idx) && isOInst(output,'ui32a') && output.length === 4;
		if(chk){
		}
		switch(chk){
			case true:
				idx = idx | 0;
				output[0] = DataManager.#x[idx];
				output[1] = DataManager.#y[idx];
				output[2] = DataManager.#w[idx];
				output[3] = DataManager.#h[idx];
			break;
			case false:
				DataManager.#container[0] = DataManager.#w;
				DataManager.#container[1] = DataManager.#h;
				DataManager.#container[2] = DataManager.#w;
				DataManager.#container[3] = DataManager.#h;
			break;
		}
		if(!chk) return DataManager.#container;
	}
}