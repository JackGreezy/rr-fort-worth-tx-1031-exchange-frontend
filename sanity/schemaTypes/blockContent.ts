import { defineType, defineField } from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' }
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' }
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strikethrough', value: 'strike-through' },
          { title: 'Highlight', value: 'highlight' }
        ],
        annotations: [
          {
            title: 'Internal Link',
            name: 'internalLink',
            type: 'object',
            fields: [
              defineField({
                name: 'reference',
                type: 'reference',
                to: [{ type: 'article' }, { type: 'category' }, { type: 'author' }]
              }),
              defineField({
                name: 'anchor',
                type: 'string',
                title: 'Anchor ID',
                description: 'Optional anchor link (e.g., #section-1)'
              })
            ]
          },
          {
            title: 'External Link',
            name: 'externalLink',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                validation: (Rule) => Rule.required()
              }),
              defineField({
                name: 'blank',
                type: 'boolean',
                title: 'Open in new tab',
                initialValue: true
              }),
              defineField({
                name: 'nofollow',
                type: 'boolean',
                title: 'No follow',
                initialValue: false
              }),
              defineField({
                name: 'sponsored',
                type: 'boolean',
                title: 'Sponsored',
                initialValue: false
              })
            ]
          }
        ]
      }
    },
    {
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption'
        }),
        defineField({
          name: 'attribution',
          type: 'string',
          title: 'Photo Credit'
        }),
        defineField({
          name: 'width',
          type: 'number',
          title: 'Width (%)',
          initialValue: 100,
          validation: (Rule) => Rule.min(25).max(100)
        }),
        defineField({
          name: 'alignment',
          type: 'string',
          title: 'Alignment',
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
    },
    {
      name: 'callToAction',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'header',
          title: 'Header',
          type: 'string',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'subheader',
          title: 'Subheader',
          type: 'text',
          rows: 2
        }),
        defineField({
          name: 'buttons',
          title: 'Buttons',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'text', title: 'Button Text', type: 'string', validation: (Rule) => Rule.required() }),
              defineField({ name: 'url', title: 'URL', type: 'string', validation: (Rule) => Rule.required() }),
              defineField({ name: 'primary', title: 'Primary Button', type: 'boolean', initialValue: false })
            ]
          }],
          validation: (Rule) => Rule.min(1)
        })
      ]
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Quote Text',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'author',
          title: 'Author',
          type: 'string'
        }),
        defineField({
          name: 'style',
          title: 'Quote Style',
          type: 'string',
          options: {
            list: [
              { title: 'Standard', value: 'standard' },
              { title: 'Pull Quote', value: 'pull' },
              { title: 'Testimonial', value: 'testimonial' }
            ]
          },
          initialValue: 'standard'
        })
      ]
    },
    {
      name: 'tableOfContents',
      title: 'Table of Contents',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Table of Contents'
        })
      ]
    },
    {
      name: 'carousel',
      title: 'Image Carousel',
      type: 'reference',
      to: [{ type: 'carousel' }]
    },
    {
      name: 'video',
      title: 'Video Embed',
      type: 'object',
      fields: [
        defineField({
          name: 'url',
          title: 'Video URL',
          type: 'url',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'title',
          title: 'Video Title',
          type: 'string'
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string'
        }),
        defineField({
          name: 'autoplay',
          title: 'Autoplay',
          type: 'boolean',
          initialValue: false
        })
      ]
    }
  ]
})

