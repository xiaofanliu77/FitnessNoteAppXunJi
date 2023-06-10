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
  FlatList,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import actionItems from './actions.json';
import _ from 'lodash';
import {Int32} from 'react-native/Libraries/Types/CodegenTypes';

const screenDimensions = Dimensions.get('screen');

type CardProps = {
  title: string;
  description: string;
};

const data = [
  {id: 1, title: '模版一', description: '杠'},
  {id: 2, title: '模版二', description: '杠铃卧推，杠铃卧推'},
  {id: 3, title: '模版三', description: '杠铃卧推，杠铃卧推，杠铃卧推'},
];

const TrainingCard = ({title, description}: CardProps) => (
  <TouchableOpacity>
    <View style={styles.trainingCard}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>EDIT</Text>
      <Text style={styles.cardText}>{description}</Text>
    </View>
  </TouchableOpacity>
);

function ActionCard({exercises}: any): JSX.Element {
  // console.log(exercises[0]);
  return (
    <FlatList
      data={exercises}
      renderItem={({item}) => (
        <View style={styles.actionCard}>
          {/* <Text>{item.iconImage}</Text> */}
          <Image style={styles.cardImage} source={require('./dumbell.png')} />
          <Text style={styles.actionCardText}>{item.name}</Text>
        </View>
      )}
      numColumns={2}
      horizontal={false}
    />
  );
}

// ExerciseList is replaced by ActionCard
function ExerciseList({exercises}: any): JSX.Element {
  return exercises.map((ex, index) => {
    return (
      <View style={styles.cardText}>
        <Text>
          {`        `}Name: {ex.name}
        </Text>
        <Text>
          {`        `}IconImage: {ex.iconImage}
        </Text>
        <Text>
          {`        `}Image: {ex.image}
        </Text>
      </View>
    );
  });
}

function EquipmentList({value}: any): JSX.Element {
  return _.map(value, (val: any[], key: string) => {
    return (
      <View style={styles.cardText}>
        <Text>
          {`    `}
          {key}
        </Text>
        {/* <ExerciseList exercises={val} /> */}
        <ActionCard exercises={val} />
      </View>
    );
  });
}

function SubBodyPartList({value}: any): JSX.Element {
  return _.map(value, (val: any[], key: string) => {
    // console.log({key})
    return (
      <View key={key} style={styles.cardText}>
        <Text>
          {`  `}
          {key}
        </Text>
        <EquipmentList value={val} />
      </View>
    );
  });
}

function BodyPartList({value}: any): JSX.Element {
  return _.map(actionItems, (val: any[], key: any) => {
    // console.log({k: key})
    return (
      <View style={styles.cardText}>
        <Text>{key}</Text>
        <SubBodyPartList value={val} />
      </View>
    );
  });

  // return <FlatList data={value} renderItem={} />;
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // console.log('B')
  return (
    /////////// USING FLATLIST ///////////////////////////
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <Header /> */}
      {/* <FlatList
        data={data}
        renderItem={({item}) => (
          <TrainingCard title={item.title} description={item.description} />
        )}
        numColumns={2}
        contentContainerStyle={styles.container}
      /> */}

      <BodyPartList />
    </SafeAreaView>

    ///////////// USING Flexbox //////////////
    /*
    <ScrollView>
      <Header />
      <View style={styles.container}>
        {data.map(item => {
          return (
            <TrainingCard
              key={item.id}
              title={item.title}
              description={item.description}></TrainingCard>
          );
        })}
      </View>
      <BodyPartList />
    </ScrollView>
    */
  );
}

const cardWidth = screenDimensions.width / 2 - 20;

const styles = StyleSheet.create({
  //Flexbox
  /*
  container: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    flexWrap: 'wrap',

    // justifyContent: 'space-evenly',
    // padding: 5,
    // alignItems: 'flex-start',
    // alignContent: 'flex-start',
    // flex: 1
  },
  */
  trainingCard: {
    marginVertical: 8,
    marginLeft: (screenDimensions.width - cardWidth * 2) / 3,
    width: cardWidth,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#fbfbfb',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  //FlatList
  container: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  actionCard: {
    marginVertical: 8,
    marginLeft: (screenDimensions.width - cardWidth * 2) / 3,
    width: cardWidth * 0.8,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#fbfbfb',
    padding: 10,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    margin: 10,
    fontWeight: 'bold',
    flexBasis: '50%', //ensure first row of card contains only 2 items
  },
  cardText: {
    fontSize: 12,
    margin: 10,
  },
  cardImage: {
    margin: 10,
    flex: 1,
    width: cardWidth * 0.8,
    height: cardWidth * 0.8 - 20,
    resizeMode: 'contain',
  },
  actionCardText: {
    // textAlign: 'center',
  },
});

export default App;
