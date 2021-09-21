import React, {Component} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import HeaderComponent from '../Components/HeaderComponent';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../common/globe';


export default class GameScreen extends Component {

    constructor(props){
        super(props);
        console.log(this.props.route.params)
    }

    render(){
    return (
        <View>
            <HeaderComponent bgColor={"#ff9a5c"} Title={"Result"} goBack={true} />
            <ScrollView>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Game Over !!!</Text>
                    <Text style={styles.headingText}>You Scored {this.props.route.params.liveScore}</Text>
                </View>
                <View style={styles.cardContainer}>
                    {/* <Text style={styles.cardContainerText}>Game Played Time - {120 - this.props.route.params.timeElapsed} Secs</Text> */}
                    <Text style={styles.cardContainerText}>Total Numbers displayed - {this.props.route.params.clickedZeros+ this.props.route.params.clickedNonZeros+ this.props.route.params.missedZeros+ this.props.route.params.missedNonZeros}</Text>
                    <Text style={styles.cardContainerText}>Total 0's displayed - {this.props.route.params.clickedZeros + this.props.route.params.missedZeros}</Text>
                    <Text style={styles.cardContainerText}>Count of Zero Clicked  - {this.props.route.params.clickedZeros}</Text>
                    <Text style={styles.cardContainerText}>Count of Non-Zero Clicked - {this.props.route.params.clickedNonZeros}</Text>
                    <Text style={styles.cardContainerText}>Count of Zero Missed - {this.props.route.params.missedZeros}</Text>
                    <Text style={styles.cardContainerText}>Count of Non-Zero Missed - {this.props.route.params.missedNonZeros}</Text>
                </View>
            </ScrollView>
      </View>
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
        fontSize:WINDOW_HEIGHT/30
    }
})
