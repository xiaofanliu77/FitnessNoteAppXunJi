/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert,
  FlatList
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import actionItems from './actions.json'
import _ from 'lodash'

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const screenDimensions = Dimensions.get('screen')

type CardProps = {
  title: string,
  description: string
}

const data = [
  { id: 1,
    title: '模版一',
    description: '杠铃卧推'},
  { id: 2,
    title: '模版二',
    description: '杠铃卧推，杠铃卧推，杠铃卧推'},
  { id: 3,
    title: '模版三',
    description: '杠铃卧推，杠铃卧推，杠铃卧推'},
]

const TrainingCard = ({title, description}: CardProps) => (
    <TouchableOpacity>
      <View style={styles.trainingCard}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardText}>{description}</Text>
      </View>
      </TouchableOpacity>
)

function SubBodyPartList({value}: any): JSX.Element {
  return _.map(value, (val: any[], key: string) => {
    // console.log({key})
    return <View key={key} style={styles.cardText}>
      <Text>{`  `}{key}</Text>
    </View>
  })
}

function BodyPartList(): JSX.Element {
  return _.map(actionItems, (val: any[], key: any) => {
    // console.log({k: key})
    return <View style={styles.cardText}>
      <Text>{key}</Text>
      <SubBodyPartList value={val}/>
    </View>
  }
  )
}




console.log('A')

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // console.log('B')
  return (
    /////////// USING FLATLIST ///////////////////////////
    // <SafeAreaView style={styles.container}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    //   <Header />
    //   <FlatList 
    //     data={data}
    //     renderItem={({item}) => <TrainingCard title={item.title} description={item.description}/>}
    //     numColumns={2}
    //     contentContainerStyle={styles.container}
    //   />
    // </SafeAreaView>

    ///////////// USING Flexbox //////////////
    <ScrollView>
      <Header />
      <View style={styles.container}>
        {data.map((item) => {
          return (
            <TrainingCard key={item.id} title={item.title} description={item.description}></TrainingCard>
          )
        })}
      </View >
      {/* ITERATION THROUGH LIST */}
      
      
      <BodyPartList />
      
    </ScrollView>

    
    
  );
}

const cardWidth = screenDimensions.width / 2 - 20

console.log('C')

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    alignContent: 'flex-start'
    // flex: 1
  },
  trainingCard: {
    marginVertical: 8,
    width: cardWidth,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#fbfbfb',
  },
  cardTitle: {
    fontSize: 14,
    margin: 10,
    fontWeight: 'bold'
  },
  cardText: {
    fontSize: 12,
    margin: 10,
  }
});

export default App;
