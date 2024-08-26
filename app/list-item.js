'use client'

import React, { useState } from 'react'
import {
  EyeOff,
  Eye,
  ChevronUp,
  ChevronDown,
  Edit,
  ArrowUpDown,
  List,
} from 'lucide-react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const IconButton = ({ icon: Icon, label, onClick, disabled, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded hover:bg-gray-300 ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    } ${className}`}
    title={label}
  >
    <Icon size={16} />
  </button>
)

const SourceTag = ({ source, onToggleVisibility, visible, onClick }) => {
  const truncatedSource =
    source.name.length > 15 ? source.name.slice(0, 15) + '...' : source.name
  return (
    <span
      className={`inline-flex items-center ${
        visible ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-600'
      } text-xs font-medium mr-2 mt-2 px-2.5 py-0.5 rounded-full`}
    >
      <span
        className="cursor-pointer mr-1"
        onClick={onClick}
        title={source.name}
      >
        {truncatedSource}
      </span>
      <button onClick={onToggleVisibility} className="focus:outline-none">
        {visible ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
    </span>
  )
}

const ListItem = ({
  item,
  index,
  onToggleVisibility,
  onMoveItem,
  onEditItem,
  onToggleSource,
  onChangeTopic,
  isFlashing,
  totalItems,
  topics,
}) => {
  return (
    <li
      className={`flex bg-gray-100 rounded shadow-sm transition-colors duration-300 ease-in-out ${
        isFlashing ? 'bg-yellow-200' : ''
      } mb-4`}
    >
      <div className="flex-grow p-4 flex flex-col justify-between min-w-0">
        <div
          className={`${
            item.visible ? 'break-words' : 'truncate'
          } text-gray-500`}
        >
          {item.visible ? item.content : item.content.split('\n')[0]}
        </div>
        {item.visible && (
          <div className="flex flex-wrap mt-2">
            {item.sources.map((source, sourceIndex) => (
              <SourceTag
                key={sourceIndex}
                source={source}
                onToggleVisibility={() => onToggleSource(index, sourceIndex)}
                visible={source.visible}
                onClick={() => window.open(source.url, '_blank')}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between bg-gray-200 rounded-r p-1 py-2 flex-shrink-0">
        <IconButton
          icon={item.visible ? EyeOff : Eye}
          label={item.visible ? 'Hide item' : 'Show item'}
          onClick={() => onToggleVisibility(index)}
          className="mb-1 mt-1"
        />
        {item.visible && (
          <>
            <IconButton
              icon={ChevronUp}
              label="Move item up"
              onClick={() => onMoveItem(index, 'up')}
              disabled={index === 0}
              className="mb-1"
            />
            <IconButton
              icon={ChevronDown}
              label="Move item down"
              onClick={() => onMoveItem(index, 'down')}
              disabled={index === totalItems - 1}
              className="mb-1"
            />
            <Dialog>
              <DialogTrigger asChild>
                <IconButton
                  icon={ArrowUpDown}
                  label="Change topic"
                  className="mb-1"
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Topic</DialogTitle>
                </DialogHeader>
                <Select
                  value={item.topic}
                  onValueChange={value => onChangeTopic(index, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map(topic => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <IconButton icon={Edit} label="Edit item" className="mb-1" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Item</DialogTitle>
                </DialogHeader>
                <Textarea
                  value={item.content}
                  onChange={e => onEditItem(index, { content: e.target.value })}
                  className="min-h-[100px] mb-4"
                />
                <Button onClick={() => {}}>Save</Button>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </li>
  )
}

export default ListItem
