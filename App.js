import React, { useState, useEffect } from 'react'
import { Text, View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar"
import * as Animatable from 'react-native-animatable'

const Tabs = AnimatedTabBarNavigator()

const styles = StyleSheet.create({
    //all
    title: {
        color: 'black',
        fontSize: 30,
        textAlign: 'center'
    },
    /////////////////////////////
    // AboutScreen
    aboutView: {
        flex: 1,
        backgroundColor: 'lightgreen'
    },
    aboutText: {
        color: 'black',
        fontSize: 18,
        marginHorizontal: 20,
        marginVertical: 20
    },
    /////////////////////////////
    // KotirovkiScreen
    kotirovkiView: {
        flex: 1,
        backgroundColor: 'lightgreen'
    },
    kotirovkiViewChild: {
        borderWidth: 1,
        marginHorizontal: 0,
        padding: 5
    },
    tableView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,0,.3)',
    },
    tableText: {
        borderWidth: 1,
        padding: 5,
        textAlign: 'center',
        color: 'black',
        fontSize: 10
    },
});


function AboutScreen() {
  return (
      <View style={styles.aboutView}>
          <Text style={styles.title}>
              О приложении
          </Text>

          <Text style={styles.aboutText}>
              Это страница о приложении. Здесь текст и больше ничего. Можно сразу нажать на следующий экран.
          </Text>
          <Animatable.Text animation="slideInDown" iterationCount='infinite' direction="alternate-reverse">❤</Animatable.Text>
      </View>
  );
}

function KotirovkiScreen() {
    const [isLoading, setLoading] = useState(true)
    const [name, setName] = useState([])
    const [last, setLast] = useState([])
    const [highestBid, setHighestBid] = useState([])
    const [percentChange, setPercentChange] = useState([])

    useEffect(() => {
        setInterval(()=>{
            fetch('https://poloniex.com/public?command=returnTicker')
                .then((response) => response.json())
                .then((json) => {
                    let asd = Object.keys(json)
                    setName(asd.map(asd => asd + '\n ---' + '\n'))
                    setLast(asd.map(last => json[last].last + '\n ---' + '\n'))
                    setHighestBid(asd.map(highestBid => json[highestBid].highestBid + '\n ---' + '\n'))
                    setPercentChange(asd.map(percentChange => json[percentChange].percentChange + '\n ---' + '\n'))
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }, 5000)
    }, []);

    return (
      <View style={styles.kotirovkiView}>
        <Text style={styles.title}>
            Котировки
        </Text>
        <View style={styles.kotirovkiViewChild}>
            {isLoading ? <ActivityIndicator size="large" color="black" /> : (
                <View style={{height: 450}}>
                    <ScrollView horizontal={true}>
                        <ScrollView>
                            <View style={styles.tableView}>
                                <Text style={styles.tableText}>
                                    name{'\n'}____________{'\n'}{name}
                                </Text>
                                <Text style={styles.tableText}>
                                    last{'\n'}____________{'\n'}{last}
                                </Text>
                                <Text style={styles.tableText}>
                                    highestBid{'\n'}____________{'\n'}{highestBid}
                                </Text>
                                <Text style={styles.tableText}>
                                    percentChange{'\n'}____________{'\n'}{percentChange}
                                </Text>
                            </View>
                        </ScrollView>
                    </ScrollView>
                </View>
            )}
        </View>
      </View>
  );
}


export default function App() {
  return (
      <NavigationContainer>
        <Tabs.Navigator
            tabBarOptions={{
                activeTintColor: "#2F7C6E",
                inactiveTintColor: "#222222"
            }}
            appearance={{
                whenInactiveShow: 'label-only',
                tabBarBackground: 'rgba(0,255,100,.6)',
                activeColors: 'red'
            }}
        >
          <Tabs.Screen name="О приложении" component={AboutScreen} />
          <Tabs.Screen name="Котировки" component={KotirovkiScreen} />
        </Tabs.Navigator>
      </NavigationContainer>
  );
}
