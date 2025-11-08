import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'carousel',
  title: 'Image Carousel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
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
          })
        ]
      }],
      validation: (Rule) => Rule.min(2)
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'autoplayDelay',
      title: 'Autoplay Delay (seconds)',
      type: 'number',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(10)
    }),
    defineField({
      name: 'showIndicators',
      title: 'Show Indicators',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'showArrows',
      title: 'Show Navigation Arrows',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'height',
      title: 'Height (px)',
      type: 'number',
      initialValue: 400,
      validation: (Rule) => Rule.min(200).max(800)
    })
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images'
    },
    prepare(selection) {
      const { images } = selection
      return {
        title: selection.title || 'Image Carousel',
        subtitle: `${images?.length || 0} images`,
        media: images?.[0]?.image
      }
    }
  }
})

