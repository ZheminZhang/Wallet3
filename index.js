import { AppRegistry } from 'react-native';
import App from './App';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Class RCTCxxModule']);
YellowBox.ignoreWarnings(['Module RNOS']);
YellowBox.ignoreWarnings(['Module RNFileSystem']);
YellowBox.ignoreWarnings(['You should only render one navigator']);

AppRegistry.registerComponent('Wallet3', () => App);
