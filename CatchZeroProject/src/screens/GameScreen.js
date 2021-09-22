



import React, {Component} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet,NativeModules, Platform } from 'react-native';
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
import { CommonContext } from '../Context/CommonContext';
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
    }


    // Method to set the state variables to initial state
    setStateVariablesToInitialState = async () => {
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


    // Method to Clear the timer and route to result screen, After game over
    clearTimer = async() => {
        clearInterval(this.gameTimer);
        this.context.setLastPlayedScoreAndNumbersHistory(
            {
                clickedZeros: this.state.clickedZeros,
                clickedNonZeros : this.state.clickedNonZeros,
                missedZeros: this.state.missedZeros,
                missedNonZeros : this.state.missedNonZeros,
                liveScore: this.state.liveScore,
              }
        )
        this.props.navigation.navigate("Result")
        this.setStateVariablesToInitialState()  
    }

    // Method to calculate live score
    liveScoreCalculation = async(randomNumber, isClicked) => {
        if(randomNumber === LEAST_RANDOM_NUMBER){
            if(isClicked === true){
                this.setState({
                    liveScore:this.state.liveScore + SCORE_FOR_CLICKING_ZERO,
                    clickedZeros:this.state.clickedZeros + 1
                })
            }
            else{
                this.setState({
                    liveScore:this.state.liveScore + SCORE_FOR_MISSING_ZERO,
                    missedZeros:this.state.missedZeros + 1
                })
            }
        }
        else if (randomNumber > LEAST_RANDOM_NUMBER && randomNumber <= HIGHEST_RANDOM_NUMBER){
            if(isClicked === true){
                this.setState({
                    clickedNonZeros:this.state.clickedNonZeros + 1,
                    liveScore:this.state.liveScore + SCORE_FOR_CLICKING_NON_ZERO,
                    colorChange: true,
                })
            }
            else{
                this.setState({
                    liveScore:this.state.liveScore + SCORE_FOR_MISSING_NON_ZERO,
                    missedNonZeros:this.state.missedNonZeros + 1
                })
            }
            
        }
        else{
            console.log("Something went wrong with number", isClicked, "random", randomNumber)
        }
    }


    // Method to generate random number from native side, if it is android otheriwse from react native side
    generateRandomNumber = async() => {
        let randomNumber = Platform.OS === 'android' ? await RandomNumberGeneratorModule.getRandomNumber() : Math.floor(Math.random() * (HIGHEST_RANDOM_NUMBER + 1))
        this.setState({randomNumber: randomNumber})
    }

    // Method to trigger game timer and start the game
    startGame = async () => {
        this.setState({
            isStarted: true,
        })
        console.log(this.state.isPressed)

        this.generateRandomNumber()

        this.gameTimer = setInterval(() => {
            this.setState({
                gameTime: (this.state.gameTime - 1)
            })
            if(this.state.gameTime === 0){
                this.clearTimer()
                return
            }
            else if(this.state.gameTime % INTERVAL_BETWEEN_RANDOM_NUMBER_GENERATED === 0){
                this.generateRandomNumber()  
                this.setState({
                    isPressed: false,
                })
            }
            else if(this.state.gameTime % INTERVAL_BETWEEN_RANDOM_NUMBER_GENERATED === TIME_GAP_BETWEEN_TWO_RANDOM_NUMBER_GENERATED){
                if(this.state.isPressed !== true){
                    this.liveScoreCalculation(this.state.randomNumber, false)
                }
                this.setState({
                    randomNumber:"",
                    colorChange: false,
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
                            onPress={async ()=>{
                                    if(this.state.randomNumber >= LEAST_RANDOM_NUMBER && 
                                        this.state.randomNumber <= HIGHEST_RANDOM_NUMBER && 
                                        this.state.isPressed === false){
                                            await this.liveScoreCalculation(this.state.randomNumber, true)
                                            this.setState({isPressed:true})   
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

                        // For development purpose 
                        
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

GameScreen.contextType = CommonContext;


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






