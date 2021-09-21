import { Dimensions, Platform } from 'react-native';

// Current screen dimension
export const WINDOW = Platform.OS === 'ios' ? Dimensions.get('window') : Dimensions.get('screen');
export const WINDOW_HEIGHT = Dimensions.get('window').width > Dimensions.get('window').height ? Dimensions.get('window').height : Dimensions.get('window').width;
export const WINDOW_WIDTH = Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('window').height : Dimensions.get('window').width;


export const TOTAL_GAME_TIME = 120 //secs
export const INTERVAL_BETWEEN_RANDOM_NUMBER_GENERATED = 3 //1 secs
export const TIME_GAP_BETWEEN_TWO_RANDOM_NUMBER_GENERATED =  1 //secs
export const LEAST_RANDOM_NUMBER = 0
export const HIGHEST_RANDOM_NUMBER = 5
export const SCORE_FOR_CLICKING_ZERO = 5
export const SCORE_FOR_CLICKING_NON_ZERO = -2.5
export const SCORE_FOR_MISSING_ZERO = -3
export const SCORE_FOR_MISSING_NON_ZERO = 1