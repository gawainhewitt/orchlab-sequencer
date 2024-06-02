class DomManager {

    constructor() {
        
    }

    drawMelodicSequencer(id) {
        const element = id;
        let imageToChange = element.querySelector('.melodic-image');
        imageToChange.src="./images/harp-pink.png";
        imageToChange.alt="testing changing alt text";
    }

}

module.exports = DomManager;