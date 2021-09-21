import{ useEffect, useState } from 'react';
import React, {Component} from 'react';
import { View, Text, ScrollView, Button, TouchableOpacity, StyleSheet,NativeModules, Platform } from 'react-native';
import HeaderComponent from '../Components/HeaderComponent';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../common/globe';
import {
    TOTAL_GAME_TIME,
    INTERVAL_BETWEEN_RANDOM_NUMBER_GENERATED,
    TIME_GAP_BETWEEN_TWO_RANDOM_NUMBER_GENERATED,
    LEAST_RANDOM_NUMBER,
    HIGHEST_RANDOM_NUMBER,
    SCORE_FOR_CLICKING_ZERO,
    SCORE_FOR_CLICKING_NON_ZERO,
    SCORE_FOR_MISSING_ZERO,
    SCORE_FOR_MISSING_NON_ZERO
} from "../common/globe";
// import RandomNumberGeneratorModule  from "../Components/JavaNativeBridge";
const { RandomNumberGeneratorModule } = NativeModules;


export default class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          liveScore: 0,
          randomNumber: 0,
          gameTime: TOTAL_GAME_TIME,
          isStarted: false,
          isPressed: false,
          colorChange: false,
          clickedZeros : 0,
          clickedNonZeros : 0,
          missedZeros: 0,
          missedNonZeros :0,
        };
        this.gameTimer = null;
        console.log(this.state)
      }

    generateRandomNumber = async() => {

        // Generating random number from native side, if it is android otherwise from react native side
        let randomNumber = Platform.OS === 'android' ? await RandomNumberGeneratorModule.getRandomNumber() : Math.floor(Math.random() * (HIGHEST_RANDOM_NUMBER + 1))
        this.setState({randomNumber: randomNumber})
    }

    clearTimer = async() => {
        clearInterval(this.gameTimer);
        this.props.navigation.navigate("Result",
        {
          clickedZeros: this.state.clickedZeros,
          clickedNonZeros : this.state.clickedNonZeros,
          missedZeros: this.state.missedZeros,
          missedNonZeros : this.state.missedNonZeros,
          liveScore: this.state.liveScore,
          timeElapsed: this.state.gameTime
        })
        this.setState({
            gameTime: TOTAL_GAME_TIME,
            randomNumber:0,
            isStarted:false,
            isPressed: false,
            colorChange: false,
            liveScore: 0,
            clickedZeros : 0,
            clickedNonZeros : 0,
            missedZeros: 0,
            missedNonZeros :0,
        })
    }

    liveScoreCalculationForPressingActivity = async(randomNumber) => {
        if(randomNumber === LEAST_RANDOM_NUMBER){
            this.setState({
                liveScore:this.state.liveScore + SCORE_FOR_CLICKING_ZERO,
                clickedZeros:this.state.clickedZeros + 1
            })
        }
        else if (randomNumber > LEAST_RANDOM_NUMBER && randomNumber <= HIGHEST_RANDOM_NUMBER){
            this.setState({
                clickedNonZeros:this.state.clickedNonZeros + 1,
                liveScore:this.state.liveScore + SCORE_FOR_CLICKING_NON_ZERO,
                colorChange: true,
            })
        }
        else{
            console.log("Something went wrong")
        }
    }

    liveScoreCalculationForNotPressingActivity = async(randomNumber) => {
        if(randomNumber === LEAST_RANDOM_NUMBER){
            this.setState({
                liveScore:this.state.liveScore + SCORE_FOR_MISSING_ZERO,
                missedZeros:this.state.missedZeros + 1
            })
        }
        else if (randomNumber > LEAST_RANDOM_NUMBER && randomNumber <= HIGHEST_RANDOM_NUMBER){
            this.setState({
                liveScore:this.state.liveScore + SCORE_FOR_MISSING_NON_ZERO,
                missedNonZeros:this.state.missedNonZeros + 1
            })
        }
        else{
            console.log("Something went wrong")
        }
    }

    startGame = async () => {
        this.setState({
            isStarted: true,
        })
        this.generateRandomNumber()

        this.gameTimer = setInterval(() => {
            let newTime;
            newTime = this.state.gameTime - 1
            this.setState({gameTime:newTime})

            if(this.state.gameTime === 0){
                this.clearTimer()
                return
            }
            else if(this.state.gameTime % INTERVAL_BETWEEN_RANDOM_NUMBER_GENERATED === 0){
                this.generateRandomNumber()
                this.setState({
                    isPressed:false
                })   
            }
            else if(this.state.gameTime % INTERVAL_BETWEEN_RANDOM_NUMBER_GENERATED === TIME_GAP_BETWEEN_TWO_RANDOM_NUMBER_GENERATED){
                if(this.state.isPressed !== true){
                    this.liveScoreCalculationForNotPressingActivity(this.state.randomNumber)
                }
                this.setState({
                    randomNumber:"",
                    colorChange: false
                })
            }
            else{
                console.log("continue interval")
            }
        }, 1000)
    }

    render(){
        return (
            <View>
                <HeaderComponent bgColor={"#48ef96"} Title={"CATCH 0(ZERO)"} titleColor={"#000"} />
                <ScrollView>
                    <View style={styles.liveScoreContainer}>
                        <Text style={[styles.liveScoreText, this.state.colorChange ? {color:"red"}:{color: "#000"} ] }>Live Score: {this.state.liveScore}</Text>
                    </View>
                    <View style={styles.randomNumberContainer}>
                        <Text style={styles.randomNumberText} 
                            onPress={()=>{
                                    if(this.state.randomNumber >= LEAST_RANDOM_NUMBER && 
                                        this.state.randomNumber <= HIGHEST_RANDOM_NUMBER && 
                                        this.state.isPressed === false){
                                            this.setState({isPressed:true})
                                            this.liveScoreCalculationForPressingActivity(this.state.randomNumber)
                                    }
                            }}>
                            {this.state.randomNumber}
                        </Text>
                    </View>
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>{Math.trunc( this.state.gameTime/60).toString().padStart(2,0)}{":"}{(this.state.gameTime%60).toString().padStart(2,0)}</Text>
                        <Text style={styles.timerTextFormat}>{"MM:SS"}</Text>
                    </View>
                    {!(this.state.isStarted) ? (
                        <TouchableOpacity
                            style={styles.startButtonContainer}
                            underlayColor={"#fff"}
                            onPress={() => this.startGame()}
                        >
                            <Text style={styles.startButtonText}>Start Game</Text>
                        </TouchableOpacity>
                        ):(null)
                        // <TouchableOpacity
                        //     style={styles.stopButtonContainer}
                        //     underlayColor={"#fff"}
                        //     onPress={() => this.clearTimer()}
                        // >
                        //     <Text style={styles.stopButtontext}>Stop Game</Text>
                        // </TouchableOpacity>
                        
                    }
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    liveScoreContainer: {
        marginTop:WINDOW_HEIGHT/10,
        marginBottom:WINDOW_HEIGHT/20,
        marginLeft:WINDOW_WIDTH/50
    },
    liveScoreText:{
        fontWeight:"bold",
        fontSize:WINDOW_HEIGHT/15, 
    },
    randomNumberContainer:{
        marginTop:WINDOW_HEIGHT/10,
        marginBottom:WINDOW_HEIGHT/20, 
        height:WINDOW_HEIGHT/3, 
        alignItems:"center",
        justifyContent:"center", 
        marginLeft:WINDOW_WIDTH/50
    },
    randomNumberText:{
        fontWeight:"bold",
        fontSize:WINDOW_HEIGHT/4
    },
    timerContainer:{
        marginTop:WINDOW_HEIGHT/10,
        marginBottom:WINDOW_HEIGHT/20, 
        alignItems:"center",
        justifyContent:"center", 
        marginLeft:WINDOW_WIDTH/50
    },
    timerText:{
        fontWeight:"bold",
        fontSize:WINDOW_HEIGHT/20
    },
    timerTextFormat:{
        fontWeight:"bold",
        fontSize:WINDOW_HEIGHT/20, 
        color:"grey"
    },
    startButtonContainer:{
        marginTop: WINDOW_HEIGHT / 35,
        marginLeft: "auto",
        marginRight: "auto",
        width: WINDOW_WIDTH / 4.79,
        backgroundColor: "#100A45",
        borderColor: "#100A45",
        borderWidth:2,
        borderRadius:5,
        overflow: "hidden",
    },
    // stopButtonContainer:{
    //     marginTop: WINDOW_HEIGHT / 35,
    //     marginLeft: "auto",
    //     marginRight: "auto",
    //     width: WINDOW_WIDTH / 4.79,
    //     backgroundColor: "grey",
    //     borderColor: "grey",
    //     borderWidth:2,
    //     borderRadius:5,
    //     overflow: "hidden",
    // },
    startButtonText:{
        color: "#fff",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: WINDOW_HEIGHT / 30,
        lineHeight: WINDOW_HEIGHT / 11.65
    },
    // stopButtontext:{
    //     color: "#000",
    //     textAlign: 'center',
    //     fontWeight: 'bold',
    //     fontSize: WINDOW_HEIGHT / 30,
    //     lineHeight: WINDOW_HEIGHT / 11.65
    // },
})

