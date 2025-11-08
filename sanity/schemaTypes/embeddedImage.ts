import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'embeddedImage',
  title: 'Embedded Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string'
    }),
    defineField({
      name: 'attribution',
      title: 'Photo Credit',
      type: 'string'
    }),
    defineField({
      name: 'width',
      title: 'Width (%)',
      type: 'number',
      initialValue: 100,
      validation: (Rule) => Rule.min(25).max(100)
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
          { title: 'Center', value: 'center' }
        ]
      },
      initialValue: 'full'
    })
  ]
})

