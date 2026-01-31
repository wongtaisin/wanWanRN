import React from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'

interface GridProps<T> {
  data: T[]
  columns?: number
  spacing?: number
  paddingHorizontal?: number
  renderItem: (item: T, index: number, size: number) => React.ReactNode
}

function Grid<T>({
  data,
  columns = 4,
  spacing = 8,
  paddingHorizontal = 16,
  renderItem
}: GridProps<T>) {
  const { width } = useWindowDimensions()

  const availableWidth = width - paddingHorizontal * 2
  const itemSize = (availableWidth - spacing * (columns - 1)) / columns

  return (
    <View style={[styles.container, { paddingHorizontal }]}>
      <View style={styles.wrap}>
        {data.map((item, index) => {
          const isLastColumn = (index + 1) % columns === 0

          return (
            <View
              key={index}
              style={[
                {
                  width: itemSize,
                  height: itemSize,
                  marginRight: isLastColumn ? 0 : spacing,
                  marginBottom: spacing
                }
              ]}
            >
              {renderItem(item, index, itemSize)}
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

export default Grid
