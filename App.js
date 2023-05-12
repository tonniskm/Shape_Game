import React, { useState,useRef } from 'react';
import { StyleSheet, View, PanResponder, Animated,Pressable,Text,Dimensions,Easing } from 'react-native';
import {Audio} from 'expo-av'



const SHAPE_SIZE = 66;
const NO_SHAPES = 12;
const ACROSS = 3;
const POSSIBLE_SHAPES = ['square','circle','triangle','rectangle']
const POSSIBLE_COLORS = ['red','blue','green','orange','yellow','purple']
const GOAL_TYPES = ['shape','color']
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const MARGIN = 50
const GOAL_HEIGHT = 250;
const ROWS = Math.floor(NO_SHAPES/ACROSS)+((NO_SHAPES%ACROSS==0)?0:1)

const App = () => {

  let initshapes = []
  const [shapes,setShapes] = useState(Array(NO_SHAPES).fill([]))
  const [goal,setGoal] = useState("","")
  let indropposition = []
  let anim_scale = Array(NO_SHAPES).fill(0)
  let anim_opacity = Array(NO_SHAPES).fill(0)
  let winner_scale = useRef(new Animated.Value(0)).current
  let goal_height = useRef(new Animated.Value(0)).current
  let goal_scale = useRef(new Animated.Value(0)).current
  let [victory,setVictory] = useState(false)


  for (let i=0;i<shapes.length;i++){
    indropposition[i] = shapes[i].y>WINDOW_HEIGHT-GOAL_HEIGHT;
    anim_scale[i] = useRef(new Animated.Value(1)).current
    anim_opacity[i] = useRef(new Animated.Value(1)).current
  }

  React.useEffect(()=>{
    Begin()


      
  },[]);

  async function playSound(sound) {

    const soundObj2 = new Audio.Sound();
    soundObj2.setOnPlaybackStatusUpdate();
    sound=="right"?await soundObj2.loadAsync(require("./assets/ding-36029.mp3"),{shouldPlay:false},false):{}
    sound=="wrong"?await soundObj2.loadAsync(require("./assets/negative_beeps-6008.mp3"),{shouldPlay:false},false):{}
    sound=="win"?await soundObj2.loadAsync(require("./assets/win.mp3"),{shouldPlay:false},false):{}
    sound=="start"?await soundObj2.loadAsync(require("./assets/game_start.mp3"),{shouldPlay:false},false):{}
    await soundObj2.playAsync();

  }
  function Begin(){
    let goaltype = Math.floor(Math.random()*2);
    let curgoal = []
    if(goaltype ==0){
      let chosenshape = POSSIBLE_SHAPES[Math.floor(Math.random()*POSSIBLE_SHAPES.length)]
      curgoal = ['shape',chosenshape]
      setGoal(['shape',chosenshape])
    }else{
      let chosencolor = POSSIBLE_COLORS[Math.floor(Math.random()*POSSIBLE_COLORS.length)]
      goaltype = 'color'
      curgoal = ['color',chosencolor]
      setGoal(['color',chosencolor])
      }
      initshapes = GenerateShapes(curgoal);
      for(let i=0;i<shapes.length;i++){  //begin shapes animation
        Animated.timing(anim_scale[i],{toValue:0,duration:10,useNativeDriver:false}).start()
      }
      Animated.timing(winner_scale,{toValue:0,duration:10,useNativeDriver:false}).start()
      if(curgoal[0]=='shape'){
      Animated.timing(goal_scale,{toValue:0,duration:10,useNativeDriver:false}).start(()=>{
        Animated.timing(goal_scale,{toValue:1,duration:2000,useNativeDriver:false,easing:Easing.bounce}).start(()=>{
          playSound("start");
          for(let i=0;i<shapes.length;i++){
            Animated.timing(anim_scale[i],{toValue:1,duration:500,useNativeDriver:false}).start()
          }
        })
      })
      }else{ //begin colors animation
      Animated.timing(goal_height,{toValue:0,duration:10,useNativeDriver:false}).start(()=>{
      Animated.timing(goal_height,{toValue:GOAL_HEIGHT,duration:2000,useNativeDriver:false}).start(()=>{
        playSound("start")
        for(let i=0;i<shapes.length;i++){
          Animated.timing(anim_scale[i],{toValue:1,duration:500,useNativeDriver:false}).start()
        }
      }) 
      })
      }
     
     
  
 
  setShapes(initshapes);setVictory(false);
  }

  function GenerateShapes(thisgoal){
    let no_winners = 2+ Math.floor(Math.random()*(NO_SHAPES/2-2));
    let winners = []
    let remaining = []
    for(let i=0;i<NO_SHAPES;i++){
      remaining[i] = i
    }
    //pick the winners
    for(let i=0;i<no_winners;i++){
      let chosen = Math.floor(Math.random()*remaining.length)
      winners[i] = remaining[chosen];
      remaining = remaining.filter(x=>x!=chosen)
    }
      let wrongshapes = POSSIBLE_SHAPES.filter(x=>x!=thisgoal[1])
      let wrongcolors = POSSIBLE_COLORS.filter(x=>x!=thisgoal[1])

        for (let i=0;i<NO_SHAPES;i++){

      let chosenshape = wrongshapes[Math.floor(Math.random()*wrongshapes.length)]
      let chosencolor = wrongcolors[Math.floor(Math.random()*wrongcolors.length)]
      let isanswer = false
      if(winners.indexOf(i)>-1&&thisgoal[0]=='shape'){chosenshape=thisgoal[1];isanswer=true}
      if(winners.indexOf(i)>-1&&thisgoal[0]=='color'){chosencolor=thisgoal[1];isanswer=true}
      let location = GetStartingLocation(i)
      initshapes[i] = {x:location.x,y:location.y,shape:chosenshape,color:chosencolor,complete:false,correct:isanswer}
    }

    return initshapes
  }

  function GetStartingLocation(i){
          let row = Math.floor(i/3);
      let column = i % ACROSS;
            let xrange = WINDOW_WIDTH-2*MARGIN-SHAPE_SIZE
      let yrange = WINDOW_HEIGHT-GOAL_HEIGHT-MARGIN-SHAPE_SIZE
      startinglocation={}
      startinglocation.x=MARGIN+xrange/(ACROSS-1)*(column)
      startinglocation.y=MARGIN+yrange/(ROWS-1)*(row)
      return startinglocation

  }

  function HandleDrop(i){

    if(indropposition[i]){
      if(shapes[i].correct){
        playSound("right")
        //do the correct thing
        let newshapes = shapes.map(x=>x)
        newshapes[i].complete = true

        let numberremaining = newshapes.filter(x=>x.complete==false&&x.correct==true).length;

        Animated.timing(anim_scale[i],{toValue:0,duration:1000,useNativeDriver:false}).start(()=>{
         //TODOcheck if you are done
          if (numberremaining==0){
            playSound("win");
          Animated.timing(winner_scale,{toValue:1,duration:1000,useNativeDriver:false}).start()
            setVictory(true)         
          }
         //Begin()
        })

        
        setShapes(newshapes)
      }else{
        //do the wrong thing
        playSound("wrong")
        let newshapes = shapes.map(x=>x)
        let newlocation = GetStartingLocation(i)
        newshapes[i].x=newlocation.x;
        newshapes[i].y=newlocation.y;
        setShapes(newshapes)
        Animated.loop(Animated.sequence([
          Animated.timing(anim_opacity[i],{
            toValue:0,duration:250,useNativeDriver:false
          }),
          Animated.timing(anim_opacity[i],{
            toValue:1,duration:250,useNativeDriver:false
          })
        ]),{iterations:5}).start()
      }
    }
  }


  let shaperender = [];
  let panResponders = []
  for (let i=0;i<NO_SHAPES;i++){  //create random shapes
    panResponders[i] = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: ()=>{HandleDrop(i)},
    onPanResponderMove: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      let newshapes = shapes.map(x=>x)
      newshapes[i]["x"] = newshapes[i]["x"]+dx;
      newshapes[i]["y"] = newshapes[i]["y"] +dy;
      setShapes(newshapes);},});
 

      if (shapes[i]["shape"]=="triangle"){
        shaperender[i] = <Animated.View key={"shape"+i} style={[styles[shapes[i]["shape"]],{borderBottomColor:shapes[i]["color"],left:shapes[i].x,top:shapes[i].y,opacity:anim_opacity[i],transform:[{scale:anim_scale[i]}]}]} {...panResponders[i].panHandlers}/>
      }else{
      shaperender[i] = <Animated.View key={"shape"+i}  style={[styles[shapes[i]["shape"]],{backgroundColor:shapes[i]["color"],left:shapes[i].x,top:shapes[i].y,opacity:anim_opacity[i],transform:[{scale:anim_scale[i]}]}]} {...panResponders[i].panHandlers}/>
      }
    
  }

  //create goal
  let goalrender = <View/>
  let message = ""
  if(goal[0]=="shape"){
    goalrender = <Animated.View style={[styles['goal'+goal[1]],{top:GOAL_HEIGHT/2-SHAPE_SIZE*1.5,transform:[{scale:goal_scale}]}]}/>
    message = "Find the "+goal[1]+"s!"
  }else{

    goalrender = <Animated.View style={[styles.goalcolor,{backgroundColor:goal[1],height:goal_height}]}/>
    message = "Find the "+goal[1]+" shapes!"

  }
  
  //you win screen
  let youwin = <Animated.View style={{position:'absolute',width:'70%',height:'50%',backgroundColor:"lightgreen",alignItems:'center',transform:[{scale:winner_scale}],justifyContent:'center',borderRadius:25,top:WINDOW_HEIGHT*.5*.5-MARGIN,left:WINDOW_WIDTH*.3*.5,borderWidth:2,borderColor:'black',zIndex:victory==false?-1:1}}>
  <Pressable style={{flex:1,alignItems:'center',justifyContent:'center'}} onPress={()=>Begin()}>
  <Text style={{fontSize:25,textAlign:'center',fontWeight:'bold'}}>You Win!{`\n`}Play Again</Text>
  </Pressable>

  </Animated.View>

 

  return (
    <View style={styles.container}>

    {youwin}
    <View style={{flex:1,}}>
        <Text style={{top:0,left:10,fontSize:25}}>{message}</Text>
        <View style={{flexGrow:1,top:WINDOW_HEIGHT-GOAL_HEIGHT,width:'110%',left:-10,borderColor:'black',borderTopWidth:3,borderWidth:3,borderStyle:'dashed',alignItems:'center',}}>
        {goalrender}
        </View>

        </View>
     {shaperender}
    </View>

 
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop:25
  },
  circle: {
    position: 'absolute',
    width: SHAPE_SIZE,
    height: SHAPE_SIZE,
    borderRadius: SHAPE_SIZE / 2,
    backgroundColor: 'red',
  },
  square: {
    position: 'absolute',
    width: SHAPE_SIZE,
    height: SHAPE_SIZE,
    backgroundColor: 'green',
  },
  triangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',

    borderRightWidth: SHAPE_SIZE / 2,
    borderBottomWidth: SHAPE_SIZE,
    borderLeftWidth: SHAPE_SIZE / 2,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'blue',
    borderLeftColor: 'transparent',
  },
  goaltriangle:{
        position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',

    borderRightWidth: SHAPE_SIZE*1.5 / 2,
    borderBottomWidth: SHAPE_SIZE*1.5,
    borderLeftWidth: SHAPE_SIZE*1.5 / 2,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'blue',
    borderLeftColor: 'transparent',
    borderStyle:'dashed',
    opacity:0.5,
    zIndex:-1
  },
  goalsquare: {
    position: 'absolute',
    width: SHAPE_SIZE*1.5,
    height: SHAPE_SIZE*1.5,
    backgroundColor: 'transparent',
    borderWidth:2,
    borderColor:'black',
    borderStyle: 'dashed',
    zIndex:-1
  },
  goalcircle: {
    position: 'absolute',
    width: SHAPE_SIZE*1.5,
    height: SHAPE_SIZE*1.5,
    borderRadius: SHAPE_SIZE*1.5 / 2,
    backgroundColor: 'transparent',
    borderWidth:2,
    borderColor:'black',
    borderStyle: 'dashed',
    zIndex:-1
  },
  goalcolor:{
    height:'100%',
    width:'100%',
    opacity:0.9,
    zIndex:-1
  },
  goaloval: {
    position: 'absolute',
    width: SHAPE_SIZE*1.5,
    height: SHAPE_SIZE*1.5,
    borderRadius: SHAPE_SIZE*1.5 / 2,
    backgroundColor: 'transparent',
    borderWidth:2,
    borderColor:'black',
    borderStyle: 'dashed',
    transform:[{scaleX:2}],
    zIndex:-1
  },
  oval: {
    position: 'absolute',
    width: SHAPE_SIZE,
    height: SHAPE_SIZE,
    borderRadius: SHAPE_SIZE / 2,
    backgroundColor: 'red',
    transform:[{scaleX:2}]
  },
  goalrectangle: {
    position: 'absolute',
    width: SHAPE_SIZE*1.5*1.5,
    height: SHAPE_SIZE*1.5,
    backgroundColor: 'transparent',
    borderWidth:2,
    borderColor:'black',
    borderStyle: 'dashed',
    zIndex:-1
  },
    rectangle: {
    position: 'absolute',
    width: SHAPE_SIZE*1.5,
    height: SHAPE_SIZE,
    backgroundColor: 'green',
  },
});

export default App;
