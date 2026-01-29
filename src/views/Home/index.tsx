/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-01-28 10:35:28
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-29 17:24:38
 * @FilePath: \wanWanRN\src\views\Home\index.tsx
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { StyleSheet, Text, View } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
});

export default Home;
