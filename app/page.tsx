'use client'

import React, { useState } from 'react'
import Section from './section'

const NewsSummaryListDemo = () => {
  const topics = [
    { id: 'topic1', title: 'Breaking News', max_items_total: 2 },
    { id: 'topic2', title: 'Local News', max_items_total: 2 },
    { id: 'topic3', title: 'Global News', max_items_total: 2 },
    { id: 'topic4', title: 'Entertainment', max_items_total: 2 },
  ]

  const [items, setItems] = useState([
    {
      id: '1',
      content:
        'Breaking: New technological breakthrough in renewable energy announced.',
      visible: true,
      topic: 'topic1',
      sources: [
        { name: 'TechCrunch', url: 'https://techcrunch.com', visible: true },
        {
          name: 'ScienceDaily',
          url: 'https://www.sciencedaily.com',
          visible: true,
        },
        {
          name: 'MIT Technology Review',
          url: 'https://www.technologyreview.com',
          visible: true,
        },
      ],
    },
    {
      id: '2',
      content: 'Revolutionary new dance move discovered.',
      visible: true,
      topic: 'topic1',
      sources: [
        { name: 'TechCrunch', url: 'https://techcrunch.com', visible: true },
        {
          name: 'ScienceDaily',
          url: 'https://www.sciencedaily.com',
          visible: true,
        },
        {
          name: 'MIT Technology Review',
          url: 'https://www.technologyreview.com',
          visible: true,
        },
      ],
    },
    {
      id: '8',
      content: 'Breaking news.',
      visible: true,
      topic: 'topic1',
      sources: [
        { name: 'TechCrunch', url: 'https://techcrunch.com', visible: true },
        {
          name: 'ScienceDaily',
          url: 'https://www.sciencedaily.com',
          visible: true,
        },
        {
          name: 'MIT Technology Review',
          url: 'https://www.technologyreview.com',
          visible: true,
        },
      ],
    },
    {
      id: '3',
      content:
        'Local community comes together to support small businesses affected by recent economic downturn.',
      visible: true,
      topic: 'topic2',
      sources: [
        {
          name: 'Local News Network',
          url: 'https://localnews.com',
          visible: true,
        },
        {
          name: 'Community Herald',
          url: 'https://communityherald.com',
          visible: true,
        },
        {
          name: 'Chamber of Commerce',
          url: 'https://chamberofcommerce.com',
          visible: true,
        },
      ],
    },
    {
      id: '4',
      content: 'Weekend roundup.',
      visible: true,
      topic: 'topic2',
      sources: [
        {
          name: 'Local News Network',
          url: 'https://localnews.com',
          visible: true,
        },
        {
          name: 'Community Herald',
          url: 'https://communityherald.com',
          visible: true,
        },
        {
          name: 'Chamber of Commerce',
          url: 'https://chamberofcommerce.com',
          visible: true,
        },
      ],
    },
    {
      id: '5',
      content:
        'Global climate conference reaches landmark agreement on emissions reduction targets. Experts hail decision as a major step forward in combating climate change.',
      visible: true,
      topic: 'topic3',
      sources: [
        { name: 'UN News', url: 'https://news.un.org', visible: true },
        { name: 'Reuters', url: 'https://www.reuters.com', visible: true },
        { name: 'BBC', url: 'https://www.bbc.com', visible: true },
        {
          name: 'The Guardian',
          url: 'https://www.theguardian.com',
          visible: true,
        },
      ],
    },
    {
      id: '6',
      content:
        'Global climate conference reaches landmark agreement on emissions reduction targets. Experts hail decision as a major step forward in combating climate change.',
      visible: false,
      topic: 'topic3',
      sources: [
        { name: 'UN News', url: 'https://news.un.org', visible: true },
        { name: 'Reuters', url: 'https://www.reuters.com', visible: true },
        { name: 'BBC', url: 'https://www.bbc.com', visible: true },
        {
          name: 'The Guardian',
          url: 'https://www.theguardian.com',
          visible: true,
        },
      ],
    },
  ])

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Monday August 26, 2024</h2>
      {topics.map((topic, index) => (
        <Section
          key={topic.id}
          index={index}
          topics={topics}
          items={items}
          setItems={setItems}
        />
      ))}
    </div>
  )
}

export default NewsSummaryListDemo
