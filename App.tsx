/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';
import { Button, View, Text, TextInput, Image, Alert  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator(); // 각 Platform native stack기술을 사용
// const Stack = createStackNavigator(); // javascript로 구현, animation등 custom가능
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation, route }: any) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (route.params?.post) {
      console.log(route.params?.post);
    }
  }, [route.params?.post]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
        (<Button onPress={() => setCount(c => c + 1)} title="Update count" />)
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Count: {count}</Text>
      <Button
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }: any) {
  /* 2. Get the param */
  const { itemId = 1, otherParam = '' } = route?.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home Tab" onPress={() => navigation.navigate('HomeTab')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <Button
        title="Update Param"
        onPress={() =>
          navigation.setParams({ itemId: 99, otherParam: 'update param' })
        }
      />
      <Button
        title="Go to Profile"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Custom profile header' })
        }
      />
    </View>
  );
}

function CreatePostScreen({ navigation }: any) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Home',
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
}

function ProfileScreen({ navigation }: any) {
  React.useEffect(
    () => { 
      const unsubscribe = navigation.addListener('focus', () => {console.log ('Screen was focused')});
      return unsubscribe;
    },[]);

  React.useEffect(
    () => navigation.addListener('blur', () => console.log('Screen was unfocused')),
    []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Home tab"
        onPress={() => navigation.navigate('HomeTab')}
      />
    </View>
  );
}

type LogoProp = {children:string; tintColor?: string|undefined;}

function LogoTitle(props:LogoProp) : React.ReactElement{
  console.log(props);
  // const {children, tintColor} = props;
  // console.log(children);

  const img = require('./img/test.jpg');
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={img}
    />
  );
}

function StackView() {
  return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#40CF2C',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          // options={{ headerTitle: (props: LogoProp) => <LogoTitle {...props} /> , title: './img/test.jpg'}}
          options={({navigation, route} : any) => ({
            headerTitle: (props: LogoProp) => <LogoTitle {...props}/>
          })}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ route }: any) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
  )
}

// Drawer Sample
function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

// function CustomDrawerContent({ progress, ...rest }: any) {
//   const translateX = Animated.interpolateNode(progress, {
//     inputRange: [0, 1],
//     outputRange: [-100, 0],
//   });
//   const animatedStyle = useAnimatedStyle(() => {
//       return {
//         transform: [{ translateX }]
//       }
//   });
//   return (
//     <DrawerContentScrollView {...rest}>
//       <Animated.View style={[animatedStyle]}>
//         <DrawerItemList {...rest}/>
//         <DrawerItem label="Help" onPress={() => Alert.alert('Link to help')} />
//       </Animated.View>
//     </DrawerContentScrollView>
//   );
// }

function CustomDrawerContent(props : any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...(props)} />
      <DrawerItem label="Help" onPress={() => Alert.alert('Link to help')} />
    </DrawerContentScrollView>
  );
}

function DrawerView() {
  return (
    <Drawer.Navigator
      initialRouteName="Article"
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
      {/* <Drawer.Screen name="Tab" component={TabView}/> */}
    </Drawer.Navigator>
  );
}

// Tab View sample

function HomeTab() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  )
}

function TabView() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeTab} />
      <Tab.Screen name="Stack" component={StackView} />
      <Tab.Screen name="Drawer" component={DrawerView} />
    </Tab.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      {/* <StackView/> */}
      {/* <DrawerView/> */}
      <TabView/>
    </NavigationContainer>
  );
}

export default App;
