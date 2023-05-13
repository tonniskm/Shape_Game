import {Audio} from 'expo-av'
import { Image } from 'react-native';
let images = {}
     images.cat=[<Image source={require('../assets/animal_pictures/cat0.jpg')} style={{}}></Image>,
    <Image source={require('../assets/animal_pictures/cat1.jpg')} style={{}}></Image>,
    <Image source={require('../assets/animal_pictures/cat2.png')} style={{}}></Image>,
    ]
    images.cow=[<Image source={require('../assets/animal_pictures/cow0.png')} style={{}}></Image>,
    ]
    images.crow=[<Image source={require('../assets/animal_pictures/crow0.jpg')} style={{}}></Image>,
    ]   
    images.dog=[<Image source={require('../assets/animal_pictures/dog0.jpg')} style={{}}></Image>, 
    <Image source={require('../assets/animal_pictures/dog1.png')} style={{}}></Image>,
    <Image source={require('../assets/animal_pictures/dog2.jpg')} style={{}}></Image>, 
    ]           
    images.duck=[<Image source={require('../assets/animal_pictures/duck0.png')} style={{}}></Image>,
    ]  
    images.elephant=[<Image source={require('../assets/animal_pictures/elephant0.png')} style={{}}></Image>,
    ]  
    images.horse=[<Image source={require('../assets/animal_pictures/horse0.png')} style={{}}></Image>,
    ]  
    images.monkey=[<Image source={require('../assets/animal_pictures/monkey0.png')} style={{}}></Image>,
    ]  
    images.owl=[<Image source={require('../assets/animal_pictures/owl0.jpg')} style={{}}></Image>,
    <Image source={require('../assets/animal_pictures/owl1.jpg')} style={{}}></Image>,
    ]  
    images.rooster=[<Image source={require('../assets/animal_pictures/rooster0.png')} style={{}}></Image>,
    ]  
    images.sheep=[<Image source={require('../assets/animal_pictures/sheep0.png')} style={{}}></Image>,
    ]  
export const imagelist = images;
export let animal_pic_numbers = {cat:3,cow:1,crow:1,dog:3,duck:1,elephant:1,horse:1,monkey:1,owl:2,rooster:1,sheep:1}


export function getAnimalRender(shapes,i,SHAPE_SIZE){
    let animal = shapes[i].animal
    let number = shapes[i].animalpic
    let image = images[animal][number]
    image.props.style.height=SHAPE_SIZE
    image.props.style.width = SHAPE_SIZE
    return image
}

export function getGoalImage(animal,SHAPE_SIZE){
    let image = images[animal][0]
    image.props.style.height = SHAPE_SIZE
    image.props.style.width = SHAPE_SIZE

    return image
}

export async function playAnimalSound(sound){
    const soundObj2 = new Audio.Sound();
    soundObj2.setOnPlaybackStatusUpdate();

    sound=="bird"?await soundObj2.loadAsync(require("../assets/animal_sounds/bird.mp3"),{shouldPlay:false},false):{}
    sound=="cat"?await soundObj2.loadAsync(require("../assets/animal_sounds/cat.mp3"),{shouldPlay:false},false):{}
    sound=="cow"?await soundObj2.loadAsync(require("../assets/animal_sounds/cow.mp3"),{shouldPlay:false},false):{}
    sound=="crow"?await soundObj2.loadAsync(require("../assets/animal_sounds/crow.mp3"),{shouldPlay:false},false):{}
    sound=="dog"?await soundObj2.loadAsync(require("../assets/animal_sounds/dog.mp3"),{shouldPlay:false},false):{}
    sound=="duck"?await soundObj2.loadAsync(require("../assets/animal_sounds/duck.mp3"),{shouldPlay:false},false):{}
    sound=="elephant"?await soundObj2.loadAsync(require("../assets/animal_sounds/elephant.mp3"),{shouldPlay:false},false):{}
    sound=="horse"?await soundObj2.loadAsync(require("../assets/animal_sounds/horse.mp3"),{shouldPlay:false},false):{}
    sound=="lion"?await soundObj2.loadAsync(require("../assets/animal_sounds/lion.mp3"),{shouldPlay:false},false):{}
    sound=="monkey"?await soundObj2.loadAsync(require("../assets/animal_sounds/monkey.mp3"),{shouldPlay:false},false):{}
    sound=="owl"?await soundObj2.loadAsync(require("../assets/animal_sounds/owl.mp3"),{shouldPlay:false},false):{}
    sound=="rooster"?await soundObj2.loadAsync(require("../assets/animal_sounds/rooster.mp3"),{shouldPlay:false},false):{}
    sound=="sheep"?await soundObj2.loadAsync(require("../assets/animal_sounds/sheep.mp3"),{shouldPlay:false},false):{}
    sound=="turkey"?await soundObj2.loadAsync(require("../assets/animal_sounds/turkey.mp3"),{shouldPlay:false},false):{}

    await soundObj2.playAsync();
    
}