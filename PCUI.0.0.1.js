//Original Script Author : passion(lklslel)
//All Rights Reserved Copyright 2015 ~ (current year). by passion(lklslel - naver ID)

//public function area start
//tuc start
//use switch only. do not use if
function tuc(char){
	let DATACHK = isstr(char);
	let RUN = true, result = char;
	switch(false){
		case DATACHK:
			RUN = false;
		break;
	}
	switch(RUN){
		case true:
			result = char.toUpperCase();
		break;
	}
	return result;
}
//tuc end
//tlc start
//use switch only. do not use if
function tlc(char){
	let DATACHK = isstr(char);
	let RUN = true, result = char;
	switch(false){
		case DATACHK:
			RUN = false;
		break;
	}
	switch(RUN){
		case true:
			result = char.toLowerCase();
		break;
	}
	return result;
}
//tlc end
//isbool start
//use switch only. do not use if
function isbool(b){
	let result = false;
	switch(b){
		case true:
		case false:
			result = true;
		break;
	}
	return result;
}
//isbool end
//isobj start
//use switch only. do not use if
function isobj(o){
	let DATACHK = (typeof o === 'object') && (o !== null);
	let RUN = true, result = false;
	switch(false){
		case DATACHK:
			RUN = false;
		break;
	}
	switch(RUN){
		case true:
			result = true;
		break;
	}
	return result;
}
//isobj end
//isobj2 start
//this helper function's usage is the next ;
//object check include the 'null'
//null check for reset the PSlot_ instance
//use switch only. do not use if
function isobj2(o){
	let DATACHK = (typeof o === 'object');
	let RUN = true, result = false;
	switch(false){
		case DATACHK:
			RUN = false;
		break;
	}
	switch(RUN){
		case true:
			result = true;
		break;
	}
	return result;
}
//isobj2 end
//isstr start
//use switch only. do not use if
function isstr(str){
	//console.log('str = ' + str + ', typeof str = ' + typeof str + ', str.length = ' + str.length);
	//console.log('typeof str === \'string\' && str.length > 0 is ' + (typeof str === 'string' && str.length > 0));
	let DATACHK = typeof str === 'string' && str.length > 0;
	let RUN = true, result = false;
	switch(false){
		case DATACHK:
			RUN = false;
		break;
	}
	switch(RUN){
		case true:
			result = true;
		break;
	}
	return result;
}
//isstr end
//isstr2 start
//this helper function's usage is the next ;
//blank string('') for reset the string variable
//need to check the any string (include ASCII control chracter)
//ASCII control character is 0 width character...
//AND break the other normal character.
//use switch only. do not use if
function isstr2(str){
	let DATACHK = typeof str === 'string';
	let RUN = true, result = false;
	switch(false){
		case DATACHK:
			RUN = false;
		break;
	}
	switch(RUN){
		case true:
			result = true;
		break;
	}
	return result;
}
//isstr2 end
//isfunc start
//use switch only. do not use if
function isfunc(func){
	let DATACHK = typeof func === 'function';
	let RUN = true, result = false;
	switch(false){
		case DATACHK:
			RUN = false;
		break;
	}
	switch(RUN){
		case true:
			result = true;
		break;
	}
	return result;
}
//isfunc end
//isOInst start
//is object's instance?
//use switch only. do not use if
function isOInst(object, category){
	let DATACHK = isobj(object) && isstr(category);
	let RUN = true, result = false;
	switch(false){
		case DATACHK:
			RUN = false;
		break;
	}
	//need 'any_' class/object set to variable 'origin'
	let origin;
	let VAL = false;
	switch(RUN){
		case true:
			switch(category){
				case 'ev'://Event
					origin = Event;
				break;
				case 'ps'://PSlot
					origin = PSlot;
				break;
				case 'sys'://system_ class
					origin = system_;
				break;
				case 'ime'://ime_ class
					origin = ime_;
				break;
				case 'ctx2d'://CanvasRenderingContext2D
					origin = CanvasRenderingContext2D;
				break;
				case 'obj'://object_
					origin = object_;
				break;
				case 'ui'://ui_
					origin = ui_;
				break;
				case 'flag'://flag_
					origin = flag_;
				break;
				case 'interact'://interactive_ui_
					origin = interactive_ui_;
				break;
				case 'interactnors'://interactive_ui_non_rs
					origin = interactive_ui_non_rs;
				break;
				case 'editui'://editable_ui_
					origin = editable_ui_;
				break;
				case 'btn'://button_
					origin = button_;
				break;
				case 'ttip'://tooltip_
					origin = tooltip_;
				break;
				case 'tipui'://tipui_
					origin = tipui_;
				break;
				case 'fly'://fly_
					origin = fly_;
				break;
				case 'dust'://dust_
					origin = dust_;
				break;
				case 'bar'://bar_
					origin = bar_;
				break;
				case 'carea'://contents_area_
					origin = contents_area_;
				break;
				case 'winui'://window_
					origin = window_;
				break;
			}
			switch(isfunc(origin)){
				case true:
					VAL = object instanceof origin;
				break;
			}
		break;
	}
	switch(true){
		case VAL:
			result = true;
		break;
	}
	return result;
}
//isOInst end
//to_bin start
function to_bin(num){
	let DATACHK = Number.isFinite(num) && num > -1;
	let RUN = true, result = '0b0000000';
	switch(RUN){
		case true:
			result = Number(num).toString(2);
			switch(result.length){
				case 1:
					result = '0b000000' + result;
				break;
				case 2:
					result = '0b00000' + result;
				break;
				case 3:
					result = '0b0000' + result;
				break;
				case 4:
					result = '0b000' + result;
				break;
				case 5:
					result = '0b00' + result;
				break;
				case 6:
					result = '0b0' + result;
				break;
				default:
					result = '0b' + result;
				break;
			}
		break;
	}
	return result;
}
//to_bin end
//compare_rect start
function compare_rect(r1, r2){
	let DATACHK = isobj(r1) && Object.hasOwn(r1, 'x')
	&& Object.hasOwn(r1, 'y') && Object.hasOwn(r1, 'w')
	&& Object.hasOwn(r1, 'h') && isobj(r2)
	&& Object.hasOwn(r2, 'x') && Object.hasOwn(r2, 'y')
	&& Object.hasOwn(r2, 'w') && Object.hasOwn(r2, 'h');
	let RUN = true, result = false;
	switch(false){
		case DATACHK:
			RUN = false;
		break;
	}
	let VAL;
	switch(RUN){
		case true:
			VAL = r1.x === r2.x && r1.y === r2.y
			&& r1.w === r2.w && r1.h === r2.h;
		break;
	}
	switch(VAL){
		case true:
			result = true;
		break;
	}
	return result;
}
//compare_rect start
//Is Array Like start
function IAL(al){
	let DATACHK = al && Object.hasOwn(al,'length');
	let RUN = true, result = false;
	switch(false){
		case DATACHK:
			RUN = false;
		break;
	}
	switch(RUN){
		case true:
			result = true;
		break;
	}
	return result;

}
//Is Array Like end
//public function area end
//class part start
//ui_ class part start
//object_ class start
class object_{
	this.parent = null;
	constructor(){
		this.set_parent = this.set_parent.bind(this);
		this.get_parent = this.get_parent.bind(this);
	}
	//set_parent start
	set_parent(parent){
		let DATACHK = isOInst(parent,'ui');
		let RUN = true, result = true;
		switch(false){
			case DATACHK:
				RUN = false;
				result = false;
			break;
		}
		let p, PVAL;
		switch(RUN){
			case true:
				p = sys.GPFSC(parent)
				//console.log('parent = ', p);
				PVAL = isOInst(p,'ui');
				//console.log('PVAL = ', PVAL);
				switch(PVAL){
					case false:
						result = false;
					break;
					case true:
						this.#parent = parent;
					break;
				}
			break;
		}
		return result;
	}
	//set_parent end
	//get_parent start
	get_parent(){
		return this.#parent;
	}
	//get_parent end
}
//object_ class end
//coord_ class start
class coord_ extends object_{
	this.x = 0;
	this.y = 0;
	constructor(x, y){
		super();
      this.x = x;
      this.y = y;
		Object.seal(this);
	}
	//set_x start
	set_x(x){
		let DATACHK = Number.isFinite(x) && x > -1;
		switch(DATACHK){
			case true:
				this.#x = Number(x);
			break;
			case false:
				this.#x = 0;
			break;
		}
	}
	//set_x end
	get_x(){
		return Number(this.#x);
	}
	//set_y start
	set_y(y){
		let DATACHK = Number.isFinite(y);
		switch(DATACHK){
			case true:
				this.#y = Number(y);
			break;
			case false:
				this.#y = 0;
			break;
		}
	}
	//set_y end
	get_y(){
		return Number(this.#y);
	}
	//set_coord start
	set_coord(x, y){
		this.set_x(x);
		this.set_y(y);
	}
	//set_coord end
	get_coord(){
		return {x: Number(this.#x), y: Number(this.#y)};
	}
}
//coord_ class end
//area_ class start
class area_ extends object_{
	#w;
	#h;
	constructor(w, h){
		super();
		this.set_area(w, h);
	}
	//set_w start
	set_w(w){
		let DATACHK = Number.isFinite(w);
		switch(DATACHK){
			case true:
				this.#w = Number(w);
			break;
			case false:
				this.#w = 0;
			break;
		}
	}
	//set_w end
	get_w(){
		return Number(this.#w);
	}
	//set_h start
	set_h(h){
		let DATACHK = Number.isFinite(h);
		switch(DATACHECK){
			case true:
				this.#h = Number(h);
			break;
			case false:
				this.#h = 0;
			break;
		}
	}
	//set_h end
	get_h(){
		return Number(this.#h);
	}
	//set_are start
	set_area(w, h){
		this.set_w(w);
		this.set_h(h);
	}
	//set_area end
	get_area(){
		return {w: Number(this.#w), h: Number(this.#h)};
	}
}
//area_ class end
//boundery_ class start
class boundery_ extends object_{
	#coord;
	#area;
	constructor(x, y, w, h){
		super();
		this.set_boundery(x, y, w, h);
	}
	set_coord(x, y){
		let DATACHK = Number.isFinite(x) && x > -1
		 && Number.isFinite(y) && y > -1;
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#coord = new coord_(x, y);
			break;
		}
	}
	get_coord(){
		return this.#coord.get_coord();
	}
	set_area(w, h){
		let DATACHK = Number.isFinite(w) && w > 0
		&& Number.isFinite(h) && h > 0;
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#area =  new area_(w, h);
			break;
		}
	}
	get_area(){
		return this.#area.get_area();
	}
	//get_Horizental_Attribute
	get_HAtt(){
		return {x:this.#coord.get_x(),w:this.#area.get_w()};
	}
	//get_Vertical_Attribute
	get_VAtt(){
		return {y:this.#coord.get_y(),h:this.#area.get_h()};
	}
	set_boundery(x, y, w, h){
		let DATACHK = Number.isFinite(x) && x > -1
		&& Number.isFinite(y) && y > -1
		&& Number.isFinite(w) && w > 0
		&& Number.isFinite(h) && h > 0;
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#coord = new coord_(x, y);
				this.#area =  new area_(w, h);
			break;
		}
	}
	get_boundery(){
		return {coord:this.#coord, area:this.#area};
	}
	get_rect_info(){
		let c = this.#coord.get_coord(), a = this.#area.get_area();
		return {x:c.x, y:c.y, w:a.w, h:a.h};
	}
	get_4p(){
		let c = this.#coord.get_coord(), a = this.#area.get_area();		
		return {x1:c.x, x2:c.x+a.w ,y1:c.y, y2:c.y+a.h};
	}
}
//boundery_ class end
//ui_ class start
class ui_ extends boundery_{
	//ui_'s unique id
	#uid;
	//image path list? or flag?
	//#src_ is can not set ' role ' in now.
	//data set means flag_? or path of media file?
	#src_ = [];
	//list of ui_ intance's children ui_
	#children = [];
	//ui_'s yop ui_ instance
	#top;
	#fs = null;
	#lh = null;
	constructor(x, y, w, h, src_array = []){
		super(x, y, w, h);
		this.set_src(src_array);
		//console.log(x,y,w,h,src_array);
	}
	//set_UID start
	//set the ui_.#uid
	setUID(uid){
		let DATACHK = Number.isFinite(uid) && uid > -1;
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#uid = Number(uid);
			break;
		}
	}
	//set_UID end
	//get the ui_.#uid
	getUID(){
		return Number(this.#uid);
	}
	//set_src start
	set_src(src_array){
		let DATACHK = Array.isArray(src_array)
		&& src_array.length > 0;
		let i, RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#src_ = src_array;
			break;
		}
	}
	//set_src end
	drop_src(){
		this.#src_.length = 0;
	}
	//set the this ui_'s top ui_
	set_top(ui){
		let DATACHK = isOInst(ui,'winui');
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#top = ui;
			break;
		}
	}
	//get top ui : window_ like ui_ instance of other top ui_ instance
	get_top(){
		return this.#top;
	}
	//get ui_'s children
	get_children(){
		return this.#children.slice();
	}
	get_childlen(){
		return Number(this.#children.length);
	}
	//get_last_child start
	get_last_child(){
		let ui = this;
		let result = null;
		let children = ui.get_children();
		let lclen = children.length - 1;
		let LCVAL = Array.isArray(children) && lclen > -1 && isOInst(children[lclen],'ui');
		while(LCVAL){
			ui = children[lclen];
			children = ui.get_children();
			lclen = children.length - 1;
			LCVAL = Array.isArray(children) && lclen > -1 && isOInst(children[lclen],'ui');
		}
		let UIVAL = isOInst(ui,'ui');
		switch(UIVAL){
			case true:
				result = ui;
			break;
		}
		return result;
	}
	//get_last_child end
	//get_parent0 start
	get_parent0(){
		let DATACHK = isOInst(this.get_parent(),'ui');
		let RUN = true, result = this;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				result = this.get_parent();
				while(isOInst(result.get_parent(),'ui')){
					result = result.get_parent();
				}
			break;
		}
		return result;
	}
	//get_parent0 end
	//get_sum_pos_rect start
	get_sum_rect(){
		let result = this.get_coord(), p, c, wh;
		wh = this.get_area();
		let VAL = isobj(wh) && Object.hasOwn(wh,'w')
		&& wh.w > 0 && Object.hasOwn(wh,'h') && wh.h > 0;
		switch(VAL){
			case true:
				result.w = wh.w;
				result.h = wh.h;
			break;
			case false:
				result.w = 0;
				result.h = 0;
			break;
		}
		p = this.get_parent();
		while(isOInst(p,'ui')){
			c = p.get_coord();
			result.x += c.x;
			result.y += c.y;
			p = p.get_parent();
		}
		//console.log('result',result);
		return result;
	}
	//get_sum_pos_rect end
	//add_child start
	//add the child on ui_
	add_child(ui){
		let DATACHK = isOInst(ui,'ui');
		let ISWIN = isOInst(this,'winui');
		let RUN = true, result = true;
		switch(false){
			case DATACHK:
				RUN = false;
				result = false;
			break;
		}
		switch(RUN){
			case true:
				this.#children.push(ui);
				switch(ISWIN){
					case true:
						ui.set_top(this);
					break;
				}
			break;
		}
		return result;
	}
	//add_child end
	//remove child start
	//remove child from ui_
	//index means ui_ instance's index of #children data set.
	//so, index must set the small than this.#children.length.
	//if ui_.#children have 3 of child ui_,
	//parents ui_.#children.length === 3.
	//but last index is ui_.#children.length - 1
	remove_child(index){
		let DATACHK = Number.isFinite(index) && index > -1 && index <= this.#children.length - 1;
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				try{
					let child = this.#children[index];
					child.set_parent(null);
					child.drop_src();
					this.#children.splice(index, 1);
					result = true;
				}catch(e){
					console.warn('ui_.remove_child failed', e);
				}
			break;
		}
		return result;
	}
}
//ui_ class end
//flag_ class start
//non_interactive_ui_ class : named 'flag_' ; can pinned position, this ui can not interaction.
//can rendering image & movie
class flag_ extends ui_{
	constructor(x, y, w, h, src_array = []){
		super(x, y, w, h, src_array);
	}
}
//flag_ class end
//interactive_ui_ class start
//interactive_ui_ class : it is can click, drag, resizing, ETC...
//can rendering image & movie
class interactive_ui_ extends ui_{
	constructor(x, y, w, h, src_array = []){
		super(x, y, w, h, src_array);
	}
}
//interactive_ui_ class end
//editable_ui_ class start
//editable_ui_ class : it is can write/delete text in boundery_
class editable_ui_ extends interactive_ui_{
	//if do not have #editable,
	//do not write / delete text
	#editable = true;
	constructor(x, y, w, h, src_array = []){
		super(x, y, w, h, src_array);
		this.text = '';
	}
	get_editable(){
		return !!(this.#editable);
	}
}
//editable_ui_ class end
//none resizable interactive ui class start
class interactive_ui_non_rs extends interactive_ui_{
	//resize is always false ; can not set the resiz-able
	#rs = false;
	constructor(x, y, w, h, src_array = []){
		super(x, y, w, h, src_array);
	}
	get_rs(){
		//return false;
		return !!(this.#rs);
	}
}
//none resizable interactive ui class end
//manipulator_ class start
//this class is draggable ui_ instance's top abstract class.
class manipulator_ extends interactive_ui_{
	#drag = true;
	constructor(x, y, w, h, src_array = []){
		super(x, y, w, h, src_array);
	}
	set_drag(bool){
		let DATACHK = isbool(bool), RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#drag = bool;
			break;
		}
	}
	get_drag(){
		return !!(this.#drag);
	}
}
//manipulator_ class end
//fly_ class start
//this class can drag to drop any space.
//if you want to implement the item drop or pickup,
//use this abstract class to implement to NEW UI class
class fly_ extends manipulator_{
	#fly = true;
	constructor(x, y, w, h, src_array = []){
		super(x, y, w, h, src_array);
	}
}
//fly_ class end
//dust_ class start
//this class can drag in limited area of UI element.
//this class is abstract class
class dust_ extends manipulator_{
	constructor(x, y, w, h, src_array = []){
		super(x, y, w, h, src_array);
	}
}
//dust_ class end
//button_ class start
class button_ extends interactive_ui_non_rs{
	constructor(x, y, w, h, src_array = []){
		super(x, y, w, h, src_array);
	}
}
//button_ class end
//tooltip_ class start
//tooltip info
class tooltip_ extends interactive_ui_non_rs{
	constructor(x, y, w, h, src_array = []){
		super(x, y, w, h, src_array);
	}
}
//tooltip_ class end
//bar_ class start
//bar_ class : bar_ instance can drag the window_ instance
//bar_ instatnce is first child of window_ instance.
//and window_ class have .bar attribute.
//this attribute will faster more than window_.children[0].
//and you can use the window_.children[0].
//will be automatically set the width by window_ instance's resized width.
//bar_ instance's width = window_ instance's width
class bar_ extends dust_{
	//title : if you do not want write this, just ''
	#text = '';
	//mimum button
	#min_btn;
	//maximum button
	#max_btn;
	//close button
	#cls_btn;
	#buttons = [];
	//prepare the get_buttons and focus / hit check
	constructor(x, y, w, h, src_array = []){
		//will be set the width belong to window_'s width
		super(x, y, w, h, src_array);
	}
	set_btns(img = {min:[], max:[], close:[]}){
		let DATACHK = isobj(img) && Array.isArray(img.min)
			&& Array.isArray(img.max) && Array.isArray(img.close);
		let RUN = true;
		let b, x, y, w, h;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				b = this.get_rect_info();
				x = b.x;
				y = b.y;
				w = b.w;
				h = b.h;
				//console.log(b,x,y,w,h);
				
				this.#min_btn = new button_(x + (w - (h * 3)), y, h, h, img.min);
				this.#max_btn = new button_(x + (w - (h * 2)), y, h, h, img.max);
				this.#cls_btn = new button_(x + w - h, y, h, h, img.close);
				this.#buttons = [this.#min_btn, this.#max_btn, this.#cls_btn];
			break;
		}
	}
	//get the bar_'s buttons
	get_btns(){
		return [this.#buttons[0],this.#buttons[1],this.#buttons[2]];
	}
}
//bar_ class end
//contents_area_ class start
//contents_area_ class ; this class can have 'contents'. is not a 'content'
//contents_area_ class are window_'s origin class.
//but contents_area_ can not draggable ui.
//and can not have pinned state variable.
//do not toggle the pinned state value. default: false
class contents_area_ extends interactive_ui_non_rs{
	#contents;
	constructor(x, y, w, h, src_array = [], contents_info = {}){
		super(x, y, w, h, src_array);
	}
	//set_contents start
	set_contents(content_array = {}){
		let DATACHK = Array.isArray(content_array)
		&& content_array.length > 0 && isOInst(content_array[0],'ui');
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#contents = content_array;
			break;
		}
	}
	//set_contents end
	//get_contents start
	get_contents(){
		let result = [];
		let CONVAL = Array.isArray(this.#contents) && this.#contents.length > 0;
		switch(CONVAL){
			case true:
				result = this.#contents.slice();
			break;
		}
		return result;
	}
	//get_contents start
}
//contents_area_ class end
//window_ class start
//window_ class ; can have bar_, contents_area_.
//hit check process will be bar_ to contents_area_
//window_ instance can drag bar_'s area to move-to on ' canvas ' area
class window_ extends interactive_ui_{
	//bar_ instance
	#bar;
	//contents_area_ instance
	#contents_area;
	//enable the window_ drag?
	//if pinned is true, you can not drag the window_
	//if pinned is false, you can drag the window_
	#pinned = false;
	constructor(x, y, w, h, src_array = [], pinned = false){
		super(x, y, w, h, src_array);
		this.set_pinned(pinned);
	}
	//set_bar start
	set_bar(bar_info = {x:0, y:0, w:0, h:20, src_array:[], btn_img:{min:[], max:[], close:[]}}){
		//bar_ instance date format check
		let DATACHK = isobj(bar_info) && Object.hasOwn(bar_info,'x')
		&& Number.isFinite(bar_info.x) && Object.hasOwn(bar_info,'y')
		&& Number.isFinite(bar_info.y) && Object.hasOwn(bar_info,'w')
		&& Number.isFinite(bar_info.w) && Object.hasOwn(bar_info,'h')
		&& Number.isFinite(bar_info.h) && Object.hasOwn(bar_info,'src_array')
		&& Array.isArray(bar_info.src_array) && Object.hasOwn(bar_info,'btn_img')
		&& isobj(bar_info.btn_img) && Object.hasOwn(bar_info.btn_img,'min')
		&& Object.hasOwn(bar_info.btn_img,'max') && Object.hasOwn(bar_info.btn_img,'close');
		//bar_ instance's coordinattion & area limitation
		//default rule
		//-1 < bar_.#x < (window_.#w - 20)
		//-1 < bar_.#y < (window_.#h - 20)
		//AT LEAST 20(w) * 20(h) SIZE
		let r = this.get_rect_info();
		let w = r.w;
		let h = r.h;
		let DATACHK2 = DATACHK && bar_info.x > -1 && bar_info.x < (w - 20)
		&& bar_info.y > -1 && bar_info.y < (h - 20)
		&& bar_info.w > 19 && bar_info.h > 19;
		switch(true){
			case(DATACHK && DATACHK2):
				this.#bar = new bar_(bar_info.x, bar_info.y, bar_info.w, bar_info.h, bar_info.src_array, bar_info.btn_img);
			break;
			case(DATACHK && !DATACHK2):
				this.#bar = new bar_(0, 0, w, bar_info.h, bar_info.src_array, bar_info.btn_img);
			break;
		}
		//console.log(this.#bar);
	}
	//set_bar end
	//get_bar start
	get_bar(){
		return this.#bar;
	}
	//get_bar end
	//set_contents_area start
	set_contents_area(ca_info = {src_array:[], contents_info:{}}){
		//contents_area_ instance's data format check
		let DATACHK = isobj(ca_info) && Object.hasOwn(ca_info,'src_array')
		&& Array.isArray(ca_info.src_array) && Object.hasOwn(ca_info,'contents_info')
		&& isobj(ca_info.contents_info) && isOInst(this.get_bar(),'bar');
		//console.log(DATACHK);
		//contents_area_ instance's coordination & area limitation
		let caha, cava;
		let r = this.get_rect_info();
		let x = r.x;
		let y = r.y;
		let w = r.w;
		let h = r.h;
		let br = this.get_bar().get_rect_info();
		let cax = 0;
		let cay = br.h;
		let caw = w;
		let cah = h - br.h;
		let DATACHK2 = DATACHK && isobj(br)
		&& (((cax + caw) <= br.x && (br.x + br.w) <= w)
		|| ((w - br.x + br.w) >= caw && (cax + caw) <= w)
		|| ((cay + cah) <= br.y && (br.y + br.h) <= h)
		|| ((h - br.y + br.h) >= cah && (cay + cah) <= h))
		&& isobj(ca_info.contents_info);
		//console.log(DATACHK2);
		switch(DATACHK2){
			case true:
				this.#contents_area = new contents_area_(cax, cay, caw, cah, ca_info.src_array, ca_info.contents_info);
			break;
		}
		//console.log(this.#contents_area);
	}
	//set_contents_area end
	//get_contents_area start
	get_contents_area(){
		return this.#contents_area;
	}
	//get_contents_area end
	set_pinned(v){
		this.#pinned = !!v;
	}
	is_pinned(){
		return this.#pinned;
	}
	set_pos(x, y){
		this.set_coord(x, y);
	}
	move_to(x = 0, y = 0){
		switch(this.#pinned){
			case true:
			break;
			case false:
				let coord = this.get_coord();
				this.set_pos(x, y);
			break;
		}
		return true;
	}
}
//window_ class end
//ui_ class part end
//PSlot class start
//use switch only. do not use if
class PSlot{
	#id;
	#tuid;
	#fuid;
	//position in get the focus
	#fpos;
	#prev;
	#curr;
	#type;
	#color;
	//Effect OFF flag
	#effoff = false;
	//update lock
	//true : DO NOT ALLOW UPDATE
	//FALSE : ALLOW UPDATE
	#ulock = false;
	#pend = false;
	//constructor start
	constructor(id, x, y, type = 'p', color = '#fff'){
		let DATACHK = Number.isFinite(id) && id > -1
			&& Number.isFinite(x) && Number.isFinite(y)
			&& isstr(type) && isstr(color);
		let RUN = true;

		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		//console.log(id, x, y, type, color);
		switch(RUN){
			case true:
				this.#id = id;
				this.#prev = [x, y];
				this.#curr = [x, y];
				this.#type = type;
				this.#color = color;
				this.#fpos = [0,0];
			break;
		}
	}
	//constructor end
	//set_effoff start
	set_effoff(bool){
		let DATACHK = isbool(bool), RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#effoff = bool;
			break;
		}
	}
	//set_effoff end
	//get_effoff start
	get_effoff(){
		return !!(this.#effoff);
	}
	//get_effoff end
	//set_ulock start
	set_ulock(bool){
		let DATACHK = isbool(bool), RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#ulock = bool;
				//console.log('PSlot_\'s #ulock is ' + this.#ulock);
			break;
		}
	}
	//set_ulock end
	//get_ulock start
	get_ulock(){
		return !!(this.#ulock);
	}
	//get_ulock end
	//set_uid start
	set_uid(tuid,uid){
		let DATACHK = Number.isFinite(tuid) && tuid > -1
		&& Number.isFinite(uid) && uid > -1;
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#tuid = tuid;
				this.#fuid = uid;
			break;
		}
	}
	//set_uid end
	//get_fuid start
	get_fuid(){
		let result = -1;
		switch(Number.isNaN(Number(this.#fuid))){
			case false:
				result = Number(this.#fuid);
			break;
		}
		return result;
	}
	//get_fuid end
	//get_tuid start
	get_tuid(){
		let result = -1;
		switch(Number.isNaN(Number(this.#tuid))){
			case false:
				result = Number(this.#tuid);
			break;
		}
		return result;
	}
	//get_tuid end
	//update start
	update(x, y){
		let DATACHK = Number.isFinite(x) && Number.isFinite(y);
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#prev = [this.#curr[0],this.#curr[1]];
				this.#curr = [x, y];
			break;
		}
	}
	//update end
	//get_id start
	get_id(){
		return Number(this.#id);
	}
	//get_id end
	//set_fpos start
	//x1, y1 : ui's position
	//x2, y2 : current cursor position
	//MUST BE
	//x1 <= x2 && y1 <= y2
	set_fpos(x1, y1, x2, y2){
		let DATACHK = Number.isFinite(x1) && x1 > -1
		&& Number.isFinite(y1) && y1 > -1
		&& Number.isFinite(x2) && x2 > -1
		&& Number.isFinite(y2) && y2 > -1
		&& x1 <= x2 && y1 <= y2;
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		//console.log(x1,y1,x2,y2,RUN);
		switch(RUN){
			case true:
				this.#fpos = [(x2 - x1),(y2 - y1)];
				//console.log(this.#fpos);
			break;
		}
	}
	//set_fpos end
	//get_fpos start
	get_fpos(){
		return [this.#fpos[0],this.#fpos[1]];
	}
	//get_fpos end
	//update_prev_pos start
	update_prev_pos(){
		let VALCHK = Number.isFinite(this.#curr[0])
		&& Number.isFinite(this.#curr[1])
		switch(VALCHK){
			case true:
				this.#prev = [this.#curr[0],this.#curr[1]];
			break;
		}
	}
	//update_prev_pos end
	//get_prev_pos start
	get_prev_pos(){
		return [this.#prev[0],this.#prev[1]];
	}
	//get_prev_pos end
	//set_curr_pos start
	set_curr_pos(x, y){
		let DATACHK = Number.isFinite(x) && x > -1
		&& Number.isFinite(y) && y > -1;
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#curr = [x, y];
			break;
		}
	}
	//set_curr_pos end
	//get_curr_pos start
	get_curr_pos(){
		return [this.#curr[0],this.#curr[1]];
	}
	//get_curr_pos end
	//get_pos start
	get_pos(){
		return {prev:[this.#prev[0],this.#prev[1]], curr:[this.#curr[0],this.#curr[1]]};
	}
	//get_pos end
	//Is Different Position start
	IDP(){
		let result = false;
		let POSCHK = this.#curr[0] !== this.#prev[0]
		|| this.#curr[1] !== this.#prev[1];
		switch(POSCHK){
			case true:
				result = true;
			break;
		}
		return result;
	}
	//Is Different Position end
	//get_color start
	get_color(){
		return String(this.#color);
	}
	//get_color end
	//get_type start
	get_type(){
		return String(this.#type);
	}
	//get_type end
	//set_pend start
	set_pend(bool){
		let DATACHK = isbool(bool), RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#pend = bool;
			break;
		}
	}
	//set_pend end
	//get_pend start
	get_pend(){
		return !!(this.#pend);
	}
	//get_pend end
}
//PSlot class end
//system_ class start
class system_{
	//if time out the 2seconds, reset the this.#event's bit-mask
	static TLIMIT = 1999;
	//mouse event bit mask limits
	static MMAXBIT = 0x3f;
	//touch event bit mask limits
	static TMAXBIT = 0xf;
	//pointer event bit mask limits
	static PMAXBIT = 0x7f;
	//mouse event data-set
	//(down / move / up / out / wheel / contextmenu)
	//type - hexadecimal
	static mev_hex = Object.freeze([
		0x20,0x10,0x8,0x4,0x2,0x1
	]);
	//touch event data-set
	//(start / move / end / cancel)
	//type - hexadecimal
	static tev_hex = Object.freeze([
		0x8,0x4,0x2,0x1
	]);
	//pointer event data-set
	//(down / move / up / leave / over / enter / cancel) 
	//type - hexadecimal
	static pev_hex = Object.freeze([
		0x40,0x20,0x10,0x8,0x4,0x2,0x1
	]);
	//this string array need to event listening
	static evs = Object.freeze([
		"mousedown", "mousemove", "mouseup", "mouseout",
		"wheel", "contextmenu","touchstart", "touchmove",
		"touchend", "touchcancel","pointerdown", "pointermove",
		"pointerup", "pointerleave", "pointerover",
		"pointerenter", "pointercancel"
	]);
	static pdown_ = system_.pev_hex[0];
	static pmove_ = system_.pev_hex[1];
	static pdrag_ = system_.pev_hex[0] | system_.pev_hex[1];
	static pup_ = system_.pev_hex[2];
	static pleave_ = system_.pev_hex[3];
	static pover_ = system_.pev_hex[4];
	static penter_ = system_.pev_hex[5];
	static pcancel_ = system_.pev_hex[6];
	static pdownwhitin_ = system_.pmove_ | system_.pup_ | system_.pleave_
	| system_.pover_ | system_.penter_ | system_.pcancel_;
	static pmovewithin_ = system_.pdown_ | system_.pup_ | system_.pleave_
	| system_.penter_ | system_.pcancel_;
	static pdragwithin_ = system_.pup_ | system_.pmove_
	| system_.pleave_ | system_.pover_ | system_.penter_ | system_.pcancel_;
	static pall_ = system_.pdrag_ | system_.pup_ | system_.pmove_
	| system_.pleave_ | system_.pover_ | system_.penter_ | system_.pcancel_;
	static tdown_ = system_.tev_hex[0];
	static tmove_ = system_.tev_hex[1];
	static tdrag_ = system_.tdown_ | system_.tmove_;
	static tup_ = system_.tev_hex[2];
	static tcancel_ = system_.tev_hex[3];
	static mdown_ = system_.mev_hex[0];
	static mmove_ = system_.mev_hex[1];
	static mdrag_ = system_.mdown_ | system_.mmove_;
	static mup_ = system_.mev_hex[2];
	static mout_ = system_.mev_hex[3];
	static mwheel_ = system_.mev_hex[4];
	static mcontextmenu_ = system_.mev_hex[5];
	//pointer slot limiter
	static PSL = 20;
	//default font size
	static dfs = 14;
	//default line height
	static dlh = 20;
	//default highlight color
	static dhlc = 'highlight';
	//English UpperCase charater's width mapping array
	static enucw = Object.freeze([
		Object.freeze([
			'A','B','C','D','E','F','G','H','I','J',
			'K','L','M','N','O','P','Q','R','S','T',
			'U','V','W','X','Y','Z'
		]),
		Object.freeze([
			10,10,11,11,10,9,11,11,4,7,
			10,8,12,11,11,10,11,11,10,9,
			11,10,14,10,10,9
		])
	]);
	//English LowerCase charater's width mapping array
	static enlcw = Object.freeze([
		Object.freeze([
			'a','b','c','d','e','f','g','h','i','j',
			'k','l','m','n','o','p','q','r','s','t',
			'u','v','w','x','y','z'
		]),
		Object.freeze([
			8,8,7,8,8,4,8,8,4,4,
			7,4,12,8,8,8,8,5,7,4,
			8,7,11,7,7,7
		])
	]);
	//korean character width === fontSize
	static kocw = system_.dfs;
	//vietnamese all consonant width
	static vnac = Object.freeze([
		Object.freeze([
			'b','c','d','đ','g','h','k','l','m','n',
			'p','q','r','s','t','v','x','B','C','D',
			'Đ','G','H','K','L','M','N','P','Q','R',
			'S','T','V','X'
		]),
		Object.freeze([
			7,6,7,7,6,7,6,3,10,7,
			7,7,4,5,4,6,5,7,7,7,
			8,7,8,7,6,9,8,7,8,7,
			6,6,6,6
		])
	]);
	//vietnamese LowerCase vowel width
	static vnlcv = Object.freeze([
		Object.freeze([
			Object.freeze(['a','à','á','ả','ã','ạ']),
			Object.freeze(['â','ầ','ấ','ẩ','ẫ','ậ']),
			Object.freeze(['ă','ằ','ắ','ẳ','ẵ','ặ']),
			Object.freeze(['e','è','é','ẻ','ẽ','ẹ']),
			Object.freeze(['ê','ề','ế','ể','ễ','ệ']),
			Object.freeze(['i','ì','í','ỉ','ĩ','ị']),
			Object.freeze(['o','ò','ó','ỏ','õ','ọ']),
			Object.freeze(['ô','ồ','ố','ổ','ỗ','ộ']),
			Object.freeze(['ơ','ờ','ớ','ở','ỡ','ợ']),
			Object.freeze(['u','ù','ú','ủ','ũ','ụ']),
			Object.freeze(['ư','ừ','ứ','ử','ữ','ự']),
			Object.freeze(['y','ỳ','ý','ỷ','ỹ','ỵ'])
		]),
		Object.freeze([
			Object.freeze([6,6,6,6,6,6]),
			Object.freeze([6,6,6,6,6,6]),
			Object.freeze([6,6,6,6,6,6]),
			Object.freeze([6,6,6,6,6,6]),
			Object.freeze([6,6,6,6,6,6]),
			Object.freeze([3,3,3,3,3,3]),
			Object.freeze([7,7,7,7,7,7]),
			Object.freeze([7,7,7,7,7,7]),
			Object.freeze([7,7,7,7,7,7]),
			Object.freeze([7,7,7,7,7,7]),
			Object.freeze([7,7,7,7,7,7]),
			Object.freeze([6,6,6,6,6,6])
		])
	]);
	//vietnamese UpperCase vowel width
	static vnucv = Object.freeze([
		Object.freeze([
			Object.freeze(['A','À','Á','Ả','Ã','Ạ']),
			Object.freeze(['Â','Ầ','Ấ','Ẩ','Ẫ','Ậ']),
			Object.freeze(['Ă','Ằ','Ắ','Ẳ','Ẵ','Ặ']),
			Object.freeze(['E','È','É','Ẻ','Ẽ','Ẹ']),
			Object.freeze(['Ê','Ề','Ế','Ể','Ễ','Ệ']),
			Object.freeze(['I','Ì','Í','Ỉ','Ĩ','Ị']),
			Object.freeze(['O','Ò','Ó','Ỏ','Õ','Ọ']),
			Object.freeze(['Ô','Ồ','Ố','Ổ','Ỗ','Ộ']),
			Object.freeze(['Ơ','Ờ','Ớ','Ở','Ỡ','Ợ']),
			Object.freeze(['U','Ù','Ú','Ủ','Ũ','Ụ']),
			Object.freeze(['Ư','Ừ','Ứ','Ử','Ữ','Ự']),
			Object.freeze(['Y','Ỳ','Ý','Ỷ','Ỹ','Ỵ'])
		]),
		Object.freeze([
			Object.freeze([7,7,7,7,7,7]),
			Object.freeze([7,7,7,7,7,7]),
			Object.freeze([7,7,7,7,7,7]),
			Object.freeze([6,6,6,6,6,6]),
			Object.freeze([6,6,6,6,6,6]),
			Object.freeze([3,3,3,3,3,3]),
			Object.freeze([8,8,8,8,8,8]),
			Object.freeze([8,8,8,8,8,8]),
			Object.freeze([8,8,8,8,8,8]),
			Object.freeze([8,8,8,8,8,8]),
			Object.freeze([8,8,8,8,8,8]),
			Object.freeze([6,6,6,6,6,6])
		])
	]);
	//frame index for huristic process
	#frmidx = 0;
	//modular for huristic process ; based in 3 (frame)
	static MOD = 3;
	//coordinate and radius circular queue's length is the next;
	static CRQLEN = system_.PSL * 3;
	//event coordinate and radius circular queue for huristic process
	#evcrq = [
		new Array(system_.CRQLEN).fill(-1),	//x
		new Array(system_.CRQLEN).fill(-1),	//y
		new Array(system_.CRQLEN).fill(-1)	//radius
	];
	//ui list
	#ui_list = [];
	//uid_list
	#uid_list = [];
	//priority list of ui
	#pri_list = [];
	//focused ui list
	#foc_list = [[],[]];
	//list for focus duplication check
	#foc_dup_list = [[],[],[]];
	//top_ar's data
	//[
	//	[(top ui_1.#uid), (top ui_2.#uid), ...],
	//	[(top ui_1's focused lower ui_.#uid), (top ui_2's focused lower ui_.#uid)], ...]
	//]
	//top ui_ area range
	#top_ar = [[],[]];
	//top_ar's data
	//[
	//	[(top ui_1.#uid), (top ui_2.#uid), ...],
	//	[(top ui_1's last child ui_.#uid), (top ui_2's last child ui_.#uid)], ...]
	//]

	//top_ar / foc_list data structure
	//[		outer array start	|											|
	//[],	inner array1		|	top ui_.#uid							| [public data area]
	//[]	inner array2		|	top ui_'s last child ui_.#uid list		| [top_ar only]
	//							|	top ui_'s focused lower ui_.#uid list	| [foc_list only]
	//]		outer array end		|											|

	//count of uid 
	#uid_cnt = 0;
	//release queue
	#rq = [
		new Array(system_.PSL).fill(null),
		new Array(system_.PSL).fill(null)
	];
	#stamp = 0;
	#isRelease = false;
	#rcnt = 0;
	//is rs in now?
	#isrs = false;
	//mouse event id
	#mouseId = -1;
	//mouse / touch / pointer event slot
	//pointer slot array
	#psa = new Array(system_.PSL).fill(null);
	//pointer slot array bit-mask
	#psabm = new Array(system_.PSL).fill(0);
	//move event limiter
	#mel = false;
	//tooltip will be display?
	#twbd = false;
	//UI tooltip handling list
	//ui_ instance's #uid place on this array
	#uithl = [];
	#ime = null;
	#canvas;
	//DO NOT UPDATE RECT AREA
	#DNURA = false;
	//#DNURA COUNTER
	#DNURAC = 2;
	//UPDATE RECT AREA
	#URA = false;
	//update rendering user interface list flag
	#uruil = false;
	#ctx;
	//interactive ui can input the string
	#ui_text = [[],[]];	//interactive ui only uses
	//public for preedit
	#preedit = '';
	#rect;
	//frame counter for system_.#rect 
	#rect_cnt = 3;
	#lrect = {};
	//dirty rect padding
	//12px is stable
	//you can not feel the stable,
	//change to 16px
	static DRPADD = 12;
	//dirty rendering rect area info
	#drrai;
	//system_ class's #state
	//0:idle
	//current tabIndex
	//default index -1
	//press tab key -> 0
	//index 0 is first index
	#ctabidx = -1;
	//last tabIndex
	//default index -1
	//ui_ is editable_ui_,
	//have #tabidx attribute
	#ltabidx = -1;
	//a11y for Person with a disability
	#a11y_uis = [];
	//constructor start
	constructor(){
		this.listening = this.listening.bind(this);
		this.#canvas = document.createElement('canvas');
		this.#canvas.id = 'PCUI';
		this.#canvas.width = window.innerWidth;
		this.#canvas.height = 450;
		this.#canvas.style.touchAction = 'none';
		this.#canvas.style.userSelect = 'none';
		this.#ctx = this.#canvas.getContext('2d');
		document.body.appendChild(this.#canvas);

		this.update = this.update.bind(this);
		this.set_canvas_event = this.set_canvas_event.bind(this);
		this.fake_rendering = this.fake_rendering.bind(this);
	}
	//constructor end
	//set_uid_cnt start
	#set_uid_cnt(cnt){
		let ucnt = this.get_uid_cnt();
		let DATACHK = Number.isFinite(cnt) && cnt > ucnt;
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#uid_cnt = cnt;
			break;
		}
	}
	//set_uid_cnt end
	//get_uid_cnt start
	get_uid_cnt(){
		return Number(this.#uid_cnt);
	}
	//get_uid_cnt end
	//set_canvas_event start
	//use switch only. do not use if
	set_canvas_event(){
		const P = isfunc(window.PointerEvent);
		const T = isfunc(window.TouchEvent);
		switch(true){
			//pointer event only
			case P:
				this.#canvas.addEventListener(system_.evs[10], this.listening);
				this.#canvas.addEventListener(system_.evs[11], this.listening);
				this.#canvas.addEventListener(system_.evs[12], this.listening);
				this.#canvas.addEventListener(system_.evs[13], this.listening);
				this.#canvas.addEventListener(system_.evs[14], this.listening);
				this.#canvas.addEventListener(system_.evs[15], this.listening);
				this.#canvas.addEventListener(system_.evs[16], this.listening);
			break;
			//touch event only
			case T:
				this.#canvas.addEventListener(system_.evs[6], this.listening);
				this.#canvas.addEventListener(system_.evs[7], this.listening);
				this.#canvas.addEventListener(system_.evs[8], this.listening);
				this.#canvas.addEventListener(system_.evs[9], this.listening);
			break;
			//mouse event only
			default:
				this.#canvas.addEventListener(system_.evs[0], this.listening);
				this.#canvas.addEventListener(system_.evs[1], this.listening);
				this.#canvas.addEventListener(system_.evs[2], this.listening);
				this.#canvas.addEventListener(system_.evs[3], this.listening);
				this.#canvas.addEventListener(system_.evs[4], this.listening);
				this.#canvas.addEventListener(system_.evs[5], this.listening);
			break;
		}
	}
	//set_canvas_event end
	//get_canvas_wh start
	get_canvas_wh(){
		return {w:Number(this.#canvas.width),h:Number(this.#canvas.height)};
	}
	//get_canvas_wh end
	//get_ctx start
	get_ctx(){
		return this.#ctx;
	}
	//get_ctx end
	//fake_rendering start
	fake_rendering(){
		this.#ctx.clearRect(0,0,1,1);
	}
	//fake_rendering end
	//get_rect start
	get_rect(){
		return this.#rect;
	}
	//get_rect end
	//adjust rect start
	//use switch only. do not use if
	adjust_rect(){
		let DATACHK = isobj(this.#lrect) && isobj(this.#rect);
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let rect, dx, dy, compx, compy;
		switch(RUN){
			case true:
				const _99 = 99;
				rect = this.#canvas.getBoundingClientRect();
				dx = rect.left - this.#lrect.left;
				dy = rect.top - this.#lrect.top;
				compx = Math.abs(dx) > _99;
				compy = Math.abs(dy) > _99;
				switch(compx || compy){
					case true:
					break;
					default:
						this.#rect.left = rect.left;
						this.#rect.right = rect.right;
						this.#rect.top = rect.top;
						this.#rect.bottom = rect.bottom;
						this.#rect.width = rect.width;
						this.#rect.height = rect.height;
						this.#URA = true;
					break;
				}
			break;
		}
	}
	//adjust rect end
	//set_stamp start
	set_stamp(){
		this.#stamp = performance.now();
	}
	//set_stamp end
	//set_ime start
	//use switch only. do not use if
	set_ime(ime){
		let DATACHK = isOInst(ime,'ime');
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#ime = ime;
			break;
		}
	}
	//set_ime end
	//inc_tabidx start
	inc_tabidx(){
		this.#ctabidx++;
	}
	//inc_tabidx end
	//dec_tabidx start
	dec_tabidx(){
		this.#ctabidx--;
	}
	//dec_tabidx end
	//search_top_lower_on_array start
	//search top ui_.#uid & lower ui_.#uid on system_.top_ar or system.foc_list (array parameter)
	//tuid = top ui_.#uid, luid = lower ui_.#uid
	//use switch only. do not use if
	#search_top_lower_on_array(array, tuid_){
		let i, luid_;
		let DATACHK = Array.isArray(array) && array.length === 2
		&& Array.isArray(array[0]) && array[0].length > 0
		&& Array.isArray(array[1]) && array[1].length > 0
		&& Number.isFinite(tuid_) && -1 < tuid_ && tuid_ < this.get_uid_cnt();
		let RUN = true, result = {index:-1, tuid:-1, luid:-1};
		switch(false){
			//array must be array and top ui_.#uid must be number.
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				for(i = 0;i < array[0].length;i++){
					//data format : [[top ui_1.#uid , top ui_2.#uid, ...],
					//[top ui_1's last child ui_.#uid, top ui_2's last child ui_.#uid, ...]]
					//i index the array's inner array-area
					switch(array[0][i]){//tuid must placed on array[0] area
						case tuid_:
							//luid must placed on array[1] area
							result = {index:i, tuid:tuid_, luid:array[1][i]};
							i = array[0].length;
						break;
					}
				}
			break;
		}
		return result;
	}
	//search_top_lower_on_array end
	//get_top_ar start
	get_top_ar(){
		return this.#top_ar.slice();
	}
	//get_top_ar end
	//reg_foc_list start
	//use switch only. do not use if
	#reg_foc_list(tuid,luid){
		let DATACHK = Number.isFinite(tuid) && tuid > -1
		&& Number.isFinite(luid) && luid > -1;
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#foc_list[0].push(tuid);
				this.#foc_list[1].push(luid);
			break;
		}
	}
	//reg_foc_list end
	//update_foc_list start
	//use switch only. do not use if
	#update_foc_list(idx,tuid,luid){
		let fllen = this.get_foc_list().length;
		let DATACHK = Number.isFinite(idx) && -1 < idx && idx < fllen;
		Number.isFinite(tuid) && tuid > -1
		&& Number.isFinite(luid) && luid > -1;
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let fl;
		switch(RUN){
			case true:
				this.#foc_list[0][idx] = tuid;
				this.#foc_list[1][idx] = luid;
			break;
		}
	}
	//update_foc_list end
	//foc_list_check start
	//focus list writting : data format = [top ui_.#uid, focused ui_.#uid]
	//use switch only. do not use if
	#foc_list_check(tuid, luid){
		let DATACHK = Number.isFinite(tuid) && Number.isFinite(luid);
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let fl;
		switch(RUN){
			case true:
				fl = this.get_foc_list();
				let INDEX = (this.#search_top_lower_on_array(fl, tuid)).index;
				switch(INDEX){
					case -1:
						//add new(focused top ui & lower ui)'s #uid
						fl[0].push(tuid);
						fl[1].push(luid);
						result = true;
					break;
					default:
						//update focused lower ui's #uid
						this.#foc_list[1][INDEX] = luid;
					break;
				}
			break;
		}
		return result;
	}
	//foc_list_check end
	//get_foc_list start
	get_foc_list(){
		return this.#foc_list.slice();
	}
	//get_foc_list end
	//Focus List To String start
	//use switch only. do not use if
	FLTS(){
		let fl = this.get_foc_list();
		let DATACHK = Array.isArray(fl) && fl.length === 2
		&& Array.isArray(fl[0]) && fl[0].length > 0
		&& Array.isArray(fl[1]) && fl[1].length > 0;
		let RUN = true, result = '';
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let i;
		switch(RUN){
			case true:
				for(i = 0;i < fl[0].length;i++){
					result += fl[0][i] + ' , ' + fl[1][i] + '\n';
				}
				result += '- - - - - - - - - -\n';
			break;
		}
		return result;
	}
	//Focus List To String start
	//del_foc_list start
	//use switch only. do not use if
	#del_foc_list(idx){
		let fl = this.#foc_list;
		let DATACHK = Number.isFinite(idx) && -1 < idx && idx < fl[0].length;
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				fl[0].splice(idx,1);
				fl[1].splice(idx,1);
			break;
		}
	}
	//del_foc_list end
	//set_psabm start
	//use switch only. do not use if
	set_psabm(idx, bit){
		let DATACHK = Number.isFinite(idx) && -1 < idx && idx < system_.PSL
		&& Number.isFinite(bit) && bit > -1;
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#psabm[idx] = bit;
			break;
		}
	}
	//set_psabm end
	//get_psabm start
	//use switch only. do not use if
	get_psabm(idx){
		let DATACHK = Number.isFinite(idx) && -1 < idx && idx < system_.PSL;
		let RUN = true, result = null;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				result = Number(this.#psabm[idx]);
			break;
		}
		return result;
	}
	//get_psabm end
	//is_empty_psabm start
	//use switch only. do not use if
	#is_empty_psabm(){
		let psabm = this.#psabm;
		let DATACHK = Array.isArray(psabm) && psabm.length > 0;
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let i, j, total = 0;
		switch(RUN){
			case true:
				for(i = 0;i < psabm.length;i++){
					j = isobj(psabm[i]);
					switch(true){
						case j:
							total++;
						break;
					}
				}
				switch(total){
					case 0:
						result = true;
					break;
				}
			break;
		}
		return result;
	}
	//is_empty_psabm end
	//get_psa_empty_idx start
	get_psa_empty_idx(){
		return this.#psa.indexOf(null);
	}
	//get_psa_empty_idx end
	//is_in_psa start
	//use switch only. do not use if
	#is_in_psa(id_){
		let DATACHK = Number.isFinite(id_);
		let RUN = true, result = -1;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let psa, len, i, j;
		switch(RUN){
			case true:
				psa = this.#psa;
				len = psa.length;
				for(i = 0;i < len;i++){
					j = isOInst(psa[i],'ps')
						&& psa[i].get_id() === id_;
					switch(true){
						case j:
							result = i;
							i = len;
						break;
					}
				}
			break;
		}
		return result;
	}
	//is_in_psa end
	//set_psa start
	//use switch only. do not use if
	set_psa(idx, obj){
		let DATACHK = Number.isFinite(idx) && -1 < idx && idx < system_.PSL
		&& isobj2(obj);
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#psa[idx] = obj;
			break;
		}
	}
	//set_psa end
	//get_psa start
	//use switch only. do not use if
	get_psa(idx){
		let DATACHK = Number.isFinite(idx) && -1 < idx && idx <system_.PSL;
		let RUN = true, result = null;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				result = this.#psa[idx];
			break;
		}
		return result;
	}
	//get_psa end
	//set_psa_pend start
	//use switch only. do not use if
	set_psa_pend(idx, bool){
		let DATACHK = Number.isFinite(idx) && -1 < idx && idx < system_.PSL && isbool(bool);
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#psa[idx].set_pend(bool);
			break;
		}
	}
	//set_psa_pend end
	//update_psa start
	//use switch only. do not use if
	update_psa(idx, x, y){
		let DATACHK = Number.isFinite(idx) && -1 < idx && idx < system_.PSL
		&& Number.isFinite(x) && Number.isFinite(y);
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let psa_;
		switch(RUN){
			case true:
				psa_ = this.get_psa(idx);
				switch(isobj(psa_)){
					case true:
						psa_.update(x,y);
					break;
				}
			break;
		}
	}
	//update_psa end
	//Update PSA All start
	UPSAA(){
		let i, ps;
		for(i = 0;i < system_.PSL;i++){
			ps = this.get_psa(i);
			switch(isOInst(ps,'ps')){
				case true:
					ps.update_prev_pos();
				break;
				case false:
					i = system_.PSL;
				break;
			}
		}
	}
	//Update PSA All end
	//Where Is First TUID In PSA start
	WIFTUIDIPSA(tuid){
		let ucnt = this.get_uid_cnt();
		let DATACHK = Number.isFinite(ucnt) && ucnt > -1
		&& Number.isFinite(tuid) && -1 < tuid && tuid < ucnt;
		let RUN = true, result = -1;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let i, ps, DUPCHK;
		switch(RUN){
			case true:
				for(i = 0;i < system_.PSL;i++){
					ps = this.get_psa(i);
					switch(isOInst(ps,'ps')){
						case true:
							//tuid DUPLICATION CHECK
							DUPCHK = ps.get_tuid() === tuid;
							switch(DUPCHK){
								case true:
									result = i;
									i = system_.PSL;
								break;
							}
						break;
					}
				}
			break;
		}
		return result;
	}
	//Where Is First TUID In PSA start
	//UID Set Duplicate Check In PSA start
	UIDSDCIPSA(luid, tuid){
		let ucnt = this.get_uid_cnt();
		let DATACHK = Number.isFinite(ucnt) && ucnt > -1
		&& Number.isFinite(luid) && -1 < luid && luid < ucnt
		&& Number.isFinite(tuid) && -1 < tuid && tuid < ucnt;
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let i, ps, DUPCHK;
		switch(RUN){
			case true:
				for(i = 0;i < system_.PSL;i++){
					ps = this.get_psa(i);
					switch(isOInst(ps,'ps')){
						case true:
							//luid, tuid DUPLICATION CHECK
							DUPCHK = ps.get_fuid() === luid
							&& ps.get_tuid() === tuid;
							switch(DUPCHK){
								case true:
									result = true;
									i = system_.PSL;
								break;
							}
						break;
					}
				}
			break;
		}
		return result;
	}
	//UID Set Duplicate Check In PSA end
	//FUID Search In PSA start
	FUIDSIPSA(){
		let psa = this.#psa;
		let DATACHK = Array.isArray(psa) && psa.length === system_.PSL;
		let RUN = true, result = [];
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let fuid, ps, i, VAL;
		switch(RUN){
			case true:
				for(i = 0;i < system_.PSL;i++){
					ps = psa[i];
					fuid = ps.get_fuid();
					VAL = isOInst(ps,'ps') && Number.isFinite(fuid) && fuid > -1 && ps.IDP();
					switch(VAL){
						case true:
							result.push(ps);
						break;
					}
				}
			break;
		}
		return result;
	}
	//FUID Search In PSA end
	//Check Duplicated Info Of PSlot Array start
	CDIOPSA(tuid,luid){
		let psa = this.#psa;
		let DATACHK = Number.isFinite(tuid) && tuid > -1 && tuid < this.#uid_cnt
		&& Number.isFinite(luid) && luid > -1 && luid < this.#uid_cnt
		&& Array.isArray(psa) && psa.length === system_.PSL;
		let RUN = true, result = false, i, cnt = 0;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let tuid_, luid_, UIDVAL, CNTVAL
		switch(RUN){
			case true:
				// If duplicated (tuid,fuid) exists, focus must be kept
				for(i = 0;i < psa.length;i++){
					switch(isOInst(psa[i],'ps')){
						case true:
							tuid_ = psa[i].get_tuid();
							luid_ = psa[i].get_fuid();
							UIDVAL = tuid === tuid_ && luid === luid_;
							switch(UIDVAL){
								//IS DUPLICETED UID SET
								//INCREASE THE cnt
								case true:
									cnt++;
								break;
							}
							switch(cnt){
								case 2:
									i = psa.length;
								break;
							}
						break;
					}
				}
				//cnt is over 1, must keep the focus
				CNTVAL = cnt > 1;
				switch(CNTVAL){
					case true:
						result = true;
					break;
				}
			break;
		}
		return result;
	}
	//Check Duplicated Info Of PSlot Array end
	//Free PS And BM start
	FPSABM(idx){
		let DATACHK = Number.isFinite(idx) && -1 < idx && idx < system_.PSL;
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.set_psa(idx,null);
				this.set_psabm(idx,0);
			break;
		}
	}
	//Free PS And BM end
	//Reset Focus By PSA start
	RFBPSA(idx){
		let fl = this.get_foc_list();
		let DATACHK = Array.isArray(fl) && fl.length === 2
		&& Array.isArray(fl[0]) && fl[0].length > 0
		&& Array.isArray(fl[1]) && fl[0].length === fl[1].length
		&& Number.isFinite(idx) && -1 < idx && idx < system_.PSL
		&& isOInst(this.get_psa(idx),'ps');
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let ps, fuid, fidx;
		switch(RUN){
			case true:
				ps = this.get_psa(idx);
//				console.log(ps);
				fuid = ps.get_fuid();
				fidx = fl[1].indexOf(fuid);
				//logtextarea.textContent += 'fuid = ' + fuid + ', fidx = ' + fidx + '\n';
				switch(fidx){
					//not exists ; do not anything
					case -1:
						//logtextarea.textContent += 'focus was blured in already.';
					break;
					//fuid is in system_.#foc_list[1],
					//system_.del_foc_list(idx);
					default:
						this.#del_foc_list(fidx);
					break;
				}
			break;
		}
	}
	//Reset Focus By PSA end
	//set_mel start
	//use switch only. do not use if
	set_mel(bool){
		let DATACHK = isbool(bool), RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#mel = bool;
			break;
		}
	}
	//set_mel end
	//get_mel start
	get_mel(){
		return !!(this.#mel);
	}
	//get_mel end
	//reg_ui_text start
	//use switch only. do not use if
	reg_ui_text(euid, txt){
		let DATACHK = && Number.isFinite(euid) && euid > 0 && isstr2(txt);
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let li;
		switch(RUN){
			case true:
				//last index
				li = this.#ui_text[0].length - 1;
				this.#ui_text[0].splice(li,0,euid);
				this.#ui_text[1].splice(li,0,txt);
			break;
		}
	}
	//reg_ui_text end
	//set_ui_text start
	//use switch only. do not use if
	set_ui_text(idx,txt){
		let DATACHK = Number.isFinite(idx) && -1 < idx && isstr2(txt);
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#ui_text[1][idx] = txt;
			break;
		}
	}
	//set_ui_text end
	//get_ui_text start
	get_ui_text(){
		return this.#ui_text.slice();
	}
	//get_ui_text end
	//register start
	//register ui on the system_
	//system_.top_ar data format : shortcut of top ui_'s area
	//[[(top ui_1.#uid), (top ui_1.last-child.#uid)],[(top ui_2.#uid), (top ui_2.last-child.#uid)], ...]
	//use switch only. do not use if
	register(ui){
		let UICHK = isOInst(ui, 'ui');
		let WINCHK = isOInst(ui, 'winui');
		//is complete top_ar?
		//let ICTA = this.#uid_cnt > 0 && this.#top_ar[0].length > this.#top_ar[1].length;
		let RUN = true, result = false;
		switch(false){
			case(UICHK):
				RUN = false;
			break;
		}
		let ta, ul, uidl, tuid, uid, bar, carea, children, CHILDRENVAL, i, EDITCHK;
		switch(RUN){
			case true:
				switch(true){
					//ui_ is window_ instance
					//window_ instance mus be have the next
					//bar_ instance
					//bar_ instance have 1~button(s)
					//content_area_ instance
					case WINCHK:
						//READY TO WRITE IN system_.#top_ar
						ta = this.#top_ar;
						//READY TO REGISTER IN system_.#ui_list
						ul = this.#ui_list;
						uidl = this.#uid_list;
						//GET THE system_.#uid_cnt
						//CACHING #uid_cnt TO uid
						uid = this.get_uid_cnt();

						//REGISTER IN NOW [ window_ instance ]
						//SET THE window_ ui_.#uid
						ui.setUID(uid);
						tuid = uid;
						//window_ instance REGISTER TO system_.#ui_list
						ul.push(ui);
						uidl.push(uid);

						//UPDATE(EXPOSE TO RENDERER) system_.#pri_list BASED tuid FOR RENDERING LOOP
						this.#update_pri_list(tuid);

						//REGISTER IN NOW [ window_.#bar (bar_ instance) ]
						//CACHING THE window_.#bar TO bar
						bar = ui.get_bar();
						switch(isOInst(bar,'bar')){
							case true:
								//INCREASE CACHED #uid_cnt ( uid )
								uid++;
								//SET THE window_.bar_.#uid
								bar.setUID(uid);
								//bar_ instance REGISTER TO system_.#ui_list
								ul.push(bar);
								uidl.push(uid);
								ui.add_child(bar);
								bar.set_parent(ui);

								//REGISTER IN NOW [ window_.#bar.#children[] ]
								//CACHING THE window_.#bar.#children TO children
								children = bar.get_btns();
								CHILDRENVAL = Array.isArray(children) && children.length > 0;
								switch(CHILDRENVAL){
									case true:
										//window_.#bar.#children REGISTER PROCESS START
										//#children.length === 0,
										//DO NOT REGISTER PROCESS IN THE NEXT
										for(i = 0;i < children.length;i++){
											switch(isOInst(children[i],'ui')){
												case true:
													//INCREASE CACHED #uid_cnt ( uid )
													uid++;
													//SET THE bar_.#children[i].#uid
													children[i].setUID(uid);
													//bar_ instance REGISTER TO system_.#ui_list
													ul.push(children[i]);
													uidl.push(uid);
													//ADD CHILD TO window_.#bar
													bar.add_child(children[i]);
													children[i].set_parent(bar);
												break;
											}
										}
										//window_.#bar.#children REGISTER PROCESS END
									break;
								}
							break;
						}
						//CACHING THE window_.#content_area to carea
						carea = ui.get_contents_area();
						switch(isOInst(carea,'carea')){
							case true:
								//INCREASE CACHED #uid_cnt ( uid )
								uid++;
								//SET THE window_.#content_area.#uid
								carea.setUID(uid);
								//window_.#content_area REGISTER TO system_.#ui_list
								ul.push(carea);
								uidl.push(uid);
								ui.add_child(carea);
								carea.set_parent(ui);
								//REGISTER IN NOW [ window_.#content_area.#children[] ]
								//CACHING THE window_.#content_area.#children TO children
								children = carea.get_contents();
								CHILDRENVAL = Array.isArray(children) && children.length > 0;
								switch(CHILDRENVAL){
									case true:
										//window_.#content_area.#children REGISTER PROCESS START
										//#children.length === 0,
										//DO NOT REGISTER PROCESS IN THE NEXT
										for(i = 0;i < children.length;i++){
											switch(isOInst(children[i],'ui')){
												case true:
													//INCREASE CACHED #uid_cnt ( uid )
													uid++;
													//SET THE bar_.#children[i].#uid
													children[i].setUID(uid);
													//button_ instance REGISTER TO system_.#ui_list
													ul.push(children[i]);
													uidl.push(uid);
													//ADD CHILD TO window_.#bar
													carea.add_child(children[i]);
													children[i].set_parent(carea);
													EDITCHK = isOInst(children[i],'editui');
													switch(EDITCHK){
														case true:
															this.reg_ui_text(uid,'');
														break;
													}
												break;
											}
										}
										//window_.#content_area.#children REGISTER PROCESS END
									break;
								}
								//window_ instance(top ui_)'s #uid
								//PUSH TO
								//system_.#top_ar[0]
								ta[0].push(tuid);
								//window_.#contents_area.#children[last children's index].#uid
								//PUSH TO
								//system_.#top_ar[1]
								ta[1].push(uid);
								result = true;
							break;
						}
						//INCREASE CACHED #uid_cnt ( uid )
						uid++;
						//UPDATE THE system_.#uid_cnt
						this.#set_uid_cnt(uid);
					break;
				}
			break;
		}
		return result; 
	}
	//register end
	//drop_ui start
	//drop the ui
	//use switch only. do not use if
	drop_ui(uid){
		let DATACHK = Number.isFinite(uid);
		let RUN, RUN2, RUN3;
		RUN = RUN2 = RUN3 = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let pl, ul, uidl, fl, ui, ta, pidx, fidx, tidx, lim, lidx, lidx2, children, children2, cui, i, j, k, l, eui;
		let WINVAL, UIVAL, EDITVAL, BARVAL, EDITVAL2, CAREAVAL, EDITVAL3, CHILDRENVAL, index, info, info2, WINEX;
		switch(RUN){
			case true:
				uidl = this.#uid_list;
				index = uidl.indexOf(uid);
				switch(index){
					case -1:
					break;
					default:
						ul = this.#ui_list;
						ui = ul[index];
						WINVAL = isOInst(ui,'winui');
						UIVAL = isOInst(ui,'ui');
						EDITVAL = isOInst(ui,'editui');
						fl = this.#foc_list;
					break;
				}
				switch(true){
					case WINVAL:
						ta = this.get_top_ar();
						tidx = ta[0].indexOf(uidl[index]);
						switch(tidx){
							case -1:
							break;
							default:
								i = index + (ta[1][tidx] - ta[0][tidx]);
								while(i > index){
									BARVAL = isOInst(ul[i],'bar');
									CAREAVAL = isOInst(ul[i],'carea');
									EDITVAL2 = isOInst(ul[i],'editui');
									CHILDRENVAL = BARVAL || CAREAVAL;
									switch(true){
										//CHILD ui_ instance HAVE THE CHILDREN,
										//REMOVE THE ui_ instance's CHILDREN;
										case CHILDRENVAL:
											j = ul[i].get_childlen() - 1;
											switch(true){
												case(j > -1):
													//console.log('DELETE THE CHILDREN')
													while(j > -1){
														ul[i].remove_child(j--);
													}
												break;
											}
										break;
										//child ui is editable_ui_,
										//DO splice PROCESS.
										case EDITVAL2:
											j = this.get_ui_text().indexOf(i);
											switch(i){
												case -1:
												break;
												default:
													this.#ui_text[0].splice(j,1);
													this.#ui_text[1].splice(j,1);
												break;
											}
										break;
									}
									i--;
								}
								k = ta[1][tidx] - ta[0][tidx];
								l = k + 1;
								//REMOVE THE window_ instance's CHILDREN.
								while(k > -1){
									ui.remove_child(k--);
								}
								ta[0].splice(tidx,1);
								ta[1].splice(tidx,1);
								pl = this.#pri_list;
								pidx = pl.indexOf(uid);
								switch(pidx){
									case -1:
									break;
									default:
										pl.splice(pidx,1);
										this.SURUIL(true);
									break;
								}
								fl = this.#foc_list;
								while(fl[0].indexOf(uid) === -1){
									fidx = fl[0].indexOf(uid);
									switch(fidx){
										case -1:
										break;
										default:
											fl[0].splice(fidx,1);
											fl[1].splice(fidx,1);
										break;
									}
								}
								ul.splice(index,l);
								uidl.splice(index,l);
							break;
						}
					break;
					//ui is editable_ui_ instance,
					//DO splice PROCESS.
					case EDITVAL:
						i = this.get_ui_text().indexOf(uid);
						switch(i){
							case -1:
							break;
							default:
								this.#ui_text[0].splice(i,1);
								this.#ui_text[1].splice(i,1);
								while(fl[1].indexOf(uid) === -1){
									fidx = fl[1].indexOf(uid);
									switch(fidx){
										case -1:
										break;
										default:
											fl[0].splice(fidx,1);
											fl[1].splice(fidx,1);
										break;
									}
								}
								ul.splice(index,l);
								uidl.splice(index,l);
							break;
						}
					break;
					case UIVAL:
						i = ui.get_childlen() - 1;
						switch(i){
							case -1:
							break;
							default:
								//ui_ instance HAVE CHILDREN,
								//REMOVE THE ui_ instance's CHILDREN.
								while(i > -1){
									ui.remove_child(i--);
								}
								while(fl[1].indexOf(uid) === -1){
									fidx = fl[1].indexOf(uid);
									switch(fidx){
										case -1:
										break;
										default:
											fl[0].splice(fidx,1);
											fl[1].splice(fidx,1);
										break;
									}
								}
								ul.splice(index,l);
								uidl.splice(index,l);
							break;
						}
					break;
				}
			break;
		}
	}
	//drop_ui end
	//get_ui_list start
	get_ui_list(){
		return this.#ui_list.slice();
	}
	//get_ui_list end
	//get_uid_list start
	get_uid_list(){
		return this.#uid_list.slice();
	}
	//get_uid_list end
	//Get_UI_List Start index to End index start
	#GUILSE(sidx, eidx){
		let ul = this.#ui_list;
		let DATACHK = Number.isFinite(sidx) && sidx > -1
		&& Number.isFinite(eidx) && eidx > -1;
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let eeidx;
		switch(RUN){
			case true:

				eeidx = eidx + 1;
				result = ul.slice(sidx,eeidx);
			break;
		}
		//result value summery
		//success : part of system_.#ui_list
		//failed : false
		return result;
	}
	//Get_UI_List Start index to End index end
	//is_event start
	//event bit mask data set match to system_.psabm[idx];
	//cat : category (mouse:0,touch:1,pointer:2)
	//use switch only. do not use if
	#is_event(cat, idx, ev){
		let DATACHK = Number.isFinite(cat)
			&& Number.isFinite(idx) && isstr(ev);
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let down, move, up, out, wheel, contextmenu, leave, over, enter, cancel, drag;
		let S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, SALL;
		let bm;
		switch(RUN){
			case true:
				down = move = up = out = wheel = contextmenu = leave = over = enter = cancel = drag = 0;
				switch(cat){
					//pointer event
					case 2:
						drag = system_.pdrag_;
						down = system_.pdown_;
						move = system_.pmove_;
						up = system_.pup_;
						leave = system_.pleave_;
						over = system_.pover_;
						enter = system_.penter_;
						cancel = system_.pcancel_;
					break;
					//touch event
					case 1:
						drag = system_.tdrag_;
						down = system_.tdown_;
						move = system_.tmove_;
						up = system_.tup_;
						cancel = system_.tcancel_;
					break;
					//mouse event
					case 0:
						drag = system_.mdrag_;
						down = system_.mdown_;
						move = system_.mmove_;
						up = system_.mup_;
						out = system_.mout_;
						wheel = system_.mwheel_;
						contextmenu = system_.mcontextmenu_;
					break;
				}
				bm = this.get_psabm(idx);
				S01 = (ev === 'mov' && (bm & drag) === drag && drag > 0);
				S02 = ((ev === 'dow' || ev === 'sta') && (bm & down) === down && down > 0);
				S03 = (ev === 'mov' && (bm & move) === move && move > 0);
				S04 = ((ev === 'up' || ev === 'end') && (bm & up) === up && up > 0);
				S05 = (ev === 'out' && (bm & out) === out && out > 0);
				S06 = (ev === 'whe' && (bm & wheel) === wheel && wheel > 0);
				S07 = (ev === 'con' && (bm & contextmenu) === contextmenu && contextmenu > 0);
				S08 = (ev === 'lea' && (bm & leave) === leave && leave > 0);
				S09 = (ev === 'ove' && (bm & over) === over && over > 0);
				S10 = (ev === 'ent' && (bm & enter) === enter && enter > 0);
				S11 = (ev === 'can' && (bm & cancel) === cancel && cancel > 0);
				SALL = S01 || S02 || S03 || S04 || S05 || S06 || S07 || S08 || S09 || S10 || S11;
				switch(true){
					case SALL:
						result = true;
					break;
				}
			break;
		}
		return result;
	}
	//is_event end
	//get_stamp start
	//get the last event's timestamp
	get_stamp(){
		return Number(this.#stamp);
	}
	//get_stamp end
	//get_foc_edit start
	//get focused editable ui_.#uid
	//use switch only. do not use if
	get_foc_edit(){
		let ul = this.#ui_list;
		let fl = this.#foc_list;
		let FOCUSCHK = ul.length > 0 && fl.length > 0;
		let result = false;
		switch(true){
			case FOCUSCHK:
				let i, j, foc_edit_ui;
				for(i = 0;i < ul.length;i++){
					j = isOInst(ul[i],'editui');
					switch(true){
						case j:
							foc_edit_ui = ul[i];
							i = ul.length;
						break;
					}
				}
				o = isOInst(foc_edit_ui,'ui_');
				switch(true){
					case o:
						result = Number(foc_edit_ui.getUID());
					break;
				}
			break;
		}
		return result;
	}
	//get_foc_edit end
	//Set Update Rendering User Interface List start
	SURUIL(bool){
		let DATACHK = isbool(bool), RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#uruil = bool;
			break;
		}
	}
	//Set Update Rendering User Interface List end
	//Get Update Rendering User Interface List start
	GURUIL(){
		return !!(this.#uruil);
	}
	//Get Update Rendering User Interface List end
	//get_pri_list start
	get_pri_list(){
		return this.#pri_list;
	}
	//get_pri_list end
	//update_pri_list start
	//top_index place to system_.pri_list[0];
	//use switch only. do not use if
	#update_pri_list(top_index){
		let pl = this.#pri_list;
		let DATACHK = Number.isFinite(top_index) && Array.isArray(pl);
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				let index = this.#pri_list.indexOf(top_index);
				switch(index){
					case -1:
						this.#pri_list.splice(0, 0, top_index);
						result = true;
					break;
					default:
						this.#pri_list.splice(0, 0, this.#pri_list.splice(index, 1)[0]);
						result = true;
					break;
				}
			break;
		}
		switch(result){
			case true:
				this.SURUIL(true);
			break;
		}
		//return result;
	}
	//update_pri_list end
	//get_pri_ui start
	//get priority of ui
	//result : array of ui_ elements
	//use switch only. do not use if
	get_pri_ui(){
		let pl = this.get_pri_list();
		let ul = this.get_ui_list();
		let uidl = this.get_uid_list();
		let DATACHK = Array.isArray(pl) && pl.length > 0
		&& Array.isArray(ul) && ul.length > 0
		&& Array.isArray(uidl) && uidl.length > 0;
		let RUN = true, result;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let i, j, k, idx;
		let ui_set = [];
		switch(RUN){
			case true:
				//if data check passed,
				//#uid search on the system_.ui_list based in ui priority array
				for(i = 0;i < pl.length;i++){
					idx = uidl.indexOf(pl[i]);
					switch(idx){
						case -1:
						break;
						default:
							ui_set.push(ul[idx]);
						break;
					}
				}
			break;
		}
		result = ui_set;
		//result is [] : process was failed.
		//result is [ui_ instance1, ...] : process successed.
		return result;
	}
	//get_pri_ui end
	//find_ start
	//foc_list's data(#uid) / top_ar's data(#uid)
	//search in ui_list
	//array : foc_list OR top_ar
	//cat : category of ui_
	//cat === 0 : Upper ui_
	//cat === 1 : Lower(last) child ui_
	//idx : #uid data
	//mode === 0 : index search ; return index data
	//mode === 1 : ui object search ; return ui_ instance
	//use switch only. do not use if
	#find_(array, cat, idx, mode = 0){
		let DATACHK = Array.isArray(array) && array.length === 2
			&& Array.isArray(array[0]) && array[0].length > 0
			&& Array.isArray(array[1]) && array[1].length > 0
			&& Number.isFinite(idx) && -1 < idx && idx < this.get_uid_cnt()
			&& Number.isFinite(cat) && -1 < cat && cat < 2
			&& Number.isFinite(mode) && -1 < mode && mode < 2;
		let RUN = true;
		let fidx = array[cat].indexOf(idx), result, result0 = -1, result1 = null;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		//console.log(array, cat, idx);
		//console.log('DATACHK = ',DATACHK);
		//console.log('fidx in array ? ' + (fidx > -1));
		//console.log('array[' + cat + '][' + fidx + '] = ',array[cat][fidx]);
		//data validation check variable
		//array index caculation result variable
		let i;
		let ul = this.get_ui_list();
		let uidl = this.get_uid_list();
		//ui_ instance's #uid
		let uid_ = array[cat][fidx];
		switch(RUN){
			case true:
				i = uidl.indexOf(uid_);
				switch(i){
					case -1:
					break;
					default:
						switch(mode){
						case 0:
							result0 = i;
						break;
						case 1:
							result1 = ul[i];
						break;
						}
					break;
				}
			break;
		}
		switch(mode){
			//index search result return
			case 0:
				result = result0;
			break;
			//ui_ instance search result return
			case 1:
				result = result1;
			break;
		}
		return result;
	}
	//find_ end
	//Get Parent From System_ Class start
	//uid : parent ui_ instance's #uid
	GPFSC(ui){
		let ul = this.get_ui_list();
		let uid = ui.getUID();
		let cnt = this.get_uid_cnt()
		let DATACHK = isOInst(ui,'ui') && Number.isFinite(uid)
		&& -1 < uid && uid < this.get_uid_cnt();
		//console.log('GPFSC DATACHK IN NOW');
		//console.log(ui,uid,cnt,DATACHK);
		let RUN = true, result = null;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let ulen, uicnt, UIDCHK;
		switch(RUN){
			case true:
				//console.log('GPFSC RUN IN NOW');
				uicnt = 0;
				ulen = ul.length;
				UIDCHK = ul[ulen].getUID() !== uid;
				while(UIDCHK){
					UIDCHK = ul[--ulen].getUID() !== uid;
				}
				switch(UIDCHK){
					//ui is exists in the system_.#ui_list
					case false:
						result = ul[ulen];
					break;
				}
			break;
		}
		return result;
	}
	//Get Parent From System_ Class end
	//hit_test start
	//hit test on ui_'s area
	//use switch only. do not use if
	#hit_test(ui, x, y){
		//console.log('=-=-=hit_test start=-=-=');
		let DATACHK = isOInst(ui,'ui') && Number.isFinite(x) && x > -1
		&& Number.isFinite(y) && y > -1;
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		//console.log('ui = ',ui);
		//console.log('x = ' + x + ', y = ' + y);
		let fl = this.get_foc_list();
		let p, b, pui_, fidx, puid, uid;
		let x0, y0, w0, h0, x1, x2 ,y1, y2, rx1, rx2, ry1, ry2;
		let HITN, HITRS, HIT;
		switch(RUN){
			case true:
				//window_ instance's default children is
				//index 0: bar_ instance
				//index 1: min button_ instance in the bar_ instance
				//index 2: max button_ instance in the bar_ instance
				//index 3: close button_ instance in the bar_ instance
				//index 4: contents_area_ instance
				//b = boundery_ data set
				pui_ = ui.get_parent0();
				b = ui.get_sum_rect();
				puid = pui_.getUID();
				uid = ui.getUID();
				fidx = fl[0].indexOf(uid);
				//console.log('#hit_text()',puid,uid);
				//console.log('uid, p, b, compare_rect(p,b), fidx');
				//console.log(uid,p,b,compare_rect(p,b),fidx);
				//console.log('uid = ' + uid);
				x0 = b.x;
				y0 = b.y;
				w0 = b.w;
				h0 = b.h;
				x1 = x0;
				x2 = x0 + w0;
				y1 = y0;
				y2 = y0 + h0;
				//hit test in normal area(ui_ instance's inner area)
				//HITN = x1 <= x && x <= x2 && y1 <= y && y <= y2;
				HIT = x1 <= x && x <= x2 && y1 <= y && y <= y2;
				//console.log(ui);
				//console.log('HIT = ' + HIT);
				//debug log
				/*
				console.log('---hit_test---\n'
				+ 'HITN check:' + HITN + '\n'
				+ 'HITRS check:' + HITRS + '\n'
				+ 'HIT(HITN || HITRS) check:' + HIT + '\n'
				+ 'UI:' + ui + '\n'
				+ 'UI area:' + x1 + ',' + y1 + ',' + x2 + ',' + y2 + '\n'
				+ 'Pointer pos:' + x + ',' + y + '\n'
				);
				*/
				switch(true){
					//is in boundery_ area?
					case HIT:
						result = true;
					break;
				}
			break;
		}
		//all process passed : return {N:hit_n,RS:hit_rs} or false;
		//console.log('=-=-=hit_test end=-=-=');
		return result;
	}
	//hit_test end
	//#blur start
	//blur focus event and ui_ focusing
	//use switch only. do not use if
	#blur(idx){
		let fl = this.get_foc_list();
		let DATACHK = Number.isFinite(idx) && -1 < idx && idx < system_.PSL
			&& isOInst(this.get_psa(idx),'ps')
			&& Array.isArray(fl) && fl.length > 0;
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		//logtextarea.textContent += '#blur()\'s DATACHK is ' + DATACHK + '\n';
		let ps, fuid, fidx;
		switch(RUN){
			case true:
				ps = this.get_psa(idx);
//				console.log(ps);
				fuid = ps.get_fuid();
				fidx = fl[1].indexOf(fuid);
				//logtextarea.textContent += 'fuid = ' + fuid + ', fidx = ' + fidx + '\n';
				//this.set_psa(idx,null);
				//this.set_psabm(idx,0);
				this.FPSABM(idx);
				//ps = this.get_psa(idx);
				//logtextarea.textContent += 'isOInst(ps,\'ps\') = ' + isOInst(ps,'ps') + '\n';
				switch(fidx){
					//not exists ; do not anything
					case -1:
						//logtextarea.textContent += 'focus was blured in already.';
					break;
					//fuid is in system_.#foc_list[1],
					//system_.del_foc_list(idx);
					default:
						this.#del_foc_list(fidx);
						//console.log(ps);
					break;
				}
			break;
		}
	}
	//#blur end
	//#blur_All_ start
	//use switch only. do not use if
	#BALL(){
		let i, fl = this.get_foc_list();
		let flimit;
		for(i = system_.PSL - 1;i > -1 ;i--){
			this.#blur(i);
		}
	}
	//#blur_All_ end
	//handle_focus start
	//ui focus handling by system_ class
	//use switch only. do not use if
	#handle_focus(idx){
		let pl = this.get_pri_list();
		let ul = this.get_ui_list();
		let uidl = this.get_uid_list();
		let fl = this.get_foc_list();
		let ta = this.get_top_ar();
		let DATACHK = Number.isFinite(idx) && -1 < idx && idx < system_.PSL
			&& Array.isArray(pl) && pl.length > 0
			&& Array.isArray(ul) && ul.length > 0
			&& Array.isArray(uidl) && uidl.length > 0
			&& Array.isArray(fl)
			&& Array.isArray(ta) && ta.length > 0;
			//console.log('#handle_focus()\'s NEEDS');
			//console.warn(idx, pl, ul, fl, ta, DATACHK);
		let RUN, RUN2;
		RUN = RUN2 = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let ps, pos, PSVAL, fpuid, fuid, pidx, tuidx, luidx, tuid, luid, i, j, tidx, DUPCHK, VAL;
		let hit, S01, S02, S03, S04, c;
		switch(RUN){
			case true:
				ps = this.get_psa(idx);
				switch(isOInst(ps,'ps')){
					case true:
						fpuid = ps.get_tuid();
						fuid = ps.get_fuid();
						pidx = fl[0].indexOf(fpuid);
						pos = ps.get_curr_pos();
						PSVAL = Number.isFinite(fpuid) && Number.isFinite(fuid)
						&& Array.isArray(pos) && Number.isFinite(pos[0])
						&& Number.isFinite(pos[1]) && Number.isFinite(pidx);
					break;
				}
			break;
		}
		switch(PSVAL){
			case true:
				for(i = 0;i < pl.length;i++){
					tuidx = -1;
					luidx = -1;
					tidx = ta[0].indexOf(pl[i]);
					switch(true){
						//top ui_ instance's ui area is exists
						case(tidx > -1):
							//get top ui_ instance's uid and last child of top ui_ instance uid in the #uid_list
							//#uid_list will be the next;
							//when register ui to #ui_list,
							//register uid to #uid_list too
							//when drop ui in #ui_list,
							//drop ui in #uid_list too
							tuidx = uidl.indexOf(ta[0][tidx]);
							luidx = uidl.indexOf(ta[1][tidx]);
						break;
					}
					switch(true){
						//top ui_ instance is exists
						//AND
						//last child of top ui_ instance is exists
						case(tuidx > -1 && luidx > -1):
							j = luidx;
							while(j > tuidx){
								hit = this.#hit_test(ul[j],pos[0],pos[1]);
								switch(hit){
									case true:
										tuid = uidl[tuidx];
										luid = uidl[j];
										DUPCHK = this.UIDSDCIPSA(luid, tuid);
										VAL = hit && !DUPCHK && Number.isFinite(tuid)
										&& Number.isFinite(luid);
									break;
								}
								switch(VAL){
									case true:
										//console.log('tuid = ',tuid,'luid = ',luid);
										ps.set_uid(tuid, luid);
										this.#update_pri_list(tuid);
										c = ul[j].get_sum_rect();
										//position of moment of focused
										ps.set_fpos(c.x, c.y, pos[0], pos[1]);
										//console.log(ps.get_fpos());
										//console.log('\nfpuid = ',fpuid,'fuid = ',fuid,'tuid = ',tuid,'luid = ',luid);
										S01 = fpuid === -1 && fuid === -1;
										S02 = fpuid > -1 && fuid > -1 && fpuid === tuid && fuid !== luid;
										S03 = fpuid > -1 && fuid > -1 && fpuid !== tuid;
										switch(true){
											//previous top ui_'s #uid is not exists in PSlot
											case S01:
												this.#reg_foc_list(tuid,luid);
												//console.log(this.get_foc_list());
											break;
											//previous top ui_;s #uid is exists in PSlot,
											//pfuid is equal to tuid, oldfuid is not equal to luid
											case S02:
												this.#update_foc_list(pidx,tuid,luid);
											break;
											case S03:
												this.#del_foc_list(pidx)
												this.#reg_foc_list(tuid,luid);
											break;
										}
										j = -1;
										VAL = false;
									break;
								}
								j--;
							}
						break;
					}
					S04 = (Number.isFinite(tuid) && tuid > -1 && Number.isFinite(luid) && luid > -1);
					switch(S04){
						case true:
							i = pl.length;
						break;
					}
				}
			break;
		}
	}
	//handle_focus end
	//handle_move start
	//use switch only. do not use if
	#handle_move(idx){
		let DATACHK = Number.isFinite(idx) && -1 < idx && idx < system_.PSL
			&& isOInst(this.get_psa(idx),'ps') && !(this.get_psa(idx).get_ulock());
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let ps,ul;
		switch(RUN){
			case true:
				//ps = this.get_psa(idx);
			break;
		}
	}
	//handle_move end
	//handle_drag start
	//use switch only. do not use if
	#handle_drag(idx){
		let pl = this.get_pri_list();
		let fl = this.get_foc_list();
		let uidl = this.get_uid_list();
		let ul = this.get_ui_list();
		let DATACHK = Array.isArray(pl) && pl.length > 0
			&& Number.isFinite(idx) && -1 < idx && idx < system_.PSL
			&& isOInst(this.get_psa(idx),'ps') && !(this.get_psa(idx).get_ulock())	
			&& Array.isArray(fl) && fl.length > 0
			&& Array.isArray(uidl) && uidl.length > 0
			&& Array.isArray(ul) && ul.length > 0
			&& uidl.length === ul.length;
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let ps, idx_, idx_2, idx_3;
		let tuid, luid, fui, fpui, UIDVAL, UIVAL;
		let win, bar, btn, editui, b, c, p, fpos, str;
		//NOTE : drag ui_'s infomation search routine is the NEXT;
		//this data flow belong to set the focus in already
		switch(RUN){
			case true:
				ps = this.get_psa(idx);
				switch(isOInst(ps,'ps')){
					case true:
						//
						idx_ = fl[1].indexOf(ps.get_fuid());
					break;
				}
			break;
		}
		//STEP 1-2.get focused lower ui_'s #uid
		switch(true){
			case(idx_ > -1):
				//str = 'PSlot\'s id is ' + ps.get_id() + '\n';
				idx_2 = uidl.indexOf(fl[1][idx_]);
				idx_3 = uidl.indexOf(fl[0][idx_]);
			break;
		}
		//STEP 2. focused ui(fui) caching
		switch(true){
			case(idx_2 > -1 && idx_3 > -1):
				fui = ul[idx_2];
				fpui = ul[idx_3];
				UIVAL = isOInst(fui,'ui') && isOInst(fpui,'ui');
			break;
		}
		switch(UIVAL){
			case true:
				UIDVAL = fl[0][idx_] === ps.get_tuid()
				&& fl[0][idx_] === fpui.getUID()
				&& fl[1][idx_] === ps.get_fuid()
				&& fl[1][idx_] === fui.getUID();
				//STEP5. PROCESSING belong to ui_ classification
				win = isOInst(fui,'winui') && UIDVAL;
				bar = isOInst(fui,'bar') && UIDVAL && fui.get_drag();
				btn = isOInst(fui,'btn') && UIDVAL;
				editui = isOInst(fui,'editui') && UIDVAL;
			break;
		}
		//console.log('win = ' + win + ', bar = ' + bar + ', btn = ' + btn + 'editui = ' + editui);
		switch(true){
			case bar:
				//str += this.FLTS();
				//DRAG TOP UI'S POSITION
				//console.log(fpui);
				c = ps.get_curr_pos();
				//p = ps.get_prev_pos();
				fpos = ps.get_fpos();
				//console.log(c[0] - fpos[0],c[1] - fpos[1]);
				//c = this.#psa[idx].get_curr_pos();
				//console.log('current position : ' + c[0] + ',' + c[1] + ' / previous position : ' + p[0] + ',' + p[1]);
				//current cursor position - position of focused
				fpui.move_to(c[0] - fpos[0],c[1] - fpos[1]);
				//logtextarea.textContent += str;
			break;
			case win:
			//DO NOT ANYTHING IN NOW
			break;
			case btn:
			//DO NOT ANYTHING IN NOW
			break;
			case editui:
			//DO NOT ANYTHING IN NOW
			break;
		}
	}
	//handle_drag end
	//handle_event start
	//use switch only. do not use if
	#handle_event(idx, cat){
		let ps;
		let DATACHK = Number.isFinite(idx) && -1 < idx && idx < system_.PSL
		&& (ps = this.get_psa(idx), isOInst(ps,'ps'))
		&& Number.isFinite(cat) && cat > -1 && cat < 8;
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let FOCVAL;
		switch(RUN){
			case true:
				switch(cat){
					case 0://pointer leave
						//OFF hover effect
						//OFF tooltip effect
						ps.set_effoff(true);
						FOCVAL = this.CDIOPSA(ps.get_tuid(),ps.get_fuid());
						switch(FOCVAL){
							case true:
								//MUST KEEPING ON FOCUS ; DO NOT .#blur(idx);
							break;
							case false:
								this.#blur(idx);
							break;
						}
					break;
					case 1://pointer over
						//ON drag(enable update coordinate)
						ps.set_ulock(false);
						// STATE ONLY: clear OVER flag (slot still alive)
						this.set_psabm(idx,this.get_psabm(idx) & ~system_.pover_);
					break;
					case 2://pointer enter
						//ON drag(enable update coordinate)
						ps.set_ulock(false);
						// STATE ONLY: clear ENTER flag (slot still alive)
						this.set_psabm(idx,this.get_psabm(idx) & ~system_.penter_);
					break;
					case 3://pointer cancel
						//OFF drag(stop update coordinate)
						//STOP system_.psa[idx].set_curr_pos(x, y);
						ps.set_ulock(true);
						//RESET CUMULATIVE VALUE
						//RESET #mel FLAG
						this.set_mel(false);
						//RESET FOCUS
						// Focus-only reset; does NOT blur slot or clear psabm
						this.RFBPSA(idx);
						//KEEPING ON DOWN BIT
						// STATE ONLY: clear POINTER CANCEL flag (slot still alive)
						this.set_psabm(idx,this.get_psabm(idx) & ~system_.pcancel_);
					break;
					case 4://touch cancel
						//OFF drag(stop update coordinate)
						ps.set_ulock(true);
						//RESET CUMULATIVE VALUE
						//RESET #mel FLAG
						this.set_mel(false);
						//STOP system_.psa[idx].set_curr_pos(x, y);
						//RESET FOCUS
						// Focus-only reset; does NOT blur slot or clear psabm
						this.RFBPSA(idx);
						//KEEPING ON DOWN BIT
						// STATE ONLY: clear TOUCH CANCEL flag (slot still alive)
						this.set_psabm(idx,this.get_psabm(idx) & ~system_.tcancel_);
					break;
					case 5://mouse out
						//OFF hover effect
						//OFF tooltip effect
						ps.set_effoff(true);
						//OFF drag(stop update coordinate)
						ps.set_ulock(true);
						//RESET FOCUS
						// Focus-only reset; does NOT blur slot or clear psabm
						this.RFBPSA(idx);
						// STATE ONLY: clear MOUSE OUT flag (slot still alive)
						this.set_psabm(idx,this.get_psabm(idx) & ~system_.mout_);
					break;
					case 6://mouse wheel
						// STATE ONLY: clear MOUSE WHEEL flag (slot still alive)
						this.set_psabm(idx,this.get_psabm(idx) & ~system_.mwheel_);
					break;
					case 7://mouse contextmenu
						// STATE ONLY: clear MOUSE CONTEXTMENU flag (slot still alive)
						this.set_psabm(idx,this.get_psabm(idx) & ~system_.mcontextmenu_);
					break;
				}
			break;
		}
	}
	//handle_event end
	//Coordinate Distance Threshold Judge start
	//use switch only. do not use if
	CDTJ(idx, x, y){
		let DATACHK = Number.isFinite(idx) && -1 < idx && idx < system_.PSL
		&& Number.isFinite(x) && x > -1	&& Number.isFinite(y) && y > -1
		&& isOInst(this.get_psa(idx),'ps') && !(this.get_psa(idx).get_ulock());
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		//console.log(idx, x, y, RUN);
		let psa, c, dx, dy, d2;
		let S01, S02;
		switch(RUN){
			case true:
				//console.log('CDTJ Process Start');
				psa = this.get_psa(idx);
				//console.log('psa[idx] = ' + psa);
				S01 = isOInst(psa,'ps');
				switch(S01){
					case true:
						//console.log('psa[idx] is PointerSlot.');
						c = psa.get_curr_pos();
					break;
				}
				let threshold;
				S02 = isobj(c);
				switch(S02){
					case true:
						//console.log('previous position is exists');
						dx = Math.abs(c[0] - x);
						dy = Math.abs(c[1] - y);
						d2 = (dx * dx) + (dy * dy);
						const D2 = 4;
						threshold = d2 >= D2;
						switch(threshold){
							case true:
								//console.log('Passed Distance Threshold Process. d2 : ' + d2);
								result = true;
							break;
						}
					break;
				}
			break;
		}
		return result;
	}
	//Coordinate Distance Threshold Judge end
	//listening start
	//use switch only. do not use if
	//all event listening on canvas
	listening(e){
		//let ti1 = performance.now(), ti2;
		e.preventDefault();
		let ul = this.get_ui_list();
		let mel = this.get_mel();
		let EVCHK = isOInst(e,'ev') && ul.length > 0;
		let RUN, RUN2;
		RUN = RUN2 = true;
		switch(false){
			case EVCHK:
				RUN = false;
			break;
		}
		let id, index1, index2, tidx = -1, idxchk;
		let M = e.type[0] === 'm';
		let T = e.type[0] === 't';
		let P = e.type[0] === 'p';
		let bit, bm, prev_down = false;
		let p, m, t, i, j;
		let down, move, up, out, wheel, contextmenu, leave, over, enter, cancel;
		down = move = up = out = wheel = contextmenu = leave = over = enter = cancel = false;
		let x, y, isoffset, cts, rect, iscdtj, any_event, tcnt;
		switch(true){
			case P:
				p = e.type[7];
				down = p === 'd';
				move = p === 'm';
				up = p === 'u';
				leave = p === 'l';
				over = p === 'o';
				enter = p === 'e';
				cancel = p === 'c';
				id = e.pointerId;
			break;
			case T:
				t = e.type[5];
				down = t === 's';
				move = t === 'm';
				up = t === 'e';
				cancel = t === 'c';
				id = e.identifier;
			break;
			case M:
				m = e.type[5];
				down = m === 'd';
				move = m === 'm';
				up = m === 'u';
				out = m === 'o';
				wheel = m === 'w';
				contextmenu = m === 'c';
				id = this.#mouseId;
			break;
		}
		let dauev = down || up || leave || over || enter || cancel || out || wheel || contextmenu;
		any_event = dauev || move;
		//pointer-mouse drag/move event flags
		let PMMOVEJ, PMNMOVE, PMNDRAG, PMDOWN, PMDRAGBS, PMMOVEBS, PMMOVE, PMOVER;
		//touch drag/move event flags + changed touch event bit-mask's last index
		let TMOVEJ, TNMOVE, TNDRAG, TDOWN, TDRAGBS, TMOVE, TOVER, TBMLIDX;
		//One Of PointerSlot ; Is Not Array
		let PS, PSCHK, UL;
		let S01,S02,S03,S04,S05,S06,S07,S08,S09,S10;
		switch(isbool(dauev)){
			case false:
				dauev = false;
			break;
		}
		//console.log('RUN = ' + RUN + ', mel = ' + mel + ', dauev = ' + dauev);
		switch(RUN && any_event){
			case true:
				index1 = this.get_psa_empty_idx();
				index2 = this.#is_in_psa(id);
				S01 = index2 > -1;
				S02 = index1 > -1;
				switch(true){
					case S01:
						tidx = index2;
					break;
					case S02:
						tidx = index1;
					break;
					default:
						tidx = -1;
					break;
				}
				PS = this.get_psa(tidx);
				PSCHK = isOInst(PS,'ps');
				switch(PSCHK){
					case true:
						UL = PS.get_ulock();
					break;
				}
				bm = this.get_psabm(tidx);
				isoffset = Number.isFinite(e.offsetX) && Number.isFinite(e.offsetY);
				rect = this.get_rect();
				switch(isoffset){
					case true:
						x = e.offsetX;
						y = e.offsetY;
					break;
					case false:
						x = e.clientX - rect.left;
						y = e.clientY - rect.top;
					break;
				}
				//current event is pointer(mouse)Move?
				PMMOVEJ = (P || M) && move && PSCHK && !UL;
				//current event is pointerMove?
				TMOVEJ = T && move && PSCHK && !UL && IAL(e.changedTouches);
				switch(true){
					case PMMOVEJ:
						iscdtj = this.CDTJ(tidx, x, y);
						//console.log('tidx = ' + tidx + ', x = ' + x + ', y = ' + y + ', iscdtj = ' + iscdtj);
						switch(true){
							case P:
								//pointer-mouse event bit-mask is not equal to 'pmove_'
								PMNMOVE = (bm & system_.pmove_) === 0;
								//pointer-mouse event bit-mask is not equal to 'pdrag_'
								PMNDRAG = (bm & system_.pdrag_) === 0;
								//pointer-mouse event bit-mask is equal to 'pdown_'
								PMDOWN = (bm & system_.pdown_) === system_.pdown_;
								//pointer-mouse event bit-mask is equal to 'pmove_'
								PMMOVE = (bm & system_.pmove_) === system_.pmove_;
							break;
							case M:
								//pointer-mouse event bit-mask is not equal to 'mmove_'
								PMNMOVE = (bm & system_.mmove_) === 0;
								//pointer-mouse event bit-mask is not equal to 'mdrag_'
								PMNDRAG = (bm & system_.mdrag_) === 0;
								//pointer-mouse event bit-mask is equal to 'mdown_'
								PMDOWN = (bm & system_.mdown_) === system_.mdown_;
								//pointer-mouse event bit-mask is equal to 'mmove_'
								PMMOVE = (bm & system_.mmove_) === system_.mmove_;
							break;
						}
						//jugde of pointer-drag event bit mask setting
						PMDRAGBS = PMNMOVE && PMDOWN && iscdtj;
						//jugde of pointer-move event bit mask setting
						PMMOVEBS = PMNMOVE && iscdtj;
						S03 = P && PMDRAGBS;
						S04 = M && PMDRAGBS;
						S05 = P && PMMOVEBS;
						S06 = M && PMMOVEBS;
						switch(true){
							case S03:
								//console.log('pointer drag event');
								this.set_psabm(tidx,system_.pdrag_);
							break;
							case S04:
								//console.log('mouse drag event');
								this.set_psabm(tidx,system_.mdrag_);
							break;
							case S05:
								//console.log('pointer move event');
								this.set_psabm(tidx,system_.pmove_);
							break;
							case S06:
								//console.log('mouse move event');
								this.set_psabm(tidx,system_.mmove_);
							break;
						}
						//console.log(PSCHK,PMMOVE,mel,!UL);
						S07 = !PSCHK && P;
						S08 = !PSCHK && M;
						S09 = PSCHK && PMMOVE;
						switch(true){
							case S07:
								//console.log(id,x,y);
								this.set_psa(tidx, new PSlot(id, x, y, 'p'));
								//this.#psa[tidx] = new PSlot(id, x, y, 'p');
							break;
							case S08:
								//console.log(id,x,y);
								this.set_psa(tidx, new PSlot(id, x, y, 'm'));
								//this.#psa[tidx] = new PSlot(id, x, y, 'p');
							break;
							case S09:
								PS.set_curr_pos(x, y);
								//this.#psa[tidx].update(x, y);
							break;
						}
						this.set_mel(true);
					break;
					case(TMOVEJ):
						//console.log('validate touch move event captured!');
						cts = e.changedTouches;
						switch(Array.isArray(cts)){
							case true:
								for(i = 0;i < cts.length;i++){
									id = cts[i].identifier;
									index1 = this.get_psa_empty_idx();
									index2 = this.#is_in_psa(id);
									S01 = index2 > -1;
									S02 = index1 > -1;
									switch(true){
										case S01:
											tidx = index2;
										break;
										case S02:
											tidx = index1;
										break;
										default:
											tidx = -1;
										break;
									}
									x = cts[i].clientX - rect.left;
									y = cts[i].clientY - rect.top;
									//coorditate distance threshold judge process
									iscdtj = this.CDTJ(tidx, x, y);
									switch(iscdtj){
										case true:
											bm = this.get_psabm(tidx);
											//touch event bit-mask is not equal to 'tmove_'
											TNMOVE = (bm & system_.tmove_) === 0;
											//touch event bit-mask is not equal to 'tdrag_'
											TNDRAG = (bm & system_.tdrag_) === 0;
											//touch event bit-mask is equal to 'tdown_'(touchstart event)
											TDOWN = (bm & system_.tdown_) === system_.tdown_;
											//pointer-mouse event bit-mask is equal to 'tmove_'
											TMOVE = (bm & system_.tmove_) === system_.tmove_;

											TDRAGBS = TNDRAG && TDOWN;
											switch(true){
												//jugde of touch-drag event bit mask setting
												case TDRAGBS:
													this.set_psabm(tidx,system_.tdrag_);
												break;
												//jugde of touch-move event bit mask setting
												case TNMOVE:
													this.set_psabm(tidx,system_.tmove_);
												break;
											}
											PS = this.get_psa(tidx);
											PSCHK = isOInst(PS,'ps');
											switch(PSCHK){
												case true:
													UL = PS.get_ulock();
												break;
											}
											S03 = !PSCHK && T;
											S04 = PSCHK && TMOVE && iscdtj
											switch(true){
												case S03:
													//console.log(id,x,y);
													this.set_psa(tidx, new PSlot(id, x, y, 't'));
												break;
												case S04:
													this.get_psa(tidx).set_curr_pos(x, y);
													//this.#psa[tidx].update(x, y);
												break;
											}
										break;
									}
								}
							break;
						}
						this.set_mel(true);
					break;
				}

				//logtextarea.textContent += 'id:' + id + ', tidx:' + tidx + ', event-type:' + e.type + ', x:' + x + ', y:' + y + '\n';
				//console.log('dauev = ' + dauev);
				this.set_stamp();
				let S11,S12,S13,S14,S15,S16,S17,S18,S19,S20;
				let S21,S22,S23;
				S11 = P && dauev;
				S14 = T && dauev;
				S21 = M && dauev;
				switch(true){
					case S11:
						S12 = tidx === -1;
						S13 = tidx > -1;
						switch(true){
							case S12:
								RUN2 = false;
							break;
							case S13:
								switch(true){
									case down:
										//console.log('pointerDown event bit set in now!')
										this.set_psabm(tidx,system_.pdown_);
									break;
									case up:
										this.set_psabm(tidx,system_.pup_);
									break;
									case over:
										this.set_psabm(tidx,system_.pover_);
									break;
									case cancel:
										this.set_psabm(tidx,system_.pcancel_);
									break;
									case leave:
										this.set_psabm(tidx,system_.pleave_);
									break;
									case enter:
										this.set_psabm(tidx,system_.penter_);
									break;
								}
							break;
						}
					break;
					case S14:
						cts = e.changedTouches;
						tcnt = 0;
						S15 = IAL(cts);
						switch(S15){
							case true:
								for(i = 0;i < cts.length;i++){
									id = cts[i].identifier;
									index1 = this.get_psa_empty_idx();
									index2 = this.#is_in_psa(id);
									S16 = index2 > -1;
									S17 = index1 > -1;
									switch(true){
										case S16:
											tidx = index2;
											tcnt++;
										break;
										case S17:
											tidx = index1;
											tcnt++;
										break;
										default:
											tidx = -1;
										break;
									}
									S18 = tidx > -1 && cancel;
									S19 = tidx > -1 && down;
									S20 = tidx > -1 && up;
									switch(true){
										case S18:
											this.set_psabm(tidx,system_.tcancel_);
										break;
										case S19:
											this.set_psabm(tidx,system_.tdown_);
										break;
										case S20:
											this.set_psabm(tidx,system_.tup_);
										break;
									}
								}
							break;
						}
						switch(tcnt){
							case 0:
								RUN2 = false;
							break;
						}
					break;
					case S21:
						S22 = index1 === -1 && index2 === -1;
						S23 = index1 > -1 || index2 > -1;
						switch(true){
							case S22:
								RUN2 = false;
							break;
							case S23:
								switch(true){
									case down:
										this.set_psabm(tidx,system_.mdown_);
									break;
									case up:
										this.set_psabm(tidx,system_.mup_);
									break;
									case over:
										this.set_psabm(tidx,system_.mover_);
									break;
									case out:
										this.set_psabm(tidx,system_.mout_);
									break;
									case wheel:
										this.set_psabm(tidx,system_.mwheel_);
									break;
									case contextmenu:
										this.set_psabm(tidx,system_.mcontextmenu_);
									break;
								}
							break;
						}
					break;
				}
			break;
		}
		let S30 = RUN && RUN2 && dauev;
		let S31,S32,S33,S34,S35,S36,S37,S38,S39;
		//console.log('RUN = ' + RUN + ', RUN2 = ' + RUN2);
		let str, s1;
		let ps1, ts1, ms1;
		let p1, p2, p2_, p3, p4, p5, p6, p7, p8, p9, pnmove;
		let t1, t2, t3, t4, t5;
		let m1, m2, m3, m4, m5, m6, m7;
		let PSTRVAL,TSTRVAL,MSTRVAL;
		let fuid, DLOCK = false;
		//console.log('down = ' + down);
		//console.log('is pointer event ? ' + P);
		//console.log('is touch event ? ' + T);
		//console.log('is mouse event ? ' + M);
		switch(S30){
			case true:
				//console.log('Event Handling Part')
				//console.log('x = ' + x + ', y = ' + y);
				//console.log(str);
				switch(true){
					//pointer event
					case P:
						//PSTRVAL = down || up || cancel || leave || over || enter;
						//console.log('event = ' + e.type + ', pointertype = ' + e.pointerType + ', pointerId:' + e.pointerId + ', id = ' + id + ', tidx = ' + tidx + ' bit = ' + str);
						//console.log('PSTRVAL = ' + PSTRVAL);
						bm = this.get_psabm(tidx);
						ps1 = bm > 0;
						switch(true){
							case ps1:
								//console.log('bm = 0x' + bm.toString(16));
								//console.log('down = ' + ((bm & system_.pdown_) === system_.pdown_));
								//console.log('event = ' + e.type + ', bm = ' + to_bin(bm));
								p1 = (bm & system_.pdrag_) === system_.pdrag_ && iscdtj;
								p2 = ((bm & system_.pdown_) === system_.pdown_)
								&& ((bm & system_.pmove_) !== system_.pmove_);
								p3 = (bm & system_.pmove_) === system_.pmove_;
								p4 = (bm & system_.pover_) === system_.pover_;
								p5 = (bm & system_.pup_) === system_.pup_;
								p6 = (bm & system_.pcancel_) === system_.pcancel_;
								p7 = (bm & system_.pleave_) === system_.pleave_;
								p8 = (bm & system_.penter_) === system_.penter_;
								pnmove = p2 || p4 || p5 || p6 || p7 || p8;
								PS = this.get_psa(tidx);
								PSCHK = isOInst(PS,'ps');
								S31 = !PSCHK && !leave;
								S32 = PSCHK && pnmove && !leave;
								switch(true){
									case S31:
										//console.log(id,x,y);
										this.set_psa(tidx, new PSlot(id, x, y, 'p'));
										//this.#psa[tidx] = new PSlot(id, x, y, 'p');
									break;
									case S32:
										this.get_psa(tidx).set_curr_pos(x, y);
										//this.#psa[tidx].update(x, y);
									break;
								}
								S33 = p4 && iscdtj;
								switch(true){
									//cancel event
									case p6:
										//console.log('pointerCancel event');
										this.#handle_event(tidx,3);
									break;
									//up event
									case p5:
										//this.#RTRQ(tidx);
										this.#blur(tidx);
										//console.log('pointer up event');
									break;
									case p7:
										//console.log('pointer leave event');
										this.#handle_event(tidx,0);
									break;
									case p8:
										//console.log('pointer enter event');
										this.#handle_event(tidx,2);
									break;
									//down event
									case p2:
										switch(PSCHK){
											case true:
												fuid = PS.get_fuid();
												DLOCK = Number.isFinite(fuid) && fuid > -1 && fuid < this.get_uid_cnt();
											break;
										}
										switch(DLOCK){
											case false:
												//console.log('pointerDown event');
												this.#DNURA = true;
												//console.log('bit = ' + to_bin(bit) + ', bm = ' + to_bin(bm));
												this.#handle_focus(tidx);
												switch(S32){
													case true:
														PS.set_ulock(false);
													break;
												}
												//console.log('p2 : ',bm);
												//console.log('tidx = ' + tidx + ', bit = ' + str);
												//alert(P + ', ' + e.pointerId);
											break;
										}
									break;
									//drag event
									//case p1:
										//console.log('pointerDrag event');
										//console.log('bit = ' + to_bin(bit) + ', bm = ' + to_bin(bm));
										//this.#handle_drag(tidx);
										//console.log('p1 : ',bm);
									//break;
									//over event
									case S33:
										//DO NOT ANYTHING IN NOW
										//console.log('pointer over event');
										this.#handle_event(tidx,1);
									break;
									//move event
									//case(p3 && iscdtj):
										//console.log('pointer move event');
										//console.log('bit = ' + to_bin(bit) + ', bm = ' + to_bin(bm));
										//this.#handle_move(tidx);
										//this.set_mel(true);
										//console.log('p34 : ',bm);
									//break;
								}
							break;
						
						}
					break;
					//touch event
					case T:
						TSTRVAL = down || move || up
							|| cancel;
						ts1 = isoffset === false && TSTRVAL && TNMOVE;
						switch(true){
							case ts1:
								S34 = Array.isArray(cts)
								switch(S34){
									case true:
										for(i = 0;i < cts.length;i++){
											index1 = this.get_psa_empty_idx();
											id = cts[i].identifier;
											index2 = this.#is_in_psa(id);
											S35 = index2 > -1;
											S36 = index1 > -1;
											switch(true){
												case S35:
													tidx = index2;
												break;
												case S36:
													tidx = index1;
												break;
												default:
													tidx = -1;
												break;
											}
											s1 = tidx > -1;
											switch(true){
												case s1:
													x = cts[i].clientX - rect.left;
													y = cts[i].clientY - rect.top;
													bm = this.get_psabm(tidx);
													//this.#psabm[tidx] |= bit;
													//bm = this.#psabm[tidx];
													t1 = (bm & system_.tdrag_) === system_.tdrag_;
													t2 = ((bm & system_.tdown_) === system_.tdown_)
													&& ((bm & system_.tmove_) !== system_.tmove_);
													t3 = (bm & system_.tmove_) === system_.tmove_;
													t4 = (bm & system_.tup_) === system_.tup_;
													t5 = (bm & system_.tcancel_) === system_.tcancel_;
													iscdtj = this.CDTJ(tidx, x, y);
													switch(index2){
														case -1:
															this.set_psa(tidx, new PSlot(id, x, y, 't'));
															//this.#psa[tidx] = new PSlot(id, x, y, 't');
														break;
														default:
															S37 = (t1 && iscdtj) || t2 || t45;
															switch(true){
																case S37:
																	this.get_psa(tidx).set_curr_pos(x, y);
																break;
															}
															//this.#psa[tidx].update(x, y);
														break;
													}
													switch(true){
														case t5:
															this.#handle_event(tidx,4);
															this.#BALL();
														break;
														case t4:
															//this.#RTRQ(tidx);
															this.#blur(tidx);
														break;
														case t2:
															this.#handle_focus(tidx);
														break;
														//case(t1 && iscdtj):
														//	this.#handle_drag(tidx);
														//break;
														//case(t3 && iscdtj):
														//	this.#handle_move(tidx);
														//	this.set_mel(true);
														//break;
													}
												break;
											}
										}
									break;
								}
							break;
						}
					break;
					//mouse event
					case M:
						MSTRVAL = down || move || up || out || wheel || contextmenu;
						ms1 = MSTRVAL && tidx > -1;
						switch(true){
							case ms1:
								bm = this.get_psabm(tidx);
								//this.#psabm[tidx] |= bit;
								//bm = this.#psabm[tidx];
								m1 = (bm & system_.mdrag_) === system_.mdrag_;
								m2 = ((bm & system_.mdown_) === system_.mdown_)
								&& ((bm & system_.mmove_) !== system_.mmove_);
								m3 = (bm & system_.mmove_) === system_.mmove_;
								m4 = (bm & system_.mup_) === system_.mup_;
								m5 = (bm & system_.mout_) === system_.mout_;
								m6 = (bm & system_.mwheel_) === system_.mwheel_;
								m7 = (bm & system_.mcontextmenu_) === system_.mcontextmenu_;
								PS = this.get_psa(tidx);
								PSCHK = isOInst(PS,'ps');
								S38 = !PSCHK;
								S39 = PSCHK && ((m1 && iscdtj) || m2 || m45 || m6 || m7);
								switch(true){
									case S38:
										this.set_psa(tidx, new PSlot(id, x, y, 'm'));
										//this.#psa[tidx] = new PSlot(id, x, y, 'm');
									break;
									case S39:
										this.get_psa(tidx).set_curr_pos(x, y);
										//this.#psa[tidx].update(x, y);
									break;
								}
								switch(true){
									case m4:
										//this.#RTRQ(tidx);
										this.#blur(tidx);
									break; 
									case m2:
										this.#handle_focus(tidx);
									break;
									//case m1:
									//	this.#handle_drag(tidx;
									//break;
									//case m3:
									//	this.#handle_move(tidx);
									//	this.set_mel(true);
									//break;
									case m5:
										this.#handle_event(tidx,5);
										this.#BALL();
									break;
									case m6:
										this.#handle_event(tidx,6);
									break;
									case m7:
										this.#handle_event(tidx,7);
									break;
								}
							break;
						}
					break;
				}
			break;
		}
		//ti2 = performance.now();
		//console.log((ti2 - ti1) + 'ms');
	}
	//listening end
	//Rendering By Priority start
	//use switch only. do not use if
	#RBP(){
		let pl = this.get_pri_list();
		let tl = this.get_top_ar()
		let fl = this.get_foc_list();
		let DATACHK = Array.isArray(pl) && Array.isArray(tl)
		&& Array.isArray(fl);
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let uidl, sidx, eidx;
		let hlc = system_.dhlc, fs = system_.dfs, lh = system_.dlh, cw = 1, ch = system_.dlh;
		//part of system_.#ui_list
		let poul = [], se_ = [], tidx;
		let i,j;
		//STEP1. index search based on UI priority .
		//USING top ui_ instance's #uid [in the system_.#pri_list]
		//TO
		//index search on the system_.#top_ar[0].(top ui_ instance's #uid array)
		//STEP2. index validation check.
		//about the system_.#top_ar[0].indexOf(system_.#pri_list[N]);
		//STEP3 system_.#ui_list.slice(start indx, end index) PUSH TO poul.
		switch(RUN){
			case true:
				uidl = this.get_uid_list();
				for(i = 0;i < pl.length;i++){
					tidx = tl[0].indexOf(pl[i]);
					j = tidx > -1;
					switch(j){
						case true:
							sidx = uidl.indexOf(tl[0][tidx]);
							switch(sidx){
								case -1:
								break;
								default:
									eidx = sidx + (tl[1][tidx] - tl[0][tidx]);
								break;
							}
							poul.push(this.#GUILSE(sidx, eidx));
						break;
					}
				}
		//STEP4. DELETE OF INVALID VALUE.
				//invaild value is exists in the poul,
				//remove invalid value in the poul
				for(i = poul.length - 1;i > -1;i--){
					switch(isbool(poul[i])){
						case true:
							poul.splice(i,1);
						break;
					}
				}
		//STEP5. SET TO RESULT
				result = poul;
			break;
		}
		return result;
	}
	//Rendering By Priority end
	//Get Rendering By Priority start
	GRBP(){
		return this.#RBP();
	}
	//Get Rendering By Priority end
	//Drag-Move Event Handling Process start
	DMEHP(){
		let psa = this.#psa, psabm = this.#psabm;
		let i, ps, bm, mel = this.get_mel(), type, mstr, dstr;
		//[pointer/mouse/touch] move-drag event flag
		let BMVAL,VAL,VAL2,VAL3,DRAG,MOVE;
		const m = 'move_', d = 'drag_'; 
		for(i = 0;i < system_.PSL;i++){
			ps = psa[i];
			switch(isOInst(ps,'ps')){
				case true:
					bm = psabm[i];
					BMVAL = Number.isFinite(bm) && bm > 0;
					switch(BMVAL){
						case true:
							type = ps.get_type();
							mstr = type + m;
							dstr = type + d;
							DRAG = (bm & system_[dstr]) === system_[dstr];
							MOVE = (bm & system_[mstr]) === system_[mstr];
						break;
					}
					switch(true){
						case(mel && DRAG)://down + move event ; high priority
							this.#handle_drag(i);
						break;
						case(mel && MOVE)://move event ; low priority
							this.#handle_move(i);
						break;
					}
				break;
				case false:
					i = system_.PSL;
				break;
			}
		}
	}
	//Drag-Move Event Handling Process end
	//set_drrai start
	set_drrai(rect){
		let DATACHK = isobj(rect) && Object.hasOwn(rect,'x')
		&& Object.hasOwn(rect,'y') && Object.hasOwn(rect,'w')
		&& Object.hasOwn(rect,'h');
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#drrai = rect;
			break;
		}
	}
	//set_drrai end
	//get drrai start
	get_drrai(){
		let drect = this.#drrai;
		let DATACHK = isobj(drect) && Object.hasOwn(drect,'x')
		&& Object.hasOwn(drect,'y') && Object.hasOwn(drect,'w')
		&& Object.hasOwn(drect,'h');
		let RUN = true, result = null;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				result = {x:drect.x, y:drect.y, w:drect.w, h:drect.h};
			break;
		}
		return result;
	}
	//get drrai end
	//Dirty Rect Rendering Area Caculation start
	DRRAC(){
		let psa = this.#psa;
		let fl = this.get_foc_list();
		let DATACHK = Array.isArray(psa)
		&& psa.length === system_.PSL && isOInst(psa[0],'ps')
		&& Array.isArray(fl) && fl.length === 2
		&& Array.isArray(fl[0]) && fl[0].length > 0
		&& Array.isArray(fl[1]) && fl[0].length === fl[1].length;;
		let RUN = true, result;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let changed, CHVAL, i, VALCHK;
		let p, c, x, y, x_, y_;
		//rendering list
		let rlist;
		switch(RUN){
			case true:
				changed = this.FUIDSIPSA();
				CHVAL = Array.isArray(changed) && changed.length > 0;
				switch(CHVAL){
					case true:
						//x OR y initial value is not 0;
						//x OR y is minimum value of coordinate
						//0 is canvas's point of the zero.
						//0 can not recommended
						//if you set the center of the canvas is point of zero,
						//fix this logic.
						x_ = y_ = 0;
						rlist = [];
						for(i = 0;i < changed.length;i++){
							p = changed[i].get_prev_pos();
							c = changed[i].get_curr_pos();
							CHVAL = (p[0] !== c[0] || p[1] !== c[1])
							&& fl[0].indexOf(changed[i].get_tuid()) > -1;
							switch(true){
								case(i === 0 && CHVAL):
									x = Math.min(p[0], c[0]);
									y = Math.min(p[1], c[1]);
									x_ = Math.max(x_, p[0],c[0]);
									y_ = Math.max(y_, p[1],c[1]);
								break;
								case(i > 0 && CHVAL):
									x = Math.min(x, p[0], c[0]);
									y = Math.min(y, p[1], c[1]);
									x_ = Math.max(x_, p[0],c[0]);
									y_ = Math.max(y_, p[1],c[1]);
								break;
							}
						}
						VALCHK = Number.isFinite(x) && Number.isFinite(y)
						&& Number.isFinite(x_) && Number.isFinite(y_)
						&& Array.isArray(rlist) && rlist.length > 0;
						switch(VALCHK){
							case true:
								result = {
									x:x,
									y:y,
									w:(x_ - x),
									h:(y_ - y),
								}
								this.set_drrai(result);
							break;
						}
					break;
				}
			break;
		}
	}
	//Dirty Rect Rendering Area Caculation end
	//Dirty Rect Rendering Area start
	DRRA(){
		let drect = this.get_drrai();
		let DATACHK = isobj(drect) && Object.hasOwn(drect,'x') && Object.hasOwn(drect,'y')
		&& Object.hasOwn(drect,'w') && Object.hasOwn(drect,'h');
		let DATACHK2;
		let RUN, RUN2, result = null;
		RUN = RUN2 = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let x, y, w, h, x_, y_, c, r;
		let ui_set, i, j, XVAL, YVAL, X_VAL, Y_VAL, DRVAL;
		switch(RUN){
			case true:
				x = drect.x;
				y = drect.y;
				w = drect.w;
				h = drect.h;
				x_ = x + w;
				y_ = y + h;
				ui_set = this.get_pri_ui();
				for(i = 0;i < ui_set.length;i++){
					r = ui_set[i].get_4p();
					DRVAL = x < r.x2 && r.x1 < x_
					&& y < r.y2 && r.y1 < y_;
					//r.x1 is less than x
					XVAL = r.x1 < x && DRVAL;
					//r.x2 is bigger than x_
					X_VAL = x_ < r.x2 && DRVAL;
					//r.y1 is less than y
					YVAL = r.y1 < y && DRVAL;
					//r.y2 is bigger than y_
					Y_VAL = y_ < r.y2 && DRVAL;
					switch(XVAL){
						case true:
							x = r.x1 - system_.DRPADD;
						break;
					}
					switch(X_VAL){
						case true:
							x_ = r.x2 + system_.DRPADD;
						break;
					}
					switch(YVAL){
						case true:
							y = r.y1 - system_.DRPADD;
						break;
					}
					switch(Y_VAL){
						case true:
							y_ = r.y2 + system_.DRPADD;
						break;
					}
				}
				result = {x:x, y:y, w:(x_ - x), h:(y_ - y)};
			break;
		}
		return result;
	}
	//Dirty Rect Rendering Area end
	//update start
	//use switch only. do not use if
	update(){
		//let TAVAL = this.#top_ar.length > 0
		//	&& this.#top_ar[0].length > this.#top_ar[1].length;
		//top_ar must be in complete
		//switch(TAVAL){
		//	case true:
		//		let last_index = this.#top_ar[0].length - 1;
		//		this.#comp_top_ar(last_index);
		//	break;
		//}
		this.#MRQ();
		//ime.set_text();
		//ime.set_isr(false);
		//global input lock flag reset
		INPUT = true;

		switch(this.#DNURA){
			case false:
				switch(this.#rect_cnt--){
					case 0:
						this.adjust_rect();
						this.#rect_cnt = 3;
					break;
				}
				switch(this.#URA && isobj(this.#rect)){
					case true:
						this.#lrect.left = this.#rect.left;
						this.#lrect.right = this.#rect.right;
						this.#lrect.top = this.#rect.top;
						this.#lrect.bottom = this.#rect.bottom;
						this.#lrect.width = this.#rect.width;
						this.#lrect.height = this.#rect.height;
						this.#URA = false;
					break;
				}
			break;
			case true:
				switch(this.#DNURAC--){
					case 0:
						this.#DNURA = false;
						this.#DNURAC = 2;
					break;
				}
			break;
		}
		//drag and move event handling process
		this.DMEHP();
		//update all previous position in system_.psa
		this.UPSAA();
		//dirty rect rendering area caculation
		//this.DRRAC();
		this.set_mel(false);
	}
	//update end
}
//system_ class end
//system_ class static variable list
let sys_svl = ['TLIMIT','MMAXBIT','TMAXBIT','PMAXBIT',
	'mev_hex','tev_hex','pev_hex','evs',
	'pdown_','pmove_','pdrag_','pup_',
	'pleave_','pover_','penter_','pcancel_',
	'pdownwhitin_','pmovewithin_','pdragwithin_','pall_',
	'tdown_','tmove_','tdrag_','tup_',
	'tcancel_','mdown_','mmove_','mdrag_',
	'mup_','mout_','mwheel_','mcontextmenu_',
	'PSL','dfs','dlh','dhlc',
	'enucw','enlcw','kocw','vnac',
	'vnlcv','vnucv','DRPADD'];
for(let a = 0;a < sys_svl.length;a++){
	Object.defineProperty(system_, sys_svl[a], { writable: false, configurable: false });
}
//ime class start
//standard IME class
class ime_{
	static EN = true;
	static KO = Object.freeze({
		//keyCode based english alphabet(A~Z = 65~90) for korean
		keymap : Object.freeze([
			'r', 'R', 's', 'e', 'E', 'f', 'a', 'q', 'Q', 't',
			'T', 'd', 'w', 'W', 'c', 'z', 'x', 'v', 'g',
			'k', 'o', 'i', 'O', 'j', 'p', 'u', 'P', 'h', 'y',
			'n', 'b', 'm', 'l'
		]),
		//default character map : is can default input
		letter : Object.freeze([
			'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
			'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
			'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅛ',
			'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'
		]),
		//fisrt consonant map for input character comparing
		csnt: Object.freeze([
			'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
			'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
		]),
		//vowel map for input character comparing
		vowel:Object.freeze([
			'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
			'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ',
			'ㅣ'
		]),
		//consonant2 map for input character comparing
		csnt2:Object.freeze([
			'ㅤ', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
			'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
			'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
		]),
		//for korean
		//vowel set
		//[
		//	[vowel set area1],
		//	[vowel set area2],
		//	[vowel set area3]
		//]
		vset:Object.freeze([
			Object.freeze(['ㅏ', 'ㅐ', 'ㅣ']),
			Object.freeze(['ㅓ', 'ㅔ', 'ㅣ']),
			Object.freeze(['ㅣ'])
		]),
		//for korean
		//array structure for composed vowel
		//[
		//	[	//index 0 area is base vowel.
		//		[this vowel need to start to composition of vowel]
		//	],
		//	[	//index 1~n area is composed vowel.
		//		//matched vowel-set's index
		//		[composed vowel area1]
		//		[composed vowel area2]
		//		[composed vowel area3]
		//	]
		//]
		vowel_:Object.freeze([
			Object.freeze([
				Object.freeze(['ㅗ', 'ㅜ', 'ㅡ'])
			]),
			Object.freeze([
				Object.freeze(['ㅘ', 'ㅙ', 'ㅚ']),
				Object.freeze(['ㅝ', 'ㅞ', 'ㅟ']),
				Object.freeze(['ㅢ'])
			])
		]),
		//for korean
		//consonant2 set
		//[
		//	[consonant2 set area1],
		//	[consonant2 set area2],
		//	[consonant2 set area3],
		//	[consonant2 set area4]
		//]
		c2set:Object.freeze([
			Object.freeze(['ㅅ']),
			Object.freeze(['ㅈ', 'ㅎ']),
			Object.freeze(['ㄱ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅌ', 'ㅍ', 'ㅎ']),
			Object.freeze(['ㅅ'])
		]),
		//for korean
		//array structure for composed consonant2
		//[
		//	[	//index 0 area is base consonant2.
		//		[this consonant need to start to composition of consonant2]
		//	],
		//	[	//index 1~n area is composed consonant2.
		//		//matched consonant2-set's index
		//		[composed consonant2 area1]
		//		[composed consonant2 area2]
		//		[composed consonant2 area3]
		//		[composed consonant2 area4]
		//	]
		//]
		csnt2_:Object.freeze([
			Object.freeze([
				Object.freeze(['ㄱ', 'ㄴ', 'ㄹ', 'ㅂ'])
			]),
			Object.freeze([
				Object.freeze(['ㄳ']),
				Object.freeze(['ㄵ', 'ㄶ']),
				Object.freeze(['ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ']),
				Object.freeze(['ㅄ'])
			])
		])
	});
	static VN = Object.freeze({
		letter:Object.freeze([
			'b','c','d','g','h','k','l','m','n','p','q','r','s','t','v','x',
			'a','e','i','o','u','y',
			'w',
			's','f','r','x','j',
			'B','C','D','G','H','K','L','M','N','P','Q','R','S','T','V','X',
			'A','E','I','O','U','Y',
			'W',
			'S','F','R','X','J'
		]),
		//default consonants
		csnt:Object.freeze([
			'b','c','d','đ','g','h','k','l','m','n',
			'p','q','r','s','t','v','x','B','C','D',
			'Đ','G','H','K','L','M','N','P','Q','R',
			'S','T','V','X'
		]),
		//default vowel
		vowel:Object.freeze([
			'a','â','ă','e','ê','i','o','ô','ơ','u','ư','y',
			'A','Â','Ă','E','Ê','I','O','Ô','Ơ','U','Ư','Y'
		]),
		//NOTE : vietnamese has not consonant2 part
		//defualt vowel : one input complete
		//include default vowel : two input complete
		vset:Object.freeze([
			Object.freeze(['','a','w']),
			Object.freeze(['','e']),
			Object.freeze(['']),
			Object.freeze(['','o','w']),
			Object.freeze(['','w']),
			Object.freeze([''])
		]),
		vowel_:Object.freeze([
			Object.freeze([
				Object.freeze(['a','e','i','o','u','y']),
				Object.freeze(['A','E','I','O','U','Y'])
			]),
			Object.freeze([
				Object.freeze(['a','â','ă']),
				Object.freeze(['e','ê']),
				Object.freeze(['i']),
				Object.freeze(['o','ô','ơ']),
				Object.freeze(['u','ư']),
				Object.freeze(['y'])
			]),
			Object.freeze([
				Object.freeze(['A','Â','Ă']),
				Object.freeze(['E','Ê']),
				Object.freeze(['I']),
				Object.freeze(['O','Ô','Ơ']),
				Object.freeze(['U','Ư']),
				Object.freeze(['Y'])
			])
		]),
		//tone compose operation with vowel.
		//default rule
		//0 index : default tone input key-map
		//1 index: tone process for area 'a'
		//2 index: tone process for area 'e'
		//3 index: tone process for area 'i'
		//4 index: tone process for area 'o'
		//5 index: tone process for area 'u'
		//6 index: tone process for area 'y'
		tone:Object.freeze([
			'','s','f','r','x','j'
		]),
		tset:Object.freeze([
			Object.freeze(['','s','f','r','x','j'])
		]),
		tone_:Object.freeze([
			Object.freeze([
				Object.freeze(['a','â','ă','e','ê','i','o','ô','ơ','u','ư','y']),
				Object.freeze(['A','Â','Ă','E','Ê','I','O','Ô','Ơ','U','Ư','Y'])
			]),
			Object.freeze([
				Object.freeze(['a','à','á','ả','ã','ạ']),
				Object.freeze(['â','ầ','ấ','ẩ','ẫ','ậ']),
				Object.freeze(['ă','ằ','ắ','ẳ','ẵ','ặ']),
				Object.freeze(['e','è','é','ẻ','ẽ','ẹ']),
				Object.freeze(['ê','ề','ế','ể','ễ','ệ']),
				Object.freeze(['i','ì','í','ỉ','ĩ','ị']),
				Object.freeze(['o','ò','ó','ỏ','õ','ọ']),
				Object.freeze(['ô','ồ','ố','ổ','ỗ','ộ']),
				Object.freeze(['ơ','ờ','ớ','ở','ỡ','ợ']),
				Object.freeze(['u','ù','ú','ủ','ũ','ụ']),
				Object.freeze(['ư','ừ','ứ','ử','ữ','ự']),
				Object.freeze(['y','ỳ','ý','ỷ','ỹ','ỵ'])
			]),
			Object.freeze([
				Object.freeze(['A','À','Á','Ả','Ã','Ạ']),
				Object.freeze(['Â','Ầ','Ấ','Ẩ','Ẫ','Ậ']),
				Object.freeze(['Ă','Ằ','Ắ','Ẳ','Ẵ','Ặ']),
				Object.freeze(['E','È','É','Ẻ','Ẽ','Ẹ']),
				Object.freeze(['Ê','Ề','Ế','Ể','Ễ','Ệ']),
				Object.freeze(['I','Ì','Í','Ỉ','Ĩ','Ị']),
				Object.freeze(['O','Ò','Ó','Ỏ','Õ','Ọ']),
				Object.freeze(['Ô','Ồ','Ố','Ổ','Ỗ','Ộ']),
				Object.freeze(['Ơ','Ờ','Ớ','Ở','Ỡ','Ợ']),
				Object.freeze(['U','Ù','Ú','Ủ','Ũ','Ụ']),
				Object.freeze(['Ư','Ừ','Ứ','Ử','Ữ','Ự']),
				Object.freeze(['Y','Ỳ','Ý','Ỷ','Ỹ','Ỵ'])
			])
		])	
	});
	static eng = Object.freeze([
		65,66,67,68,69,70,71,72,73,74,75,76,77,
		78,79,80,81,82,83,84,85,86,87,88,89,90
	]);
	static spc = Object.freeze([
		48,49,50,51,52,53,54,55,56,57,	//1234567890
		186,							// ; :
		187,							// = +
		188,							// , <
		189,							// - _
		190,							// . >
		191,							// / ?
		192,							// ` ~
		219,							// [ {
		220,							// \ |
		221,							// ] }
		222								// ' "
	]);
	static npad = Object.freeze([
		96,97,98,99,100,101,102,103,104,105
	]);
	static spf = Object.freeze([
		8,				// Backspace
		9,				// Tab
		13,				// Enter
		16,				// Shift
		17,				// Ctrl

		18,				// Alt
		20,				// CapsLock
		27,				// Escape
		32,				// Space
		33,				// PageUp

		34,35,36,		// PageDown, End, Home
		37,38,			// Left, Up

		39,40,			// Right, Down
		45,46,			// Insert, Delete
		91,				// left-Meta

		92,				// right-Meta
		144,145,		// NumLock, ScrollLock
		21,299			// 한/영 키
	]);
	static F = Object.freeze([
		112,113,114,115,116,117,
		118,119,120,121,122,123
	]);
	static ibmc = Object.freeze([
		16,16,17,17,18,
		18,20,21,21,25,
		25,32,91,92,192,
		299
	]);
	static ibmh = Object.freeze([
		0x001,0x002,0x004,0x008,0x010,
		0x020,0x040,0x080,0x100,0x200,
		0x400,0x800,0x1000,0x2000,0x4000,
		0x8000
	]);
	static inime = Object.freeze({
		public:Object.freeze({
			lcsp:ime_.ibmh[2] | ime_.ibmh[11],
			rcsp:ime_.ibmh[3] | ime_.ibmh[11],
			lcls:ime_.ibmh[2] | ime_.ibmh[0],
			lcrs:ime_.ibmh[2] | ime_.ibmh[1],
			rcls:ime_.ibmh[3] | ime_.ibmh[0],
			rcrs:ime_.ibmh[3] | ime_.ibmh[1],
			m1sp:ime_.ibmh[12] | ime_.ibmh[11],
			m2sp:ime_.ibmh[13] | ime_.ibmh[11]
		}),
		ko:Object.freeze({
			ra:ime_.ibmh[5],
			ll1:ime_.ibmh[7],
			rl1:ime_.ibmh[8],
			ll2:ime_.ibmh[9],
			rl2:ime_.ibmh[10],
			ekk:ime_.ibmh[15]
		}),
		jp:Object.freeze({
			labq:ime_.ibmh[4] | ime_.ibmh[14],
			ll1:ime_.ibmh[7],
			rl1:ime_.ibmh[8],
			ll2:ime_.ibmh[9],
			rl2:ime_.ibmh[10]
		}),
		cn:Object.freeze({
			clsp:ime_.ibmh[6] | ime_.ibmh[11]
		})
	});
	//need to replace the blank character
	//remove invisible control characters and zero-width spaces
	static rbc = /[\x00\u0000-\u001F\u007F\u180E\u200B-\u200F\u2028\u2029\u2060\uFEFF]/g;
	//language in now ; selected language in now
	#linow;
	//counter for change_linow function
	#lincnt = 0;
	//language name array for IME 
	#lang_;
	//language map for IME
	#lmap;
	//if change the ime mode, this switch must be true.
	#ime_sw = false;
	//keeping on key inputs before keyup event
	#keep;
	//key input bit mask for IME ; for multi-language barrier
	//combined key input
	#imebm = 0;
	#rule;
	#sobj;
	//focused editable ui_'s #uid
	#feuid;
	#commit = '';
	#preedit = '';
	//consonant and vowel for all languages
	//consonant
	#c_;
	//vowel
	#v_;
	//consonant2
	#c2;
	#isr = false;
	//constructor start
	constructor(lang_set, sobj){
		//lang_set example
		//'en,ko,jp'
		//sobj : use to ui_ instance's string system_ object
		//console.log(lang_set)
		//console.log(sobj);
		let DATACHK = isstr(lang_set) && isobj(sobj);
		let RUN = true;
		switch(false){
			case DATACHK:
				//console.log(isstr(lang_set));
				//console.log(isobj(sobj));
				//console.log(DATACHK);
				console.warn('ime_.constructor failed;', lang_set, sobj);
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				//console.log('IME initialise processing');
				//language string setting : using separator ',' to split()
				this.#lang_ = lang_set.split(',');
				this.#linow = this.#lang_[this.#lincnt];
				this.#lmap = new Map();
				this.#lmap.set('keep',[]);
				//console.log(this.#lmap.get(this.#linow));
				//NOTE : ime_/#rule.letter is public part ; do not check of exists in normaly case.
				//if have not letter area, do not anything.
				//all ime process rule data check 'letter part' only
				let check, map;
				//if not have letter, do not ime processing.
				//just this.#lmap's this.#lang_[i] will be set the undefined data(blank data)
				let i, dummy;
				this.#sobj = sobj;
				this.#keep = this.#lmap.get('keep');
				this.#reset_cvc();
				this.kip = this.kip.bind(this);
				this.krp = this.krp.bind(this);
				this.public_input = this.public_input.bind(this);
				this.catch = this.catch.bind(this);
				this.release = this.release.bind(this);
			break;
		}
	}
	//constructor end
	//get_rbc start
	get_rbc(){
		return ime_.rbc;
	}
	//get_rbc end
	//load_ime start
	load_ime(lang){
		let result;
		switch(typeof lang){
			case 'string':
				switch(lang){
					case 'en':
					//complete alreay ; english is simple.
					//just commit one character or delete one character.
						result = true;
					break;
					case 'en2'://english with tone : europe??
					break;
					case 'ko':
						//korean is exceptional case...
						//korean not exists Upper/Lower-Case.
						//keymap need to keyboard mapping.
						result = Object.freeze({
							//keyCode based english alphabet(A~Z = 65~90) for korean
							keymap : Object.freeze([
								'r', 'R', 's', 'e', 'E', 'f', 'a', 'q', 'Q', 't',
								'T', 'd', 'w', 'W', 'c', 'z', 'x', 'v', 'g',
								'k', 'o', 'i', 'O', 'j', 'p', 'u', 'P', 'h', 'y',
								'n', 'b', 'm', 'l'
							]),
							//default character map : is can default input
							letter : Object.freeze([
								'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
								'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
								'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅛ',
								'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'
							]),
							//fisrt consonant map for input character comparing
							csnt: Object.freeze([
								'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
								'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
							]),
							//vowel map for input character comparing
							vowel:Object.freeze([
								'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
								'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ',
								'ㅣ'
							]),
							//consonant2 map for input character comparing
							csnt2:Object.freeze([
								'ㅤ', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
								'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
								'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
							]),
							//for korean
							//vowel set
							//[
							//	[vowel set area1],
							//	[vowel set area2],
							//	[vowel set area3]
							//]
							vset:Object.freeze([
								Object.freeze(['ㅏ', 'ㅐ', 'ㅣ']),
								Object.freeze(['ㅓ', 'ㅔ', 'ㅣ']),
								Object.freeze(['ㅣ'])
							]),
							//for korean
							//array structure for composed vowel
							//[
							//	[	//index 0 area is base vowel.
							//		[this vowel need to start to composition of vowel]
							//	],
							//	[	//index 1~n area is composed vowel.
							//		//matched vowel-set's index
							//		[composed vowel area1]
							//		[composed vowel area2]
							//		[composed vowel area3]
							//	]
							//]
							vowel_:Object.freeze([
								Object.freeze([
									Object.freeze(['ㅗ', 'ㅜ', 'ㅡ'])
								]),
								Object.freeze([
									Object.freeze(['ㅘ', 'ㅙ', 'ㅚ']),
									Object.freeze(['ㅝ', 'ㅞ', 'ㅟ']),
									Object.freeze(['ㅢ'])
								])
							]),
							//for korean
							//consonant2 set
							//[
							//	[consonant2 set area1],
							//	[consonant2 set area2],
							//	[consonant2 set area3],
							//	[consonant2 set area4]
							//]
							c2set:Object.freeze([
								Object.freeze(['ㅅ']),
								Object.freeze(['ㅈ', 'ㅎ']),
								Object.freeze(['ㄱ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅌ', 'ㅍ', 'ㅎ']),
								Object.freeze(['ㅅ'])
							]),
							//for korean
							//array structure for composed consonant2
							//[
							//	[	//index 0 area is base consonant2.
							//		[this consonant need to start to composition of consonant2]
							//	],
							//	[	//index 1~n area is composed consonant2.
							//		//matched consonant2-set's index
							//		[composed consonant2 area1]
							//		[composed consonant2 area2]
							//		[composed consonant2 area3]
							//		[composed consonant2 area4]
							//	]
							//]
							csnt2_:Object.freeze([
								Object.freeze([
									Object.freeze(['ㄱ', 'ㄴ', 'ㄹ', 'ㅂ'])
								]),
								Object.freeze([
									Object.freeze(['ㄳ']),
									Object.freeze(['ㄵ', 'ㄶ']),
									Object.freeze(['ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ']),
									Object.freeze(['ㅄ'])
								])
							])
						});
					break;
					case 'vn':
						result = Object.freeze({
							letter:Object.freeze([
								'b','c','d','g','h','k','l','m','n','p','q','r','s','t','v','x',
								'a','e','i','o','u','y',
								'w',
								's','f','r','x','j',
								'B','C','D','G','H','K','L','M','N','P','Q','R','S','T','V','X',
								'A','E','I','O','U','Y',
								'W',
								'S','F','R','X','J'
							]),
							//default consonants
							csnt:Object.freeze([
								'b','c','d','đ','g','h','k','l','m','n',
								'p','q','r','s','t','v','x','B','C','D',
								'Đ','G','H','K','L','M','N','P','Q','R',
								'S','T','V','X'
							]),
							//default vowel
							vowel:Object.freeze([
								'a','â','ă','e','ê','i','o','ô','ơ','u','ư','y',
								'A','Â','Ă','E','Ê','I','O','Ô','Ơ','U','Ư','Y'
							]),
							//NOTE : vietnamese has not consonant2 part
							//defualt vowel : one input complete
							//include default vowel : two input complete
							vset:Object.freeze([
								Object.freeze(['','a','w']),
								Object.freeze(['','e']),
								Object.freeze(['']),
								Object.freeze(['','o','w']),
								Object.freeze(['','w']),
								Object.freeze([''])
							]),
							vowel_:Object.freeze([
								Object.freeze([
									Object.freeze(['a','e','i','o','u','y']),
									Object.freeze(['A','E','I','O','U','Y'])
								]),
								Object.freeze([
									Object.freeze(['a','â','ă']),
									Object.freeze(['e','ê']),
									Object.freeze(['i']),
									Object.freeze(['o','ô','ơ']),
									Object.freeze(['u','ư']),
									Object.freeze(['y'])
								]),
								Object.freeze([
									Object.freeze(['A','Â','Ă']),
									Object.freeze(['E','Ê']),
									Object.freeze(['I']),
									Object.freeze(['O','Ô','Ơ']),
									Object.freeze(['U','Ư']),
									Object.freeze(['Y'])
								])
							]),
							//tone compose operation with vowel.
							//default rule
							//0 index : default tone input key-map
							//1 index: tone process for area 'a'
							//2 index: tone process for area 'e'
							//3 index: tone process for area 'i'
							//4 index: tone process for area 'o'
							//5 index: tone process for area 'u'
							//6 index: tone process for area 'y'
							tone:Object.freeze([
								'','s','f','r','x','j'
							]),
							tset:Object.freeze([
								Object.freeze(['','s','f','r','x','j'])
							]),
							tone_:Object.freeze([
								Object.freeze([
									Object.freeze(['a','â','ă','e','ê','i','o','ô','ơ','u','ư','y']),
									Object.freeze(['A','Â','Ă','E','Ê','I','O','Ô','Ơ','U','Ư','Y'])
								]),
								Object.freeze([
									Object.freeze(['a','à','á','ả','ã','ạ']),
									Object.freeze(['â','ầ','ấ','ẩ','ẫ','ậ']),
									Object.freeze(['ă','ằ','ắ','ẳ','ẵ','ặ']),
									Object.freeze(['e','è','é','ẻ','ẽ','ẹ']),
									Object.freeze(['ê','ề','ế','ể','ễ','ệ']),
									Object.freeze(['i','ì','í','ỉ','ĩ','ị']),
									Object.freeze(['o','ò','ó','ỏ','õ','ọ']),
									Object.freeze(['ô','ồ','ố','ổ','ỗ','ộ']),
									Object.freeze(['ơ','ờ','ớ','ở','ỡ','ợ']),
									Object.freeze(['u','ù','ú','ủ','ũ','ụ']),
									Object.freeze(['ư','ừ','ứ','ử','ữ','ự']),
									Object.freeze(['y','ỳ','ý','ỷ','ỹ','ỵ'])
								]),
								Object.freeze([
									Object.freeze(['A','À','Á','Ả','Ã','Ạ']),
									Object.freeze(['Â','Ầ','Ấ','Ẩ','Ẫ','Ậ']),
									Object.freeze(['Ă','Ằ','Ắ','Ẳ','Ẵ','Ặ']),
									Object.freeze(['E','È','É','Ẻ','Ẽ','Ẹ']),
									Object.freeze(['Ê','Ề','Ế','Ể','Ễ','Ệ']),
									Object.freeze(['I','Ì','Í','Ỉ','Ĩ','Ị']),
									Object.freeze(['O','Ò','Ó','Ỏ','Õ','Ọ']),
									Object.freeze(['Ô','Ồ','Ố','Ổ','Ỗ','Ộ']),
									Object.freeze(['Ơ','Ờ','Ớ','Ở','Ỡ','Ợ']),
									Object.freeze(['U','Ù','Ú','Ủ','Ũ','Ụ']),
									Object.freeze(['Ư','Ừ','Ứ','Ử','Ữ','Ự']),
									Object.freeze(['Y','Ỳ','Ý','Ỷ','Ỹ','Ỵ'])
								])
							])	
						});
					break;
					case 'jp':
					break;
					case 'cn':
					break;
					case 'th':
					break;
					default:
					break;
				}
			break;
		}
		return result;
	}
	//load_ime end
	//if public ime key
	//#is_pime start
	#is_pime(){
		let S1 = (this.#imebm & ime_.inime.public.lcsp) === ime_.inime.public.lcsp;
		let S2 = (this.#imebm & ime_.inime.public.rcsp) === ime_.inime.public.rcsp;
		let S3 = (this.#imebm & ime_.inime.public.lcls) === ime_.inime.public.lcls;
		let S4 = (this.#imebm & ime_.inime.public.lcrs) === ime_.inime.public.lcrs;
		let S5 = (this.#imebm & ime_.inime.public.rcls) === ime_.inime.public.rcls;
		let S6 = (this.#imebm & ime_.inime.public.rcrs) === ime_.inime.public.rcrs;
		let S7 = (this.#imebm & ime_.inime.public.m1sp) === ime_.inime.public.m1sp;
		let S8 = (this.#imebm & ime_.inime.public.m2sp) === ime_.inime.public.m2sp;
		let SALL = S1 || S2 || S3 || S4 || S5 || S6 || S7 || S8;
		let result = false;
		switch(true){
			case SALL:
				result = true;
			break;
		}
		return result;
	}
	//#is_pime end
	//#is_koime start
	#is_koime(){
		//console.log(this.#imebm.toString(2));
		let S1 = (this.#imebm & ime_.inime.ko.ra) > 0;
		let S2 = (this.#imebm & ime_.inime.ko.ll1) > 0;
		let S3 = (this.#imebm & ime_.inime.ko.rl1) > 0;
		let S4 = (this.#imebm & ime_.inime.ko.ll2) > 0;
		let S5 = (this.#imebm & ime_.inime.ko.rl2) > 0;
		let S6 = (this.#imebm & ime_.inime.ko.ekk) > 0;
		let SALL = S1 || S2 || S3 || S4 || S5 || S6;
		let result = false;
		switch(true){
			case SALL:
				result = true;
			break;
		}
		return result;
	}
	//#is_koime end
	//#is_jpime start
	#is_jpime(){
		let S1 = (this.#imebm & ime_.inime.jp.labq) === ime_.inime.jp.labq;
		let S2 = (this.#imebm & ime_.inime.jp.ll1) === ime_.inime.jp.ll1;
		let S3 = (this.#imebm & ime_.inime.jp.rl1) === ime_.inime.jp.rl1;
		let S4 = (this.#imebm & ime_.inime.jp.ll2) === ime_.inime.jp.ll2;
		let S5 = (this.#imebm & ime_.inime.jp.rl2) === ime_.inime.jp.rl2;
		let SALL = S1 || S2 || S3 || S4 || S5;
		let result = false;
		switch(true){
			case SALL:
				result = true;
			break;
		}
		return result;
	}
	//#is_jpime end
	//#is_cnime start
	#is_cnime(){
		let VAL = (this.#imebm & ime_.inime.cn.clsp) === ime_.inime.cn.clsp;
		let result = false;
		switch(true){
			case VAL:
				result = true;
			break;
		}
		return result;
	}
	//#is_cnime end
	//kip(Key Input Process) start
	kip(e){
		let DATACHK = isOInst(e,'ev');
		let RUN = true, iarr;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				switch(isstr(e.key)){
					case true:
						INPUT = false;
						iarr = [e.keyCode, e.location, (e.key).replace(ime_.rbc,'')];
						this.catch(iarr);
						this.public_input(iarr);
						switch(this.#isr){
							case false:
								this.#isr = true;
							break;
						}
					break;
				}
			break;
		}
	}
	//kip(Key Input Process) end
	//krp(Key Release Process) start
	krp(e){
		let DATACHK = isOInst(e,'ev');
		let RUN = true, iarr;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				switch(isstr(e.key)){
					case true:
						iarr = [e.keyCode, e.location, (e.key).replace(ime_.rbc,'')];
						this.release(iarr);
					break;
				}
			break;
		}		
	}
	//krp(Key Release Process) end
	//#indexs start
	//schar exists in the set?
	#indexs(schar, cat){
		let r = this.#rule;
		let DATACHK = isstr(schar) && isstr(cat) && isobj(r);
		let RUN = true;
		let i, j, result = false;

		switch(false){
		// The 1st consonant composition operation can be combined with the Shift key.
		// This library currently does not support smartphones; it is designed for PC first.
		// If you want to handle smartphones, you need to implement it yourself.
		// If `isobj(ime_.#rule)` is false or `DATACHK` is false, `RUN` will be set to false.
			case DATACHK:
				RUN = false;
			break;
		}
		let set, char, pidx, idxs, idxp, idx_, ma, LC, CASE, case_index;
		switch(RUN){
			case true:
				//console.log('schar = ' + schar);
				//console.log('cat = ' + cat);
				switch(cat){
					//consonant part
					//prepare another languages..
					case 'csnt':
					//c1set is not exists in now..
					break;
					//vowel part
					case 'vowel':
						set = r.vset;
						ma = r.vowel_;
						char = this.#v_;
					break;
					//consonant2 part
					case 'csnt2':
						set = r.c2set;
						ma = r.csnt2_;
						char = this.#c2;
					break;
					//tone part
					case 'tone':
						set = r.tset;
						ma = r.tone_;
						char = this.#v_;
					break;
				}
				schar = tlc(schar);
				LC = tlc(char);
				CASE = LC === char;
				switch(CASE){
					case true:
						case_index = 0;
					break;
					case false:
						case_index = 1;
					break;

				}
				//console.log('ma[0]['+ case_index +'] = ');
				//console.log(ma[0][case_index]);
				pidx = ma[0][case_index].indexOf(char);
				let VAL = pidx > -1;
				switch(VAL){
					case true:
						//console.log('pidx > -1');
						switch(cat){
							case 'csnt':
							//c1set is not exists in now..
							break;
							//vowel part
							case 'vowel':
							//consonant2 part
							case 'csnt2':
								j = set[pidx].indexOf(schar);
							break;
							//tone part
							case 'tone':
								j = set[0].indexOf(schar);
							break;
						}
						switch(true){
								case(j > -1):
								//console.log('! matched ! : set[' + i + '][' + j + '] = ' + set[i][j]);
								result = {bi:pidx, ci:j};
								i = set.length;
							break;
						}
					break;
					// A tone character and a vowel will be composed into a toned vowel.
					//
					// Conditions:
					// - `char` is neither a second consonant nor a vowel character.
					// - `char` is a tone character.
					// - `char` does not exist in mix_array[0][case_index].
					//
					// If all the above are true, proceed to the next process.
					case false:
						//console.log('pidx <= -1');
					break;
				}
			break;
		}
		//if schar not exists in the set,
		//return false;
		//if schar exists in the set,
		//return {bi:i, ri:j};
		//console.log('#indexs(' + schar + ', ' + cat + ') result = ');
		//console.log(result);
		return result;
	}
	//#indexs end
	//#indexp start
	//pre_input exists in the mix_array?
	#indexp(pre_input, cat){
		let r = this.#rule;
		let DATACHK = isstr(pre_input) && isstr(cat) && isobj(r);
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let i, j, CASE, ma, result = false;
		switch(RUN){
			case true:
				//comparing pre_input.toLowerCase() === pre_input
				CASE = tlc(pre_input) === pre_input;
				switch(CASE){
					case true://LowerCase
						i = 0;
					break;
					case false://UpperCase
						i = 1;
					break;
				}
				switch(true){
				case(cat === 'csnt' && Array.isArray(r.csnt_)):
					ma = r.csnt_;
				break;
				case(cat === 'vowel' && Array.isArray(r.vowel_)):
					ma = r.vowel_;
				break;
				case(cat === 'csnt2' && Array.isArray(r.csnt2_)):
					ma = r.csnt2_;
				break;
				case(cat === 'tone' && Array.isArray(r.tone_)):
					ma = r.tone_;
				break;
				}
				j = ma[0][i].indexOf(pre_input);
				switch(true){
					case(j > -1):
						//console.log(mix_array[0][i][j]);
						result = {bi:0, ci:i, ri:j};
					break;
				}
			break;
		}
		//if pre_input not exists in the mix_array[0]'s area,
		//return false;
		//if pre_input exists in the mix_array[0]'s area,
		//return {bi:0, ci:i, ri:j};
		return result;
	}
	//#indexp end
	//#index_ start
	//is char's index is where in the mix_array?
	//mix_array is one of the nexts in the ime_.#rule(this.linow !=== 'en')
	//tone / vowel
	#index_(char, cat){
		let r = this.#rule;
		let DATACHK = isstr(char) && isstr(cat) && isobj(r);
		let RUN = true, result = false;

		switch(false){
			case DATACHK:
				console.warn('DATACHK is failed', char, cat);
				RUN = false;
			break;
		}
		//console.log('char = ' + char + ', cat = ' + cat);
		switch(RUN){
			case true:
				let i, j, k, set, ma, sidx, VAL;
				//console.log(cat);
				switch(cat){
					case 'vowel':
						set = r.vset;
						ma = r.vowel_;
					break;
					case 'tone':
						set = r.tset;
						ma = r.tone_;
					break;
					case 'csnt2':
						set = r.c2set;
						ma = r.csnt2_;
					break;
				}
				sidx = this.#indexs(char, cat);
				VAL = isobj(sidx) && Number.isFinite(sidx.bi) && Number.isFinite(sidx.ci);
				switch(VAL){
					//if char is not exists in the set(mix_set),
					case false:
						//char index check in the ma(mix_array).
						//ma[0] part = base character area ; Lower/Upper Case area
						//ma[1~n] part = composed character set area 
						let VAL;
						switch(Array.isArray(ma)){
							case true:
								for(i = 1;i < ma.length;i++){
									for(j = 0;j < ma[i].length;j++){
										k = ma[i][j].indexOf(char);
										//console.log(ma[i][j]);
										VAL = k > -1;
										switch(true){
											case VAL:
												//console.log('ma[' + i + '][' +j + '][' + k + '] = ' + ma[i][j][k]);
												result = {bi:i, ci:j, ri:k};
												j = ma[i].length;
											break;
										}
									}
									switch(true){
										case(isbool(VAL) && k > -1):
											i = ma.length;
										break;
									}
								}
							break;
						}
					break;
					case true:
						result = sidx;
					break;
				}
			break;
		}
		//console.warn('#index_() result = ',result);
		return result;
	}
	//#index_ end
	//#is_set start
	//cat : category ; consonant, vowel, tone
	#is_set(char, cat){
		let DATACHK = isstr(char) && isstr(cat);
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				let temp = this.#indexs(char,cat);
				let VAL = isobj(temp);
				switch(true){
					case VAL:
						result = true;
					break;
				}
			break;
		}
		return result;
	}
	//#is_set end
	//is exists char in .#rule's letter?
	//#is_letter start
	#is_letter(char){
		let DATACHK = isstr(char);
		let RUN = true, result = -1;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				result = this.#rule.letter.indexOf(char) > -1;
			break;
		}
		return result;
	}
	//#is_letter end
	//#idx_ start
	#idx_(char, cat){
		let DATACHK = isstr(char) && isstr(cat);
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				let r = this.#rule;
				switch(cat){
					case 'csnt':
						result = r.csnt.indexOf(char);
					break;
					default:
						result = this.#index_(char, cat);
					break;
				}
			break;
		}
		//console.log('#idx()\'s result = ' + result);
		return result;
	}
	//#idx_ end
	//#is_ start
	#is_(char, cat){
		let r = this.#rule;
		let DATACHK = isstr(char) && isstr(cat) && isobj(r);
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let index, VAL, result = false;
		switch(RUN){
			case true:
				switch(true){
					case Object.hasOwn(r, cat):
						index = r[cat].indexOf(char);
					break;
				}
				VAL = Number.isFinite(index) && index > -1;
				switch(true){
					case VAL:
						result = true;
					break;
				}
			break;
		}
		return result;
	}
	//is_ end
	//is exists char in .#rule's cnst?
	//#is_cnst start
	#is_csnt(char){
		return this.#is_(char,'csnt');
	}
	//#is_cnst end
	//is exists char in .#rule's cnst?
	//#is_cnst start
	#is_csnt2(char){
		return this.#is_(char,'csnt2');
	}
	//#is_cnst end
	//#is_vowel start
	//is exists char in .#rule's vowel?
	#is_vowel(char){
		return this.#is_(char,'vowel');
	}
	//#is_vowel end
	//#is_tone start
	//is exists char in .#rule's tone?
	#is_tone(char){
		return this.#is_(char,'tone');
	}
	//#is_tone end
	//#is_toned_vowel start
	//is exists char in .#rule's tone?
	#is_toned_vowel(char){
		let info = this.#index_(char,'tone');
		return isobj(info) && info.bi > -1;
	}
	//#is_toned_vowel end
	//#reset_cvc start
	//reset consonant/vowel/consonant2 for korean 
	#reset_cvc(){
		this.#c_ = '';
		this.#v_ = '';
		this.#c2 = '';
	}
	//#reset_cvc end
	//#r_c_ start
	//reset consonant
	#r_c_(){
		this.#c_ = '';
	}
	//#r_c_ end
	//#r_v_ start
	//reset vowel
	#r_v_(){
		this.#v_ = '';
	}
	//#r_v_ end
	//is_spc start
	//is special character input?
	is_spc(kc){
		let DATACHK = Number.isFinite(kc);
		let result = false;
		switch(true){
			case DATACHK:
				result = ime_.spc.indexOf(kc) > -1 || ime_.F.indexOf(kc) > -1;
			break;
		}
		return result;
	}
	//is_spc end
	//is_spf start
	is_spf(kc){
		let DATACHK = Number.isFinite(kc);
		switch(true){
			case DATACHK:
			return ime_.spf.indexOf(kc) > -1;
		}
		return false;
	}
	//is_spf end
	//is_eng start
	is_eng(kc){
		//console.log(kc);
		let DATACHK = Number.isFinite(kc);
		switch(true){
			case DATACHK:
			return ime_.eng.indexOf(kc) > -1;
		}
		return false;
	}
	//is_eng end
	//shift_ start
	shift_(){
		return this.#keep.indexOf(ime_.spf[3]) > -1;
	}
	//shift_ end
	//get_isr start
	get_isr(){
		return this.#isr;
	}
	//get_isr end
	//set_isr start
	set_isr(bool){
		this.#isr = !!bool;
	}
	//set_isr end
	//mix_ start
	//mix the character ; if dismatch, just return false;
	//pre_input : consonant OR vowel
	//char : input character of current
	//mix_set :
	//[
	//	[character input of current{data set of array(s)}]
	//]
	//mix_array :
	//[
	//	[
	//		[BASE OF LETTER(consonant / vowel)]
	//	],
	//	[
	//		[COMPOSED LETTERS(Array for each BASE OF LETTER)]
	//	]
	//] 
	mix_(pre_input, char, cat){
		let r = this.#rule;
		let DATACHK = isstr(pre_input) && isstr(char) && isobj(r) && isstr(cat);
		let RUN, RUN2, RUN3, RUN4, RUN5, result = false;
		RUN = RUN2 = RUN3 = RUN4 = RUN5 = true;
		switch(false){
			//if catch the exception of variable initialise, return false; do not process ; get out!
			case DATACHK:
				console.warn('missing correct parameter in mix_', pre_input, char, cat);
				RUN = false;
			break
		}
		let temp, compare, pi, set, ma;
		let h, i, j, k, l, m, n, mix;
		switch(RUN){
			case true:
				//console.log('pre_input = ' + pre_input);
				//console.log('char = ' + char);
				//console.log(cat);
				pi = pre_input;
				switch(cat){
					//prepare to another language barrier
					case 'csnt':
					//do not anything in now
					break;
					case 'csnt2':
						set = r.c2set;
						ma = r.csnt2_;
					break;
					case 'vowel':
						set = r.vset;
						ma = r.vowel_;
					break;
					case 'tone':
						set = r.tset;
						ma = r.tone_;
					break;
				}
				//console.log(set);
				//console.log(ma);
				temp = this.#indexp(pi, cat);
				//console.log(temp);
				let VAL = isobj(temp);
				switch(VAL){
					case false:
						//console.log('mix_ 1st failed');
						RUN2 = false;
					break;
					case true:
						i = temp.bi;
						j = temp.ci;
						k = temp.ri;
					break;
				}
			break;
		}
		let S01 = RUN && RUN2;
		switch(S01){
			case true:
				//console.log('i = ' + i + ', j = ' + j + ', k = ' + k);
				temp = this.#indexs(tlc(char), cat);
				//console.log(temp);
				let VAL2 = isobj(temp);
				switch(VAL2){
					case false:
						//console.log('mix_ 2nd failed');
						RUN3 = false;
					break;
					case true:
						m = temp.bi;
						n = temp.ci;
					break;
				}
			break;
		}
		let S02 = S01 && RUN3;
		switch(S02){
			case true:
				compare = tlc(pre_input);
				let VAL3 = compare === pre_input;
				switch(this.#linow){
					case 'ko':
						l = i + 1;
					break;
					default:
						switch(VAL3){
							case true://LowerCase
								l = i + 1;
							break;
							case false://UpperCase
								l = i + 2;
							break;
						}
					break;
				}
				let VAL4 = i + l <= ma.length - 1 && i + l > -1;
				switch(false){
					case VAL4:
						//console.log('mix_ 3rd failed');
						RUN4 = false;
					break;
				}
			break;
		}
		let S03 = S02 && RUN4;
		switch(S03){
			case true:
				//console.log('l = ' + l + ', m = ' + m + ', n = ' + n);
				//l = pre_input's index in the mix_array[0] Lower/Upper-Case
				//m = char(input of current)'s column index in the mix_set
				//n = char(input of current)'s row index in the mix_set
				//console.log(ma[l]);
				//console.log(ma[l][m]);
				//console.log(ma[l][m][n]);
				let VAL5 = Array.isArray(ma[l]) && Array.isArray(ma[l][m]) && isstr(ma[l][m][n]);
				switch(false){
					case VAL5:
						//console.log('mix_ 4th failed');
						RUN5 = false;
					break;
				}
			break;
		}
		let S04 = S03 && RUN5;
		switch(S04){
			case true:
				mix = ma[l][m][n];
				let VAL6 = isstr(mix);
				switch(true){
					case VAL6:
						result = mix.replace(ime_.rbc, "");
					break;
				}
			break;
		}
		return result;
	}
	//mix_ end
	//mix_vowel start
	//mix up the vowel
	mix_vowel(char){
		let DATACHK = isstr(char);
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				let r = this.#rule;
				result = this.mix_(this.#v_, char, 'vowel');
			break;
		}
		return result;
	}
	//mix_vowel end
	//mix_c2 start
	//mix up the consonant2
	mix_csnt2(char){
		let DATACHK = isstr(char);
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				let r = this.#rule;
				result = this.mix_(this.#c2, char, 'csnt2');
			break;
		}
		return result;
	}
	//mix_c2 end
	//is_mix_str start
	//is mixed character?
	//
	//look up the mix_array.
	//
	//if not exists, return false;
	//
	//if exists, return mix_array[1]'s index
	//and matched character's index
	//
	//two indexes needs split the character
	is_mix_str(char, cat){
		let r = this.#rule;
		let DATACHK = isstr(char) && isstr(cat) && isobj(r);
		let RUN = true, result = false;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				//console.log('mix_array = ', mix_array);
				//console.log('string = ', string);
				let temp = this.#index_(char, cat);
				//if temporority data's type is object,
				//if not includes -1 index. ; is safe data.
				//Data integrity is maintained
				let VAL = isobj(temp) && (this.#is_csnt2(char) || this.#is_vowel(char));
				switch(true){
					case VAL:
						result = {bi:temp.bi, ci:temp.ci, ri:temp.ri};
					break;
				}
			break;
		}
		//temporority data is unsafe. return false
		//false means do not rall-back compose it.
		//char = default consonant or vowel.
		return result;
	}
	//is_mix_str end
	//get_ilnow start
	get_ilnow(){
		return this.#linow;
	}
	//get_ilnow end
	//#change_linow start
	//change the language of ime process
	#change_linow(){
		//console.log('is pressed ko/en key? ' + this.#is_koime());
		//console.log(this.#keep);
		let lin = this.#linow;
		let LANGVAL = this.#is_pime()
			|| (lin !== 'ko' && this.#is_koime())
			|| (lin !== 'jp' && this.#is_jpime())
			|| (lin !== 'cn' && this.#is_cnime());
		//console.log('LANGVAL = ' + LANGVAL);
		switch(true){
			case this.#ime_sw:
				this.#ime_sw = false;
			break;
			case LANGVAL:
				//console.log('if exists LANGVAL');
				//console.log(this.#keep);
				this.#ime_sw = true;
				this.#lincnt++;
				lin = this.#lang_[(this.#lincnt % this.#lang_.length)];
				//this.#ldiv.textContent = lin.toUpperCase();
				//console.log('ime_.this.#linow = ' + this.#linow);
				this.#rule = this[lin.toUpperCase()];
				this.#linow = lin;
			break;
		}
	}
	//#change_linow end
	//#set_bmi start
	// Build BMI (Base Map Index) from key code and location index
	#set_bmi(kc, loc){
		let DATACHK = Number.isFinite(kc) && Number.isFinite(loc);
		//result can catch exceptional case. (-1)
		let RUN = true, result = -1;
		//data validation check
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		//keyCode base key mapping index calculation
		switch(RUN){
			case true:
				result = ime_.ibmc.indexOf(kc) + this.#loc_sw(loc);
				//console.log('DATACHK = ' + DATACHK);
				//console.log('result = ' + result);
			break;
		}
		return result;
	}
	//#set_bmi end
	//#loc_sw start
	//event location switch
	#loc_sw(loc){
		let DATACHK = Number.isFinite(loc);
		let RUN = true, result = 0;
		//data validation check
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		//location index process
		switch(RUN){
			case true:
				switch(loc){
					// case 1: result = 0; // omitted (default)
					case 2:
						result = 1;
					break;
					case 3:
						result = 2;
					break;
					// default: result = 0; // omitted (default)
				}
			break;
		}
		return result;
	}
	//#loc_sw end
	//#set_bm start
	#set_bm(bit){
		let DATACHK = Number.isFinite(bit), RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				//console.log(bit.toString(2));
				this.#imebm |= bit;
			break;
		}
	}
	//#set_bm end
	//catch start
	//if keydown event fired, this.#keep chatch the e.key's 'string'
	catch(iarr){
		let DATACHK = Array.isArray(iarr);
		let RUN = true;
		switch(false){
			//if none-validate input, return false;
			case DATACHK:
				RUN = false;
			break;
		}
		let index;
		switch(RUN){
			case true:
				let index = this.#keep.indexOf(iarr[0]), index2;
				//console.log(iarr);
				switch(index){
					case -1:
						this.#keep.push(iarr[0]);
						//console.log(this.#keep);
						index2 = ime_.ibmc.indexOf(iarr[0]);
						switch(true){
							case(index2 > -1):
								this.#set_bm(ime_.ibmh[this.#set_bmi(iarr[0], iarr[1])]);
							break;
						}
					break;
				}
			break;
		}
		return false;
	}
	//catch end
	//release start
	//if keyup event fired, this.#keep release the e.key's 'string'
	release(iarr){
		let DATACHK = Array.isArray(iarr);
		let RUN = true;
		switch(false){
			//if none-validate input, RUN = false;
			case DATACHK:
				RUN = false;
			break;
		}
		let index, result = false;
		//NOTE:if you need to catch exception case. and error handling,
		//that is your freedom, but... that ways can not be light-weight.
		//i want to say you... that is need to 'exceptional handling', just do process.
		//but... it is NOT 'MUST BE', do not additional process.
		switch(RUN){
			case true:
				index = this.#keep.indexOf(iarr[0]);
				//console.log(index);
				switch(true){
					//index === -1 case has deleted ; it was just [ return false ];
					case(index > -1):
						this.#keep.splice(index, 1);
						switch(true){
							case(ime_.ibmc.indexOf(iarr[0]) > -1):
								this.#imebm &= ~ime_.ibmh[this.#set_bmi(iarr[0], iarr[1])];
								this.#ime_sw = false;
							break;
						}
					break;
				}
			break;
		}
		//console.log(this.#keep);
		//console.log(this.#ime_sw);
		return false;
	}
	//release end
	//#set_commit start
	//get string from focused ui_ instance
	#set_commit(char){
		let DATACHK = isstr2(char);
		let RUN = true;
		switch(false){
			//if none-validate input, return false;
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				//if not exists any editable ui_ instance, just return false;
				this.#commit = char.replace(ime_.rbc, "");
			break;
		}
	}
	//#set_commit end
	//#add_char start
	#add_char(char){
		let DATACHK = isstr(char);
		let RUN = true;
		switch(false){
			//if none-validate input, return false;
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#commit += char.replace(ime_.rbc, "");
			break;
		}
	}
	//#add_char end
	//get_commit start
	get_commit(){
		return this.#commit;
	}
	//get_commit end
	//#set_preedit start
	#set_preedit(char){
		//console.log(char);
		let DATACHK = isstr2(char);
		let RUN = true;
		switch(false){
			//if none-validate input, return false;
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				//this.#sobj.preedit = char;
				this.#preedit = char.replace(ime_.rbc, "");
			break;
		}
	}
	//#set_preedit end
	//get_preedit start
	get_preedit(){
		//return this.#preedit;
		return this.#preedit;
	}
	//get_preedit end
	//#set_commit_preedit start
	#set_commit_preedit(commit_, preedit_){
		let DATACHK = isstr(commit_) || isstr(preedit_);
		let RUN = true;
		switch(false){
			//if none-validate input, return false;
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#add_char(commit_);
				this.#set_preedit(preedit_);
			break;
		}
	}
	//#set_commit_preedit end
	//bs_del start
	//one character delete function
	//delete start index : dsi
	//remain string index : rsi
	bs_del(dsi){
		let DATACHK = isstr(this.#commit) && this.#commit.length > 0 && Number.isFinite(dsi);
		let RUN = true, result = '';
		switch(false){
			//if none-validate input, return false;
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				//console.log(dsi);
				//strf : string for front part
				//strr : string for rear part
				let strf, strr;
				let VAL = dsi < this.#commit.length;
				let VAL2 = dsi === this.#commit.length;
				let VAL5 = this.#commit.length === 1;
				switch(true){
					case VAL:
						strf = this.#commit.slice(0, dsi);
						//one character has deleted(is not delete in instantly)
						let rsi = dsi + 1;
						let VAL3 = rsi > this.#commit.length;
						let VAL4 = rsi <= this.#commit.length;
						//console.log('dsi = ' + dsi + ', rsi = ' + rsi);
						switch(true){
							//if rsi's value >= this.#commit.length - 1, do not anything return false;
							case VAL3:
								result = strf;
							break;
							//if rsi's value <= this.#commit.length - 2, do slice the .#commit
							case VAL4:
								strr = this.#commit.slice(rsi, this.#commit.length);
								result = strf + strr;
							break;
						}
					break;
					case VAL5:
						result = '';
					break;
					case VAL2:
						result = this.#commit.slice(0, dsi);
					break;
				}
			break;
		}
		return result;
	}
	//bs_del end
	//#rb_composition start
	//roll-back compotision function
	//this function for preedit(just one character only)
	//reason is why? string(length > 1) is must be check in syetem_ instance.
	//system_ instance must be provide the data.
	//data :
	//focused editable_ui_ instance's current cursor position from HTML5 <canvas>.
	//selected area from HTML5 <canvas>.
	//
	//NOTE : ime_/#rule.letter is public part ; do not check of exists in normaly case.
	//if have not letter area, do not anything.
	#rb_composition(){
		//NOTE : ime_/#rule.letter is public part ; do not check of exists in normaly case.
		//if have not letter area, do not anything.
		let r = this.#rule;
				
		let EN = this.#linow === 'en';
		let PUBLIC = isobj(r) && Array.isArray(r.csnt)
			&& Array.isArray(r.vset) && Array.isArray(r.vowel) && Array.isArray(r.vowel_);
		let IME = !EN && PUBLIC;
		//console.log(this);
		switch(true){
			case EN:
				this.#set_commit(this.bs_del(this.#commit.length - 1));
				this.#reset_cvc();
			break;
			case IME:
				let NV = this.#v_ === '';
				let NC = this.#c_ === '';
				let NC2 = this.#c2 === '';
				let c_, c2_, v_, t_;
				let C_, VO, C2, TO, T_, CSNT2, TONE;
				switch(Array.isArray(r.csnt)){
					case true:
						c_ = r.csnt;
						C_ = this.#is_csnt(this.#c_);
					break;
				}
				switch(Array.isArray(r.csnt2_)){
					case true:
						c2_ = r.csnt2_;
						C2 = this.#is_csnt2(this.#c2);
					break;
				}
				switch(Array.isArray(r.vowel_)){
					case true:
						v_ = r.vowel_;
						VO = this.#is_vowel(this.#v_);
					break;
				}
				switch(Array.isArray(r.tone_)){
					case true:
						t_ = r.tone_;
						TO = this.#index_(this.#v_,'tone');
						T_ = this.#is_toned_vowel(this.#v_) && !this.#is_vowel(this.#v_);
					break;
				}

				//default language rule check
				//2nd consonant rule check
				CSNT2 = Array.isArray(r.c2set) && Array.isArray(r.csnt2) && Array.isArray(r.csnt2_);
				//tone rule check
				TONE = Array.isArray(r.tset) && Array.isArray(r.tone) && Array.isArray(r.tone_);

				//korean rule check
				let KO = this.#linow === 'ko' && PUBLIC && CSNT2;
				
				let temp, temp2;

				switch(true){
					//korean part start
					case KO:
						//#c2 is validate
						let RMVC2 = !NC2;
						//#v_, #c2 is validate
						let RMVVO = !NV && NC2;
						//#f is validate. and #v_, #c2 is not validate
						let RMVC1 = !NC && NV && NC2;
						//#c_, #v_, #c2 is not validate
						//and preedit is not validate and commit is validate
						let RMVCOM = NC && NV && NC2
							&& this.#preedit === '' && isstr2(this.#commit);
						switch(true){
							case RMVC2:
								//if you press BS, this.#c2 is composed?
								temp = this.is_mix_str(this.#c2, 'csnt2');
								//console.log('#rb_composition() temp = ')
								//console.log(temp);
								let S01 = temp === false;
								let S02 = isobj(temp) && temp.bi > 0;
								switch(true){
									//if this.#c2 is not composed character.
									case S01 || !S02:
										//remove consonant2
										this.#c2 = '';
									break;
									//if this.#c2 is compesed character,
									//remove thrid consonant's second input consonant.
									case S02:
										this.#c2 = c2_[0][0][temp.ci];
									break;
								}
							break;
							//consonant2 remove part end
							//vowel remove part start
							case RMVVO:
								temp = this.is_mix_str(this.#v_, 'vowel');
								let S03 = temp === false;
								let S04 = isobj(temp);
								switch(true){
									case S03:
										this.#v_ = '';
									break;
									case S04:
										this.#v_ = v_[0][0][temp.ci];
									break;
								}
							break;
							//vowel remove part end
							//consonant remove part start
							case RMVC1:
								this.#reset_cvc();
								this.#set_preedit('');
							break;
							//consonant remove part end
							//start one character remove part of commited string
							case RMVCOM:
								this.#set_commit(this.bs_del(this.#commit.length - 1));
							break;
							//end one character remove part of commited
						}
					break;
					//korean part end
					//if this.#rule is available completed-tone compose data set,
					//try roll-back composition process.
					case PUBLIC:
						//console.log('PUBLIC = ' + PUBLIC);
						let LOCK = false;
						let compare = tlc(this.#v_) === this.#v_;
						let case_;
						switch(compare){
							//LowerCase
							case true:
								case_ = 0;
							break;
							//UpperCase
							case false:
								case_ = 1;
							break;
						}
						//console.log(case_);
						//vietnamese rule check
						let VN = this.#linow === 'vn' && PUBLIC && TONE;
						switch(true){
							//toned vowel roll-back process
							case T_:
								//console.log('PUBLIC TONED VOWEL PART');
								switch(false){
									//public toned vowel roll-back process
									case LOCK:
										this.#v_ = t_[0][case_][TO.ci];
									break;
								}
							break;
							//(composed) vowel roll-back process
							case VO:
								//console.log('PUBILC VOWEL PART');
								switch(false){
									case LOCK:
										temp = this.#index_(this.#v_,'vowel');
										temp2 = this.#indexp(this.#v_,'vowel');
										let TCHK = isobj(temp);
										let TPCHK = isobj(temp2);
										let PVS01 = !TPCHK && TCHK;
										let PVS02 = TPCHK && TCHK;
										switch(true){
											case PVS01:
												//console.log('isobj(TCHK) === true');
												this.#v_ = v_[0][case_][temp.ci];
											break;
											case PVS02:
												//console.log('isobj(TCHK) === false');
												this.#reset_cvc();
											break;
										}
									break;
								}
							break;
							//consonant roll-back process
							case C_:
								//console.log('PUBLIC CONSONANT PART');
								switch(true){
									case VN:
										//console.log('VN = ' + VN);
										//vietnamese exceptional consonant handling part start
										let Cd_ = this.#c_ === r.csnt[3];
										let CD_ = this.#c_ === r.csnt[20];
										switch(true){
											case Cd_:
												//console.log(r.csnt[3] + ' -> d');
												this.#c_ = 'd';
												LOCK = true;
											break;
											case CD_:
												//console.log(r.csnt[20] + ' -> D');
												this.#c_ = 'D';
												LOCK = true;
											break;
										}
									break;
								}
								switch(false){
									//default consonant reset ; delete
									case LOCK:
										this.#reset_cvc();
									break;
								}
							break;
						}
					break;

				}
			break;
		}
		this.#set_preedit(this.#composition());
	}
	//#rb_composition end
	//#composition start
	//compose all character with preedit
	//#composition function will process case by case
	#composition(){
		//caching .#rule
		let r = this.#rule;
		//normal english language barrier
		let EN = this.#linow === 'en';
		//korean is it now?
		let KO = this.#linow === 'ko';
		//vietnamese is it now?
		let VN = this.#linow === 'vn';
		//first character(consonant) index
		//second character(vowel) index
		//third character(consonant2) index
		//for korean in now <--
		let fi, si, ti;
		switch(false){
			case EN:
			break;
		}
		let RUN = true, result = '';
		switch(true){
			//just commit process.
			//so, do not any process in .#composition function.
			case EN:
			break;
			case KO:
				//additional let variable ; statement pre-calculation - cached;
				let NC = this.#c_ === '';
				let NV = this.#v_ === '';
				let NC2 = this.#c2 === '';
				let S01 = NC && NV && NC2;
				//console.log('first : ', this.#f);
				//console.log('second : ', this.#s);
				//console.log('third : ', this.#c2);
				switch(true){
					case S01:
						result = '';
						RUN = false;
					break;
				}
				switch(RUN){
					case true:
						switch(true){
							case !NC:
								fi = r.csnt.indexOf(this.#c_);
								//console.log('first character : ' + this.#f + ', fi = ' + fi);
							break;
						}
						switch(true){
							case !NV:
								si = r.vowel.indexOf(this.#v_);
								//console.log('second character : ', this.#s + ', si = ' + si);
							break;
						}
						switch(true){
							case !NC2:
								ti = r.csnt2.indexOf(this.#c2);
								//console.log('third character : ', this.#c2 + ', ti = ' + ti);
							break;
						}
						//korean index checking
						let VFI = Number.isFinite(fi);
						let VSI = Number.isFinite(si);
						let VTI = Number.isFinite(ti);
						//console.log('this.#c_ = \'' + this.#f + '\', this.#v_ = \'' + this.#s + '\', this.#c2 = \'' + this.#c2 + '\'');
						//sconsole.log('fi = ' + fi + ', si = ' + si + ', ti = ' + ti);
						let syllable;
						//console.log(typeof fi, typeof si, typeof ti);
						switch(true){
							//if failed get any consonant, return false
							case(!VFI && !VSI && !VTI):
								result = '';
							break;
							//if get the consonant only, return default consonant[fi]
							case(VFI && fi > -1 && !VSI && !VTI):
								result = r.csnt[fi];
							break;
							//if get the vowel only, return default vowel[si]
							case(!VFI && VSI && si > -1 && !VTI):
								result = r.vowel[si];
							break;
							//if get the consonant and vowel only, set the syllable charCode
							case(VFI && fi > -1 && VSI && si > -1 && !VTI):
								syllable = 0xac00 + ((fi * 21) + si) * 28;
							break;
							//if get the consonant2 only, return default consonant2[ti]
							case(!VFI && !VSI && VTI && ti > -1):
								result = r.csnt2[ti];
							break;
							//if complete the character, set the syllable charCode
							case(VFI && fi > -1 && VSI && si > -1 && VTI && ti > -1):
								syllable = 0xac00 + (((fi * 21) + si) * 28) + ti;
							break;
						}
						//console.log('syllable : ', syllable, String.fromCharCode(syllable));

						//replace 0-width string from String.fromCharCode(syllable)
						switch(true){
							case Number.isFinite(syllable):
								result = String.fromCharCode(syllable).replace(ime_.rbc, "");
							break;
						}
					break;
				}
			break;
			case VN:
				let VC = this.#c_ !== '';
				let VV = this.#v_ !== '';
				switch(true){
					case VC:
						//console.log('consonant output');
						result = this.#c_;
					break;
					case VV:
						//console.log('vowel output');
						result = this.#v_;
					break;
				}
			break;
		}
		return result;
	}
	//#composition end
	//public_input start
	//public input function for key event
	public_input(iarr){
		let DATACHK = Array.isArray(iarr);
		let RUN, RUN2, RUN3;
		RUN = RUN2 = RUN3 = true;
		switch(false){
			//if none-validate input, RUN = false;
			case DATACHK:
				RUN = false;
			break;
		}
		let kc, loc, key, EN, ENKEY, SPC, SPF, SPCORSPF, ENINPUT, IMEINPUT;
		let temp, temp2, char, mix_s, mix_t, i, j, k, l, bmi;
		//default input part
		switch(RUN){
			case true:
				//console.log(iarr);
				//console.log(DATACHK);
				kc = iarr[0];
				loc = iarr[1]
				key = iarr[2];
				//console.log(kc + ', ' + loc + ', ' + key);

				EN = this.#linow === 'en';
				ENKEY = this.is_eng(kc);
				SPC = this.is_spc(kc);
				SPF = this.is_spf(kc);
				SPCORSPF = SPC || SPF;
				ENINPUT = EN && ENKEY;
				IMEINPUT = ENKEY;
				//console.log('pure english input ? ' + ENINPUT);

				//console.log(iarr);
				//console.log('ENKEY = ' + ENKEY);
				switch(true){
					//if user input the 'number', 'default special character', 'special function key', 
					//only commit and no preedit
					case SPCORSPF:
						//console.log('special character and function key part');
						bmi = this.#set_bmi(kc, loc);
						//console.log('bmi = ' + bmi + ', keyCode = ' + kc);
						switch(kc){
							case ime_.spc[0]:			//1
							case ime_.spc[1]:			//2
							case ime_.spc[2]:			//3
							case ime_.spc[3]:			//4
							case ime_.spc[4]:			//5
							case ime_.spc[5]:			//6
							case ime_.spc[6]:			//7
							case ime_.spc[7]:			//8
							case ime_.spc[8]:			//9
							case ime_.spc[9]:			//0
							case ime_.spc[10]:			//\;
							case ime_.spc[11]:			//\=
							case ime_.spc[12]:			//\,
							case ime_.spc[13]:			//\-
							case ime_.spc[14]:			//\.
							case ime_.spc[15]:			//\/
							case ime_.spc[17]:			//\[
							case ime_.spc[18]:			//\\
							case ime_.spc[19]:			//\]
							case ime_.spc[20]:			//\'
								this.#add_char(this.#composition() + key);
								this.#reset_cvc();
								this.#set_preedit('');
							break;
							case ime_.spc[16]:			//\`
								this.#set_bm(ime_.ibmh[bmi]);
								this.#reset_cvc();
								this.#change_linow();
							break;
							case ime_.spf[3]:			//Shift
							case ime_.spf[4]:			//Control
							case ime_.spf[5]:			//Alt
							case ime_.spf[6]:			//CapsLock
								this.#set_bm(ime_.ibmh[bmi]);
								this.#change_linow();
							break;
							//if press the IME process key(to ????)
							//commit character.
							case ime_.spf[19]:			//Meta 키
							case ime_.spf[20]:			//Meta 키
							case ime_.spf[23]:			//한/영 키
								//console.log('ime mode change');
								this.#set_bm(ime_.ibmh[bmi]);
								this.#reset_cvc();
								this.#change_linow();
							break;					//if press Spacebar, commit character and ' '. and reset
							case ime_.spf[8]:			//' '
								this.#add_char(this.#composition() + ' ');
								this.#set_bm(ime_.ibmh[bmi]);
								this.#reset_cvc();
								this.#change_linow();
								this.#set_preedit('');
							break;
							case ime_.spf[0]: //Backspace
								//console.log('BackSpace key pressed');
								this.#rb_composition();
							break;
							case ime_.spf[1]:			//Tab
								this.#add_char(this.#composition());
								this.#reset_cvc();
								this.#add_char('\t');
								this.#set_preedit('');
							break;
							case ime_.spf[2]:			//Enter
								this.#add_char(this.#composition() + '\n');
								this.#reset_cvc();
								this.#set_preedit('');
							break;
							//do not any effect ; just preeditthis.#set_preedit(this.#composition());
							//if press the 'Esc', forced finish of compese the character.
							//commit the character. and reset.
							case ime_.spf[7]: //Escape
								this.#add_char(this.#composition());
								this.#reset_cvc();
								this.#set_preedit('');
							break;
							case ime_.spf[9]: //PageUp
							case ime_.spf[10]: //PageDown
							case ime_.spf[11]: //End
							case ime_.spf[12]: //Home
							case ime_.spf[13]: //ArrowLeft
							case ime_.spf[14]: //ArrowUp
							case ime_.spf[15]: //ArrowRight
							case ime_.spf[16]: //ArrowDown
							case ime_.spf[17]: //Insert
							case ime_.spf[18]: //Delete
							case ime_.spf[21]: //NumLock
							case ime_.spf[22]: //ScrollLock
							case ime_.F[0]: //F1
							case ime_.F[1]: //F2
							case ime_.F[2]: //F3
							case ime_.F[3]: //F4
							case ime_.F[4]: //F5
							case ime_.F[5]: //F6
							case ime_.F[6]: //F7
							case ime_.F[7]: //F8
							case ime_.F[8]: //F9
							case ime_.F[9]: //F10
							case ime_.F[10]: //F11
							case ime_.F[11]: //F12
							break;
						}
					break;
					//if input the pure english
					case ENINPUT:
						//console.log('! english !');
						this.#set_commit_preedit(key,'');
					break;
				}
				switch(false){
					case IMEINPUT:
						RUN2 = false;
					break;
				}
			break;
		}
		let S01 = RUN && RUN2;
		//if input translate from IME system.
		//variable setting part
		let r, km, KMCHK, c1, vo, vs, v_, C_, NC, VO, VS, V_, NV;
		let C1CHK, VOCHK, VSCHK, V_CHK, RULE, PUBINPUT, KO, KOINPUT;
		let c2, c2s, c2_, C2S, C2, C2_, NC2, C2CHK, C2SCHK, C2_CHK, CSNT2;
		let to, ts, t_, TO, TS, T_, TSCHK, T_CHK, TONE;
		switch(S01){
			case true:
				//console.log(this.#rule);
				r = this.#rule;
				switch(true){
					case(isobj(r)):
						switch(true){
							case(Array.isArray(r.keymap)):
								km = r.keymap;
								KMCHK = Array.isArray(km);
							break;
						}
						//public rule part
						c1 = r.csnt;
						vo = r.vowel;
						vs = r.vset;
						v_ = r.vowel_;
						C_ = this.#is_csnt(key);
						NC = this.#c_ === '';
						VO = this.#is_vowel(key);
						VS = this.#is_set(key, 'vowel');
						V_ = false;
						NV = this.#v_ === '';
						C1CHK = Array.isArray(c1);
						VOCHK = Array.isArray(vo);
						VSCHK = Array.isArray(vs);
						V_CHK = Array.isArray(v_);

						//default language rule check
						RULE = C1CHK && VOCHK && VSCHK && V_CHK;

						PUBINPUT = !EN && RULE;
						
						KO = this.#linow === 'ko';
						//2nd consonant rule part
						switch(true){
							case(Array.isArray(r.csnt2) && Array.isArray(r.c2set) && Array.isArray(r.csnt2_)):
								//console.log('consonant + vowel + 2nd consonant is validate.');
								c2 = r.csnt2;
								c2s = r.c2set;
								c2_ = r.csnt2_;
								C2S = this.#is_set(key, 'csnt2');
								C2 = this.#is_csnt2(key);
								C2_ = false;
								NC2 = this.#c2 === '';
								C2CHK = Array.isArray(c2);
								C2SCHK = Array.isArray(c2s);
								C2_CHK = Array.isArray(c2_);
								CSNT2 = C2CHK && C2SCHK && C2_CHK;

								KOINPUT = KO && KMCHK && RULE && CSNT2
							break;
						}
						//tone rule part
						switch(true){
							case(Array.isArray(r.tone) && Array.isArray(r.tset) && Array.isArray(r.tone_)):
								to = r.tone;
								ts = r.c2set;
								t_ = r.tone_;
								TO = this.#is_tone(key);
								TS = this.#is_set(key, 'tone');
								T_ = this.#is_toned_vowel(key);
								TSCHK = Array.isArray(ts);
								T_CHK = Array.isArray(t_);
								TONE =  TSCHK && T_CHK;
							break;
						}
					break;
				}
				switch(false){
					case RULE:
						RUN3 = false;
					break;
				}
			break;
		}
		let S02 = S01 && RUN3;
		switch(S02){
			case true:
				switch(true){
					//if composition to consonant - vowel/vowel - consonant2
					case KOINPUT:
						//console.warn('ime.#rule = ', r);
						//console.log('korean input start');
						let KEYVAL = isstr(key);
						let SHIFT = this.shift_();
						//if not pressed Shift key and key input is string and LowerCase key in keymap
						//console.log('LowerCase = ' + tlc(key) + ', UpperCase = ' + tuc(key));
						let LCIDX = km.indexOf(tlc(key));
						let UCIDX = km.indexOf(tuc(key));
						//enable IME compose input
						//console.log('e.keyCode = ' + iarr[0] + ', e.key = ' + iarr[2]);
						//console.log('#rule.letter = ');
						//console.log(r.letter);
						switch(SHIFT){
							case false:
								char = r.letter[LCIDX];
								//console.log('#rule.letter[LCIDX(' + LCIDX + ')] = ' + char);
							break;
							case true:
								char = r.letter[UCIDX];
								//console.log('#rule.letter[UCIDX(' + UCIDX + ')] = ' + char);
							break;
						}
						let IS1ST = this.#is_csnt(char);
						let IS2ND = this.#is_vowel(char);
						let IS3RD = this.#is_csnt2(char);
						//exception case ; pre_input are vowel.
						//consonant input is in now.
						let KOS02 = NC && !NV && IS1ST;
						//consonant input only
						let KOS03 = NC && NV && NC2 && IS1ST;
						//if have consonant, try compose consonant2.
						//unique compose process in korean's character structure.
						//is has been exists on old history document.
						//so, very rare case or just breaking the character compose rule.
						let KOS04 = !NC && NV && NC2 && IS1ST;
						let KOS07 = NC2 && IS2ND && (NC || !NC) && NV;
						let KOS08 = NC2 && IS2ND && NC && !NV;
						let KOS11 = NV && IS2ND;
						let KOS12 = !NV && NC2 && IS2ND;
						let KOS15 = !NC2 && IS3RD;
						let KOS18 = !NC2 && IS2ND;
						let KOS21 = !NC && !NV && IS3RD && NC2;
						let KOS22 = !NC && !NV && IS3RD && !NC2;
						let KOS25 = !NV && !IS3RD && IS1ST;

						//console.log('e.key = ' + iarr[0] + ', char = ' + char);
						switch(true){
							//character first part start 
							case KOS02:
								//console.log('NC && !NV && IS1ST (KOS02)= ' + KOS02);
								//do not allow none-consonant character.
								//just commit / preedit / reset / set consonant.
								this.#add_char(this.#composition());
								this.#reset_cvc();
								this.#c_ = char;
							break;
							case KOS03:
								//console.log('NC && NV && NC2 && IS1ST (KOS03)= ' + KOS03);
								this.#c_ = char;
							break;
							case KOS04:
								//console.log('!NC && NV && NC2 && IS1ST (KOS04)= ' + KOS04);
								//try consonant2 compose...
								mix_t = this.mix_(this.#c_, char, 'csnt2');
								//console.log('mix_t = ' + mix_t);
								//if success to compose the consonant2
								//consonant2 composed belong to consonant and new fisrt consonant input
								let KOS05 = isstr(mix_t);
								//if failed composed consonant2
								//just commit consonant / reset / set the consonant / preedit
								let KOS06 = mix_t === false;

								switch(true){
									case KOS05:
										//console.log('isstr(mix_t) (KOS05) = ' + KOS05);
										//console.log('typeof mix_t === ' + typeof mix_t);
										//consonant data translate to consonant2 data
										//is incomplete character. do preedit.
										this.#c_ = '';
										this.#c2 = mix_t;
									break;
									case KOS06:
										//console.log('mix_t === false (KOS06) = ' + KOS06);
										//console.log('mix_t === ' + mix_t);
										this.#add_char(this.#composition());
										this.#reset_cvc();
										this.#c_ = char;
									break;
								}
							break;
							//character first part end
							//character second part start
							//if vowel input in now.
							case KOS07:
								//console.log('NC2 && IS2ND && (NC || !NC) && NV (KOS07)= ' + KOS07);
								this.#v_ = char;
							break;
							//if have not consonant / exists vowel alread.
							//try compose old vowel and new vowel input.
							case KOS08:
								//console.log('NC2 && IS2ND && NC && !NV (KOS08)= ' + KOS08);
								temp = this.mix_vowel(char);
								let KOS09 = temp === false;
								let KOS10 = isstr(temp);
								switch(true){
									//if failed compose vowel,
									//just commit vowel / reset / set the vowel
									case KOS09:
										//console.log('temp === false (KOS09) = ' + KOS09);
										this.#add_char(this.#composition());
										this.#reset_cvc();
										this.#v_ = char;
									break;
									//if success to compose the vowel
									//update vowel / preedit
									case KOS10:
										//console.log('isstr(temp) (KOS10) = ' + KOS10);
										this.#v_ = temp;
									break;
								}
							break;
							//if have consonant / vowel input in now
							//if have not vowel,
							//set the vowel / preedit
							case KOS11:
								//console.log('NV && IS2ND (KOS11)= ' + KOS11);
								this.#v_ = char;
							break;
							//if have vowel, and have not 2nd consonant,
							//try compose vowel
							case KOS12:
								//console.log('!NV && NC2 && IS2ND (KOS12)= ' + KOS12);
								temp = this.mix_vowel(char);
								let KOS13 = temp === false;
								let KOS14 = isstr(temp);
								switch(true){
									//if failed compose vowel,
									//just commit / reset / set the vowel / preedit
									case KOS13:
										//console.log('temp === false (KOS13) = ' + KOS13);
										this.#add_char(this.#composition());
										this.#reset_cvc();
										this.#v_ = char;
									break;
									//if success to compose the vowel,
									//update vowel / preedit
									case KOS14:
										//console.log('isstr(temp) (KOS14) = ' + KOS14);
										this.#v_ = temp;
									break;
								}
							break;
							//if have consonant2 and consonant2 input
							case KOS15:
								//console.log('!NC2 && IS3RD (KOS15)= ' + KOS15);
								temp = this.mix_csnt2(char);
								//console.log('KOS15 temp = ');
								//console.log(temp);
								//if temp is not validate,
								let KOS16 = temp === false;
								//if temp is validate,
								let KOS17 = isstr(temp);
								switch(true){
									//if consonant2 failed in composition process,
									//just commit / reset / set the consonant / preedit
									case KOS16:
										//console.log('temp === false (KOS16) = ' + KOS16);
										this.#add_char(this.#composition());
										this.#reset_cvc();
										this.#c_ = char;
										break;
									//if success to compose the consonant2,
									//set the consonant2
									//commit / preedit;
									case KOS17:
										//console.log('isobj(temp) (KOS17) = ' + KOS17);
										this.#c2 = temp;
									break;
								}
							break;
							//exception case : if exists consonant2 and vowel input
							case KOS18:
								//console.log('!NC2 && IS2ND (KOS18)= ' + KOS18);
								//if composed consonant2,
								//this consonant2 will decomposition process.
								//consonant2 is composed?
								temp = this.is_mix_str(this.#c2, 'csnt2');
								//console.log('KOS18 this.#c2 = ' + this.#c2 + ', temp = ');
								//console.log(temp);
								let KOS19 = temp === false;
								let KOS20 = isobj(temp);
								switch(true){
									//if not composed consonant2
									//consonant2 transfer to next character's consonant
									//commit the character / reset / set the consonant /
									//set the vowel by new vowel input / preedit
									case KOS19:
										//console.log('temp === false (KOS19) = ' + KOS19);
										temp2 = this.#c2;
										this.#c2 = '';
										this.#add_char(this.#composition());
										this.#reset_cvc();
										this.#c_ = temp2;
										this.#v_ = char;
									break;
									//if composed consonant2,
									//update in consonant2 to composed consonant2's consonant part.
									//commit / reset / set the consonant by composed consonant2's vowel part
									//set the vowel by vowel input in now / preedit
									case KOS20:
										//console.log('isobj(temp) (KOS20) = ' + KOS20);
										this.#c2 = this.#rule.csnt2_[0][0][temp.ci];
										this.#add_char(this.#composition());
										this.#reset_cvc();
										this.#c_ = this.#rule.c2set[temp.ci][temp.ri];
										this.#v_ = char;
									break;
								}
							break;
							//if have first + vowel and consonant2 input
							case KOS21:
								//console.log('!NC && !NV && IS3RD && NC2 (KOS21)= ' + KOS21);
								this.#c2 = char;
							break;
							//if have consonant2,
							//try compose the consonant2
							case KOS22:
								//console.log('!NC && !NV && IS3RD && !NC2 (KOS22)= ' + KOS22);
								temp = this.mix_csnt2(char);
								//console.log(temp);
								let KOS23 = temp === false;
								let KOS24 = isstr(temp);
								switch(true){
									//if can not compose the consonant2 with consonant2 input in now,
									//just commit / reset /
									//set the consonant by consonant2 input in now / preedit
									case KOS23:
										//console.log('temp === false (KOS23) = ' + KOS23);
										this.#add_char(this.#composition());
										//console.log(this.#composition());
										this.#reset_cvc();
										this.#c_ = char;
									break;
									//if success to compose the consonant2,
									//update consonant2 / preedit
									case KOS24:
										//console.log('isstr(temp) (KOS24) = ' + KOS24);
										this.#c2 = temp;
									break;
								}
							break;
							//if have vowel and have not 2nd consonant and
							//char is not 2nd consonant and 1st consonant,
							//VERY RARE exceptional case;
							//char is doubled consonant and
							//can not place on 2nd consonant part in korean.
							//just #add_char() / reset_cvc
							//set the value in #c_
							//last return to preedit
							case KOS25:
								this.#add_char(this.#composition());
								this.#reset_cvc();
								this.#c_ = char;
							break;
						}
					break;
					case PUBINPUT:
						let LOCK = false;
						//Vietnamese IME uses the Telex method
						let VN = this.#linow === 'vn';
						//console.log('NC = ' + NC + ', NV = ' + NV);
						switch(true){
							//if key input is consonant character part
							//2nd consonant part is in default consonant part.
							//composed 2nd consonant belong to default consonant.
							case C_:
								switch(true){
									case VN:
										let d = c1[2];		//'d'
										let D = c1[19];		//'D'
										let Cd = this.#c_ === d;
										let CD = this.#c_ === D;
										let Kd = key === d;
										let KD = key === D;
										let VNCd = Cd && Kd;
										let VNCD = CD && KD;
										switch(true){
											//if #c_ and key is 'd',
											//update consonant / preedit
											case VNCd:
												//this.#c_ = #rule.csnt[3] = 'đ'
												this.#c_ = c1[3];
												LOCK = true;
												//console.log('LOCK = ' + LOCK);
											break;
											//if #c_ and key is 'D',
											//update consonant / preedit
											case VNCD:
												//this.#c_ = #rule.csnt[20] = 'Đ'
												this.#c_ = c1[20];
												LOCK = true;
												//console.log('LOCK = ' + LOCK);
											break;
										}
									break;
								}
								//console.log('LOCK = ' + LOCK);
								switch(false){
									case LOCK:
										let PCS01 = NC && NV;
										let PCS02 = !NC || (!NV && !TO);
										let PCS03 = !NV && TO;
										switch(true){
											//if pre-input is not exists,
											//set the consonant / preedit
											case PCS01:
												this.#c_ = key;
											break;
											//if pre-input is exists,
											//commit character / reset / set the consonant / preedit
											case PCS02:
												this.#add_char(this.#composition());
												this.#reset_cvc();
												this.#c_ = key;
											break;
											//if have vowel and key input is tone character,
											//try mix up process
											case PCS03:
												temp = this.mix_(this.#v_,key,'tone');
												let PCS04 = temp === false;
												let PCS05 = isstr(temp);
												switch(true){
													//if failed mix up process,
													//commit character / reset / set the consonant / preedit
													case PCS04:
														this.#add_char(this.#composition());
														this.#reset_cvc();
														this.#c_ = key;
													break;
													//if successed mix up process,
													//update vowel / preedit
													case PCS05:
														this.#v_ = temp;
													break;
												}
											break;
										}
									break;
								}
							break;
							//if key input is vowel character or vowel set(vset) character part
							case VO || VS:
								switch(false){
									case LOCK:
										let PVS01 = NC && NV && VO;
										let PVS02 = !NC && NV && VO;
										let PVS03 = NC && !NV && !VS && VO;
										let PVS04 = NC && !NV && (VS || VO);
										switch(true){
											//if pre-input is not exists & vowel input,
											//set the vowel / preedit
											case PVS01:
												this.#v_ = key;
											break;
											//if have consonant & have not vowel & vowel input,
											//commit character / reset / set the vowel / preedit
											//same process : PVS03
											case PVS02:
											//if have not consonant & have vowel
											//& key input is not vset & key input is vowel
											//= #v_ and new vowel input can not mix up
											//commit character / reset / set the vowel / preedit
											case PVS03:
												this.#add_char(this.#composition());
												this.#reset_cvc();
												this.#v_ = key
											break;
											//if have not consonant & have vowel
											//& key input is vset or vowel
											//try to mix up to update the vowel
											case PVS04:
												temp = this.mix_vowel(key);
												let PVS05 = temp === false && VO;
												let PVS06 = temp === false && !VO;
												let PVS07 = isstr(temp);
												switch(true){
													//if failed mix up process & key input is vowel,
													//commit character / reset / set the vowel / preedit
													case PVS05:
														this.#add_char(this.#composition());
														this.#reset_cvc();
														this.#v_ = key;
													break;
													//if failed mix up process & key input is not vowel,
													//just break; do preedit
													case PVS06:
													break;
													//if successed mix up process,
													//update vowel / preedit
													case PVS07:
														this.#v_ = temp;
													break;
												}
											break;
										}
									break;
								}
							break;
							//if key input is tone character part
							case TO:
								switch(false){
									case LOCK:
										let PTS01 = !NV;
										switch(true){
											//if have vowel, key input is tone character,
											//try mix up process
											case PTS01:
												temp = this.mix_(this.#v_,key,'tone');
												let PTS02 = temp === false;
												let PTS03 = isstr(temp);
												switch(true){
													//if failed mix up process,
													//just preedit
													//this character is not consonant.
													case PTS02:
													break;
													//if successed mix up process,
													//update vowel / preedit
													case PTS03:
														this.#v_ = temp;
													break;
												}

											break;
										}
									break;
								}
							break;
						}
					break;
				}
			break;
		}
		this.#set_preedit(this.#composition());
	}
	//public_input end
}
//ime_ class end
let ime_varr = [
	'EN','KO','VN','eng','spc',
	'npad','spf','F','ibmc','ibmh',
	'inime','rbc'
];
let im;
for(im = 0;im < ime_varr.length;im++){
	Object.defineProperty(ime_, ime_varr[im], {
	writable: false,
	configurable: false
	});
}

//renderer_ class start
//use switch only. do not use if
class renderer_{
	#ime;
	#sys;
	//rendering ui list
	#rui = [];
	//copy of system_.#pri_list
	#pl;
	//canvas tag's context 2D
	#ctx;
	//constructor start
	//use switch only. do not use if
	constructor(ime, sys){
		let DATACHK = isobj(ime) && isobj(sys);
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
				throw new Error('renderer_.constructor() excution failed',ime,sys);
			break;
		}
		switch(RUN){
			case true:
				this.set_ime(ime);
				this.set_sys(sys);
			break;
		}
	}
	//constructor end
	//set_ime start
	//use switch only. do not use if
	set_ime(ime){
		let DATACHK = isOInst(ime,'ime');
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
				throw new Error('invalide object \'ime\' in rederer_.set_ime()');
			break;
		}
		switch(RUN){
			case true:
				this.#ime = ime;
			break;
		}
	}
	//set_ime end
	//set_sys start
	//use switch only. do not use if
	set_sys(sys){
		let DATACHK = isOInst(sys,'sys');
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
				throw new Error('invalide object \'sys\' in rederer_.set_sys()');
			break;
		}
		switch(RUN){
			case true:
				this.#sys = sys;
				this.#ctx = sys.get_ctx();
			break;
		}
	}
	//set_sys end
	//set_rui start
	//use switch only. do not use if
	set_rui(ul){
		let DATACHK = Array.isArray(ul);
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		switch(RUN){
			case true:
				this.#rui = ul;
			break;
		}
	}
	//set_rui end
	//Is Same Pri_Lists start
	//use switch only. do not use if
	ISPL(ul){
		let DATACHK = this.#sys.GURUIL() && Array.isArray(ul);
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let issame;
		switch(RUN){
			case true:
				//console.log('ISPL IS RUNNING');
				this.set_rui(ul);
				this.#sys.SURUIL(false);
			break;
		}
	}
	//Is Same Pri_Lists end
	//update_list start
	//update to rendering proccess must need to ui list
	//use switch only. do not use if
	update_list(ul){
		let DATACHK = Array.isArray(ul);
		let RUN = true;
		//ui priority of ul
		//0 : top
		//length - 1 : botom
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		//console.log(ul);
		switch(RUN){
			case true:
				//console.log(ul.length);
				this.ISPL(ul);
			break;
		}
	}
	//update_list end
	//use switch only. do not use if
	rendering_(){
		let rui = this.#rui, ime = this.#ime, sys = this.#sys;
		let DATACHK = Array.isArray(rui)
		let RUN = true;
		switch(false){
			case DATACHK:
				RUN = false;
			break;
		}
		let li,i,rl,j,crect;
		let p, r, x1, x2, y1, y2;
		let fl,fs;
		switch(RUN){
			case true:
				//2D context caching
				const ctx = this.#ctx;
				//canvas width-height
				crect = sys.get_canvas_wh();
				//focus window_ ui's background
				const fwb = '#ddd';
				//blur window_ ui's background
				const bwb = '#bbb';
				fl = sys.get_foc_list();
				//console.log(rui.length);
				li = rui.length;
				//ORDER BY DESC RENDERING STYLE for renderer_.#rui
				ctx.globalCompositeOperation = 'destination-over';
				ctx.clearRect(0, 0, crect.w, crect.h);
				for(i = 0;i < li;i++){
					rl = rui[i].length - 1;
					p = rui[i][0].get_rect_info();
					for(j = rl;j > -1;j--){
						switch(j){
							case rl:
								r = rui[i][0].get_rect_info();
								//ctx.clearRect(r.x, r.y, r.w, r.h);
							break;
						}
						fs = fl[0].indexOf(rui[i][j].getUID()) > -1;
						switch(fs){
							case true:
								ctx.fillStyle = fwb;
							break;
							case false:
								ctx.fillStyle = bwb;
							break;
						}
						r = rui[i][j].get_rect_info();
						//console.log('rui[' + i + '][' + j + '] = ui_');
						switch(j){
							case 0:
								//console.log('window_');
								ctx.fillRect(r.x, r.y, r.w, r.h)
							break;
							default:
								ctx.strokeStyle = '#ccc';
								ctx.strokeRect(p.x + r.x, p.y + r.y, r.w, r.h);
							break;
						}
					}
				}
				/*
				ctx.fillStyle = bwb;
				for(i = 0;i < 20;i++){
					for(j = 0;j < 20;j++){
						ctx.fillRect((i * 10),300 + (j * 10),10,10);
						ctx.strokeRect((i * 10),300 + (j * 10),10,10);
					}
				}
				*/
			break;
		}
	}
}
//renderer_ class end
//class part end
//this area must be place on the last
//event / global variable area start
let sys, ime, renderer, tlog = [], logtextarea ,keydownbound = false;
//can i key input?
let INPUT = true;
const console_ = window.console;

function ready(){
	let win1, win2, win3, win4, win5;
	sys = new system_();
	ime = new ime_('en,ko,vn', sys);
	renderer = new renderer_(ime, sys);
	logtextarea = document.createElement('textarea');
	logtextarea.name = 'log';
	logtextarea.rows = 10;
	logtextarea.cols = 100;
	logtextarea.style.fontWeight = 'bold';
	logtextarea.disabled = true;
	logtextarea.textContent = '';
	document.body.appendChild(logtextarea);
	switch(keydownbound){
		case false:
			window.addEventListener('keydown', keydown_);
			window.addEventListener('keyup', keyup_);
			keydownbound = true;
		break;
	}
	sys.set_ime(ime);
	sys.set_canvas_event();
	sys.fake_rendering();

	win1 = new window_(50,50,100,100);
	win1.set_bar();
	win1.get_bar().set_btns();
	win1.set_contents_area();
	sys.register(win1);
	win2 = new window_(300,50,100,100);
	win2.set_bar();
	win2.get_bar().set_btns();
	win2.set_contents_area();
	sys.register(win2);
	win3 = new window_(175,175,100,100);
	win3.set_bar();
	win3.get_bar().set_btns();
	win3.set_contents_area();
	sys.register(win3);
	win4 = new window_(50,300,100,100);
	win4.set_bar();
	win4.get_bar().set_btns();
	win4.set_contents_area();
	sys.register(win4);
	win5 = new window_(300,300,100,100);
	win5.set_bar();
	win5.get_bar().set_btns();
	win5.set_contents_area();
	sys.register(win5);


	const rendering = function rendering(){
		//let t1, t2;
		//t1 = performance.now();
		sys.update();
		renderer.update_list(sys.GRBP());
		renderer.rendering_();
		//t2 = performance.now();
		//console.log((t2 - t1) + 'ms');
		requestAnimationFrame(rendering);
	}
	requestAnimationFrame(rendering);
}

function keydown_(e){
	//console.log(e);
	let DATACHK = isOInst(e, 'ev') && INPUT;
	let RUN = true;
	switch(false){
		case DATACHK:
			RUN = false;
		break;
	}
	switch(RUN){
		case true:
			//console.log('! R U N !');
			ime.kip(e);
			e.preventDefault();
		break;
	}
}

function keyup_(e){
	//console.log(e);
	let DATACHK = isOInst(e, 'ev'), RUN = true;
	switch(false){
		case DATACHK:
			RUN = false;
		break;
	}
	switch(RUN){
		case true:
			//console.log('! ! R U N ! !');
			ime.krp(e);
			e.preventDefault();
		break;
	}
}
// DOMContentLoaded
switch(document.readyState){
	case 'loading':
		window.addEventListener('DOMContentLoaded', ready, { once: true });
	break;
	default:
		ready();
	break;
}
//event / global variable area end

	ime.krp(e);
			e.preventDefault();
		break;
	}
}
// DOMContentLoaded
switch(document.readyState){
	case 'loading':
		window.addEventListener('DOMContentLoaded', ready, { once: true });
	break;
	default:
		ready();
	break;
}
//event / global variable area end

