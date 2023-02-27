import {View} from 'react-native';
import React, {Component} from 'react';
import Login from './src/Login';
import Home from './src/Home';
import {getItem, setItem} from './src/asyncStorage';

const UserContext = React.createContext(false);

export class App extends Component {
  constructor() {
    super();

    this.state = {
      isLogin: false,
    };
  }

  async componentDidMount() {
    try {
      const checkData =
        (await getItem()) || (await setItem(this.state.isLogin));

      if (checkData) {
        await getItem().then(data => {
          this.setState({isLogin: data.logged});
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.setState.bind(this)}>
        <View style={{flex: 1, padding: 10, justifyContent: 'center'}}>
          {!this.state.isLogin ? <Login /> : <Home />}
        </View>
      </UserContext.Provider>
    );
  }
}

export default App;

export {UserContext};
