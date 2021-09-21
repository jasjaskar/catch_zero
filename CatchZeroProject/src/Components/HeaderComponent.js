import{ useEffect } from 'react';
import * as React from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native';
import { WINDOW_HEIGHT,WINDOW_WIDTH } from '../common/globe';
import backIcon from '../Assets/back-arrow.png';
import { useNavigation } from '@react-navigation/native';

const HeaderComponent=  (props) => {
    const navigation = useNavigation();
  return (
    <View style={[styles.container,{backgroundColor : props.bgColor}]}>
        {
            props.goBack ?
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={backIcon}
                        style={styles.backIcon} />
                </TouchableOpacity>
                :
                <Text style={styles.titleText}>{props.Title}</Text>
        }
    </View>
  );
}

export default HeaderComponent;


const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        height: WINDOW_HEIGHT/4,
    },
    backIcon: {
        width: WINDOW_WIDTH / 10,
        height: WINDOW_HEIGHT / 40,
        resizeMode: 'center',
        marginLeft: WINDOW_WIDTH/80,
        alignItems:"center",
        // justifyContent : "center",
        paddingRight: WINDOW_WIDTH/ 20,
        paddingLeft: WINDOW_WIDTH/ 35,
        paddingTop: WINDOW_HEIGHT / 36.5,
        paddingBottom: WINDOW_HEIGHT / 36.5
    },
    titleText:{
        color:'#000',
        fontSize: WINDOW_HEIGHT/20, 
        //alignItems:"center",
        textAlign:"center",
        fontWeight:"bold", 
        height: WINDOW_HEIGHT / 15,
        width: WINDOW_WIDTH/ 1.6,
    }
})