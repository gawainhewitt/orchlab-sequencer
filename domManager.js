class DomManager {

    constructor() {
        
    }

    setupMelodicSequencerImages(id) {
        const elementid = id;
        const idArray = elementid.split("");
        const row = idArray[1];
        const step = idArray[3];
        const imageElement = document.createElement("img");
        imageElement.classList.add("melodic-image");
        imageElement.src = "./images/harp-grey.png";
        imageElement.alt = `harp off row ${row} step ${step}`;
        document.querySelector(`#${elementid}`).appendChild(imageElement);
    }

    setupDrumSequencerImages(id) {
        const elementid = id;
        const idArray = elementid.split("");
        const row = idArray[1];
        const step = idArray[3];
        const imageElement = document.createElement("img");
        let className;
        let image;
        let altText;
        console.log(row);

        switch(row) {
            case "0":
                className = "cymbal-image";
                image = image = "./images/cymbal-grey.png";
                altText = `cymbal off step ${step}`;
                break;
            case "1":
                className = "snare-image";
                image = image = "./images/snare-grey.png";
                altText = `snare off step ${step}`;
                break;
            case "2":
                className = "kick-image";
                image = "./images/kick-grey.png";
                altText = `kick off step ${step}`;
                break;
        }
        imageElement.classList.add(className);
        imageElement.src = image;
        imageElement.alt = altText;
        document.querySelector(`#${elementid}`).appendChild(imageElement);
    }

    drawSequencer(id, state, type) {
        const elementid = id;
        const idArray = elementid.split("");
        const row = idArray[1];
        const step = idArray[3];
        const element = document.querySelector(`#${elementid}`);
        let className;
        let instrument;
        console.log(`the id is ${id}`);
        console.log(`which case ${type}`);


        switch(type) {
            case "melodic":
                className = "melodic-image";   
                instrument = "harp";     
                break;  
            case 0:
                className = "cymbal-image";
                instrument = "cymbal";
                break;
            case 1:
                className = "snare-image";
                instrument = "snare";
                break;
            case 2:
                className = "kick-image";
                instrument = "kick";
                break;
        }


        let imageToChange = element.querySelector(`.${className}`);

        console.log(`the classname is ${className} and the element is ${imageToChange}`);

        let newImage;
        let altText;

        switch(state) {
            case "step":
                newImage = `./images/${instrument}-pink.png`;
                altText = imageToChange.alt;
                break;
            case "on": 
                newImage = `./images/${instrument}-orange.png`;
                altText = `${instrument} on row ${row} step ${step}`;
                break; 
            case "off":
                newImage = `./images/${instrument}-grey.png`;
                altText = `${instrument} off row ${row} step ${step}`;
                break; 
        }
        imageToChange.src = newImage; 
        imageToChange.alt = altText;
    }

}

module.exports = DomManager;