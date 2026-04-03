/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-01-28 10:35:28
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-04-03 10:22:45
 * @FilePath: \wanWanRN\src\pages\Home\index.tsx
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/common/Header'
import SvgIcon from '../../components/Svg'
import SvgComponents from '../../components/svg/index'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

// 计算：每行4个，左右padding共20，间隙共5*8=40（4个item之间3个间隙 + 左右各1个）
const ITEM_SPACING = 8 // item 之间的间距（相当于 gap / 2）
const PADDING_HORIZONTAL = 16 // 容器左右内边距

// 可用宽度 = 屏幕宽度 - 左右 padding
const AVAILABLE_WIDTH = SCREEN_WIDTH - PADDING_HORIZONTAL * 2

// 每个 item 宽度 = (可用宽度 - 3个间隙) / 4
const ITEM_SIZE = (AVAILABLE_WIDTH - ITEM_SPACING * 3) / 4

const tableData = [
  { label: '吃', prop: 'eat', icon: SvgComponents.eatSvg },
  { label: '喝', prop: 'drink', icon: SvgComponents.drinkSvg },
  { label: '玩', prop: 'play', icon: SvgComponents.playSvg },
  { label: '乐', prop: 'glad', icon: SvgComponents.gladSvg },
  { label: '过路费', prop: 'tolls', icon: SvgComponents.tollsSvg },
  { label: '车油', prop: 'oil', icon: SvgComponents.oilSvg },
  { label: '停车费', prop: 'parking', icon: SvgComponents.parkingSvg },
  { label: '交通费', prop: 'traffic', icon: SvgComponents.trafficSvg },
  { label: '超市', prop: 'supermarket', icon: SvgComponents.supermarketSvg },
  { label: '网购', prop: 'online_shopping', icon: SvgComponents.onlineShoppingSvg },
  { label: '话费', prop: 'phone_bill', icon: SvgComponents.phoneBillSvg },
  { label: '红包', prop: 'red_packet', icon: SvgComponents.redPacketSvg },
  { label: 'vip', prop: 'vip', icon: SvgComponents.vipSvg },
  { label: '其他', prop: 'other', icon: SvgComponents.otherSvg }
]

const Home = () => {
  console.log('ITEM_SIZE', ITEM_SIZE, SCREEN_WIDTH, tableData)

  return (
    <>
      <Header title="首页" />
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          {tableData.map((item, i) => (
            <View
              key={i}
              style={[
                styles.item,
                // 每行第 4 个（index 从 0 开始）
                (i + 1) % 4 === 0 && styles.itemNoMargin
              ]}
            >
              <View>
                <SvgIcon icon={item.icon} />
                <Text style={styles.itemText}>{item.label}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: PADDING_HORIZONTAL // 和计算一致
  },
  flexContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: 'deepskyblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ITEM_SPACING,
    marginRight: ITEM_SPACING,
    borderRadius: 8
  },
  itemText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff'
  },
  itemNoMargin: {
    marginRight: 0
  }
})

export default Home
