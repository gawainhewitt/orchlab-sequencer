class EventHandlers {
  
  constructor(eventBinder, coolStuffHappens, domManager) {
    this.eventBinder = eventBinder;
    this.coolStuffHappens = coolStuffHappens;
    this.domManager = domManager;
    this.ongoingTouches = [];
    this.touchesOnElements = [];
    this.mouseEnterCount = 0;
    this.buttonCount = 0;
    this.mouseDown = false;
    this.sequencerStep = 0;

    this.eventBinder.bindMouseEnter(this.handleMouseEnter);
    this.eventBinder.bindSelectStart(this.disableSelect);
    this.eventBinder.bindMouseDown(this.registerMouseDown);
    this.eventBinder.bindMouseUp(this.registerMouseUp);
    // this.eventBinder.bindButton(this.buttonFunction);
    this.eventBinder.bindTouchStart(this.#handleTouchStart);
    this.eventBinder.bindTouchEnd(this.#handleTouchEnd);
    this.eventBinder.bindTouchMove(this.#handleTouchMove);
    this.eventBinder.bindTouchCancel(this.#handleCancel);

    this.handleStepChange();
  }

  // come back here to get all rows able to change image regarding to step. at the moment just the first row
  handleStepChange() {
    // the following should obviously be on a for loop
    this.domManager.drawMelodicSequencer(this.eventBinder.melodicSequencerArray[0][this.sequencerStep]);
    this.domManager.drawMelodicSequencer(this.eventBinder.melodicSequencerArray[1][this.sequencerStep]);

  }

  handleMouseEnter = (type) => {
    console.log(type);
    if(type === "mouse"){
      if(this.mouseDown){
        this.mouseEnterCount += 1;
        this.eventBinder.mouseEnterText.innerHTML = `mouseEnter ${this.mouseEnterCount}`;
      }
    }else{
      this.mouseEnterCount += 1;
      this.eventBinder.mouseEnterText.innerHTML = `mouseEnter ${this.mouseEnterCount}`;
    }
    
  }
  
  buttonFunction = () => {
    const text = document.querySelector('#button');
    this.buttonCount += 1;
    text.innerHTML = `button ${this.buttonCount}`;
  }

  disableSelect = (e) => {  
    e.preventDefault();
  }  

  registerMouseDown = (e) => {
    this.disableSelect(e);
    this.mouseDown = true;
  }

  registerMouseUp = () => {
    this.mouseDown = false;
  }

  #handleTouchStart = (e) => {
    e.preventDefault();
    console.log("touch start");
    let touches = e.changedTouches;
    // console.log(touches);
    this.ongoingTouches.push(this.#copyTouch(touches[0]));
    // console.log(this.ongoingTouches);
    this.#showElement(this.ongoingTouches);
  }

  #handleTouchEnd = (e) => {
    e.preventDefault(); 
    let touches = e.changedTouches; 
    console.log("touch end");

    for (let i = 0; i < touches.length; i++) {
      let idx = this.#ongoingTouchIndexById(touches[i].identifier); 
      if (idx >= 0) { // did we get a match?
        console.log("touchend "+idx);
        this.ongoingTouches.splice(idx, 1);  // remove it; we're done
      } else { // no match
        console.log("can't figure out which touch to end");
      }
      for(let j = 0; j < this.touchesOnElements.length; j++){
        if(this.touchesOnElements[j].touch_id === touches[i].identifier){
          this.touchesOnElements.splice(j, 1);
        }
      }
    }
  }

  #handleTouchMove = (e) => {
    e.preventDefault();
    console.log("touch move");
    let touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      let idx = this.#ongoingTouchIndexById(touches[i].identifier); 
      if (idx >= 0) { // did we get a match?
        this.ongoingTouches.splice(idx, 1, this.#copyTouch(touches[i]));
        // console.log(this.#copyTouch(touches[i]));  
      } else { // no match
        console.log("can't figure out which touch to continue");
      }
    }
    this.#showElement(this.ongoingTouches);
  }

  #handleCancel = (e) => { 
    e.preventDefault();  
    console.log("touchcancel."); 
    let touches = e.changedTouches; 
  
    for (let i = 0; i < touches.length; i++) {
      let idx = this.ongoingTouchIndexById(touches[i].identifier); 
      this.ongoingTouches.splice(idx, 1);  // remove it; we're done
    }
  }

  #copyTouch = ({ identifier, clientX, clientY }) => { 
    return { identifier, clientX, clientY };
  }

  #ongoingTouchIndexById = (idToFind) => { 
    for (let i = 0; i < this.ongoingTouches.length; i++) {
      let id = this.ongoingTouches[i].identifier;
      if (id == idToFind) {
        return i;
      }
    }
    return -1;    // not found
  }

  #showElement = () => {
    for(let i = 0; i < this.ongoingTouches.length; i++){
      let el = document.elementFromPoint(this.ongoingTouches[i].clientX, this.ongoingTouches[i].clientY);
      console.log(`element = ${el.id}`);
      
      if(this.#isNewTouchOnElement(i, el.id)){
        // this is a bit irrelevent
        if(el.id === "mouseEnterText"){
          this.handleMouseEnter("touch");
        }
      }
    }
  }

  #isNewTouchOnElement = (idx, el_id) => {
    console.log(`length of this touches on elements = ${this.touchesOnElements.length}`)
    for(let i = 0; i < this.touchesOnElements.length; i++){
      console.log(`touches on elements ${i} ${this.touchesOnElements[i]}`);
      if(this.touchesOnElements[i].touch_id === this.ongoingTouches[idx].identifier){
        if(this.touchesOnElements[i].element_id === el_id){
          console.log("already on element");
          return false;
        }else{
          console.log("same touch new element");
          this.touchesOnElements.splice(i, 1, {touch_id: this.ongoingTouches[idx].identifier, element_id: el_id});
          return true;
        }
      }
    }
    this.touchesOnElements.push({touch_id: this.ongoingTouches[idx].identifier, element_id: el_id});
    return true;
  }
}

module.exports = EventHandlers;
