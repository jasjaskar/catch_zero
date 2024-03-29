import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import HeaderComponent from '../Components/HeaderComponent';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../common/globe';
import { CommonContext } from '../Context/CommonContext';


export default class ResultScreen extends Component {

    constructor(props){
        super(props);
    }

    render(){
    return (
        <CommonContext.Consumer>
            {result =>
        <View>
            <HeaderComponent bgColor={"#ff9a5c"} Title={"Result"} goBack={true} />
            <ScrollView>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Game Over !!!</Text>
                    <Text style={styles.headingText}>You Scored {result.LastPlayedScoreAndNumbersHistory.liveScore}</Text>
                </View>
                <View style={styles.cardContainer}>
                    {/* <Text style={styles.cardContainerText}>Game Played Time - {120 - result.LastPlayedScoreAndNumbersHistory.timeElapsed} Secs</Text> */}
                    <Text style={styles.cardContainerText}>Total Numbers displayed:  {result.LastPlayedScoreAndNumbersHistory.clickedZeros+ result.LastPlayedScoreAndNumbersHistory.clickedNonZeros+ result.LastPlayedScoreAndNumbersHistory.missedZeros+ result.LastPlayedScoreAndNumbersHistory.missedNonZeros}</Text>
                    <Text style={styles.cardContainerText}>Total 0's displayed:  {result.LastPlayedScoreAndNumbersHistory.clickedZeros + result.LastPlayedScoreAndNumbersHistory.missedZeros}</Text>
                    <Text style={styles.cardContainerText}>Count of Zero Clicked: {result.LastPlayedScoreAndNumbersHistory.clickedZeros}</Text>
                    <Text style={styles.cardContainerText}>Count of Non-Zero Clicked: {result.LastPlayedScoreAndNumbersHistory.clickedNonZeros}</Text>
                    <Text style={styles.cardContainerText}>Count of Zero Missed: {result.LastPlayedScoreAndNumbersHistory.missedZeros}</Text>
                    <Text style={styles.cardContainerText}>Count of Non-Zero Missed: {result.LastPlayedScoreAndNumbersHistory.missedNonZeros}</Text>
                </View>
            </ScrollView>
      </View>
    }
    </CommonContext.Consumer>
    );
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    headingContainer:{
        marginTop:WINDOW_HEIGHT/10,
        marginBottom:WINDOW_HEIGHT/20,
        marginLeft:"auto",
        marginRight:"auto"
    },
    headingText:{
        fontWeight:"bold",
        fontSize:WINDOW_HEIGHT/15 
    },
    cardContainer:{
        marginTop: WINDOW_HEIGHT / 20,
        borderRadius: WINDOW_WIDTH / 25,
        backgroundColor: "#f9f8ff",
        position: "relative",
        marginBottom: WINDOW_HEIGHT / 50,
        borderColor: "#000",
        padding: 20,
        borderWidth: 1,
    },
    cardContainerText:{
        marginLeft:"auto",
        marginRight:"auto",
        fontSize:WINDOW_HEIGHT/25
    }
})
