'use client'

import React, { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

import ListItem from './list-item'

const Section = ({ index, topics, items, setItems }) => {
  const [flashingItemId, setFlashingItemId] = useState(null)
  const [showAdditionalItems, setShowAdditionalItems] = useState(false)

  const topic = topics[index]
  const id = topic.id

  const title = topic.title
  const visibleItemCount = topic.max_items_total

  const topicItems = items.filter(item => item.topic === id)

  const moveItem = (index, direction) => {
    setItems(prevItems => {
      const newItems = [...prevItems]
      const [reorderedItem] = newItems.splice(index, 1)
      newItems.splice(
        direction === 'up' ? index - 1 : index + 1,
        0,
        reorderedItem
      )
      setFlashingItemId(reorderedItem.id)
      return newItems
    })
  }

  const toggleVisibility = index => {
    setItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, visible: !item.visible } : item
      )
    )
    setFlashingItemId(items[index].id)
  }

  const onToggleSource = (itemIndex, sourceIndex) => {
    setItems(prevItems => {
      const newItems = prevItems.map((item, idx) => {
        if (idx === itemIndex) {
          return {
            ...item,
            sources: item.sources.map((source, sIdx) => {
              if (sIdx === sourceIndex) {
                return { ...source, visible: !source.visible }
              }
              return source
            }),
          }
        }
        return item
      })
      return newItems
    })
  }

  const onChangeTopic = (index, newTopicId) => {
    setItems(prevItems => {
      const newItems = [...prevItems]
      newItems[index].topic = newTopicId
      return newItems
    })
  }

  const handleEdit = (index, newContent) => {
    if (newContent === undefined) {
      // This is the initial edit action
      setFlashingItemId(items[index].id)
    } else if (newContent === null) {
      // This is the save action
      setFlashingItemId(null)
    } else {
      // This is the content change action
      setItems(prevItems =>
        prevItems.map((item, i) =>
          i === index ? { ...item, content: newContent } : item
        )
      )
    }
  }

  useEffect(() => {
    if (flashingItemId) {
      const timer = setTimeout(() => setFlashingItemId(null), 500)
      return () => clearTimeout(timer)
    }
  }, [flashingItemId])

  if (topicItems.length === 0) {
    return null
  }

  return (
    <div key={id} className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="w-full">
        {topicItems.slice(0, visibleItemCount).map((item, index) => (
          <ListItem
            key={index}
            item={item}
            index={items.indexOf(item)}
            onToggleVisibility={toggleVisibility}
            onMoveItem={moveItem}
            onEditItem={handleEdit}
            onToggleSource={onToggleSource}
            onChangeTopic={onChangeTopic}
            totalItems={topicItems.length}
            topics={topics}
            isFlashing={flashingItemId === item.id}
          />
        ))}
      </ul>
      {topicItems.length > visibleItemCount && (
        <div className="relative py-2">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-sm text-gray-500">
              {showAdditionalItems
                ? 'Omitted items'
                : `${topicItems.length - visibleItemCount} item${
                    topicItems.length - visibleItemCount > 1 ? 's' : ' '
                  } omitted`}
              <button
                onClick={() => setShowAdditionalItems(prev => !prev)}
                className="ml-2 text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
              >
                {showAdditionalItems ? 'Hide' : 'Show'}
                {showAdditionalItems ? (
                  <ChevronUp className="inline ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="inline ml-1 h-4 w-4" />
                )}
              </button>
            </span>
          </div>
        </div>
      )}
      {showAdditionalItems && (
        <ul className="space-y-4 mt-4">
          {topicItems.slice(visibleItemCount).map((item, index) => (
            <ListItem
              key={index}
              item={item}
              index={items.indexOf(item)}
              onToggleVisibility={toggleVisibility}
              onMoveItem={moveItem}
              onEditItem={handleEdit}
              onToggleSource={onToggleSource}
              onChangeTopic={onChangeTopic}
              totalItems={topicItems.length}
              topics={topics}
              isFlashing={flashingItemId === item.id}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Section
