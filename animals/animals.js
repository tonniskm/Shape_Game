import {Audio} from 'expo-av'
import { Image } from 'react-native';
let images = {}
const SHAPE_SIZE = 50
const image_style = {height:SHAPE_SIZE*1.5,width:SHAPE_SIZE*1.5}
    images.bee=[<Image source={require('../assets/animal_pictures/bee0.jpg')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/bee1.jpg')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/bee2.jpg')} style={image_style}></Image>,
    ]
     images.cat=[<Image source={require('../assets/animal_pictures/cat0.jpg')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/cat1.jpg')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/cat2.png')} style={image_style}></Image>,
    ]
    images.cow=[<Image source={require('../assets/animal_pictures/cow0.png')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/cow1.jpg')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/cow2.jpg')} style={image_style}></Image>,
    ]
    images.crow=[<Image source={require('../assets/animal_pictures/crow0.jpg')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/crow1.jpg')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/crow2.jpg')} style={image_style}></Image>,
    ]   
    images.dog=[<Image source={require('../assets/animal_pictures/dog0.jpg')} style={image_style}></Image>, 
    <Image source={require('../assets/animal_pictures/dog1.png')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/dog2.jpg')} style={image_style}></Image>, 
    ]           
    images.duck=[<Image source={require('../assets/animal_pictures/duck0.png')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/duck1.jpg')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/duck2.jpg')} style={image_style}></Image>,
    ]  
    images.elephant=[<Image source={require('../assets/animal_pictures/elephant0.png')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/elephant1.jpg')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/elephant2.jpg')} style={image_style}></Image>,
    ]  
    images.horse=[<Image source={require('../assets/animal_pictures/horse0.png')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/horse1.jpg')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/horse2.jpg')} style={image_style}></Image>,
    ]  
    images.monkey=[<Image source={require('../assets/animal_pictures/monkey0.png')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/monkey1.jpg')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/monkey2.jpg')} style={image_style}></Image>,
    ]  
    images.owl=[<Image source={require('../assets/animal_pictures/owl0.jpg')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/owl1.jpg')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/owl2.jpg')} style={image_style}></Image>,
    ]  
    images.rooster=[<Image source={require('../assets/animal_pictures/rooster0.png')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/rooster1.jpg')} style={image_style}></Image>,
    ]  
    images.sheep=[<Image source={require('../assets/animal_pictures/sheep0.png')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/sheep1.jpg')} style={image_style}></Image>,
    <Image source={require('../assets/animal_pictures/sheep2.jpg')} style={image_style}></Image>,
    ]  
export const imagelist = images;
export let animal_pic_numbers = {bee:3,cat:3,cow:3,crow:3,dog:3,duck:3,elephant:3,horse:3,monkey:3,owl:3,rooster:1,sheep:3}


export function getAnimalRender(shapes,i,SHAPE_SIZE){
    let animal = shapes[i].animal
    let number = shapes[i].animalpic
    let image = images[animal][number]
    // image.props.style.height=SHAPE_SIZE*1.5
    // image.props.style.width = SHAPE_SIZE*1.5
    return image
}

export function getGoalImage(animal,SHAPE_SIZE){
    let image = images[animal][0]
    // image.props.style.height = SHAPE_SIZE
    // image.props.style.width = SHAPE_SIZE

    return image
}

export async function playAnimalSound(sound){
    const soundObj2 = new Audio.Sound();
    soundObj2.setOnPlaybackStatusUpdate();

    sound=="bird"?await soundObj2.loadAsync(require("../assets/animal_sounds/bird.mp3"),{shouldPlay:false},false):{}
    sound=="bee"?await soundObj2.loadAsync(require("../assets/animal_sounds/bee.mp3"),{shouldPlay:false},false):{}
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