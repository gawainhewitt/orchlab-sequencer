class EventBinders {

  constructor() {

    const numberOfMelodicRows = 7;
    const numberOfSteps = 8;
    this.melodicSequencerArray = [];

    for (let i = 0; i < numberOfMelodicRows; i++) {
      this.melodicSequencerArray[i] = [];
      for (let j = 0; j < numberOfSteps; j++) {
        this.melodicSequencerArray[i][j] = `r${i}s${j}`;
      }
    }

    const numberOfRhythmicRows = 3;
    this.rhythmicSequencerArray = [];

    for (let i = 0; i < numberOfRhythmicRows; i++) {
      this.rhythmicSequencerArray[i] = [];
      for (let j = 0; j < numberOfSteps; j++) {
        this.rhythmicSequencerArray[i][j] = `d${i}s${j}`;
      }
    }

    this.mouseEnter = document.querySelector("#mouseEnter");
    this.mouseEnterText = document.querySelector('#mouseEnterText');
    // this.button = document.querySelector("#button"); // this binds anything with the id button
    this.wrapper = document.querySelector("#wrapper");
  }

  bindMouseEnter(handler) {
    this.mouseEnter.addEventListener('mouseenter', () => {
      handler("mouse");
    })
  }
  
  // bindButton(handler) {
  //   this.button.addEventListener('click', () => {
  //     handler();
  //   })
  // }

  bindSelectStart(handler) {
    document.addEventListener('selectstart', (e) => {
      handler(e);
    })
  }

  bindMouseDown(handler) {
    document.addEventListener('mousedown', (e) => {
      handler(e);
    })
  }

  bindMouseUp(handler) {
    document.addEventListener('mouseup', (e) => {
      handler(e);
    })
  }

  bindTouchStart(handler) {
    this.wrapper.addEventListener('touchstart', handler);
  }

  bindTouchEnd(handler) {
    this.wrapper.addEventListener('touchend', handler);
  }

  bindTouchMove(handler) {
    this.wrapper.addEventListener('touchmove', handler);
  }

  bindTouchCancel(handler) {
    this.wrapper.addEventListener('touchcancel', handler);
  }

}
 

module.exports = EventBinders;
