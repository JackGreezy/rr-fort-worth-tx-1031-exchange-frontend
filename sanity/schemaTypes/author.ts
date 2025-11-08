import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'longBio',
      title: 'Long Bio',
      type: 'blockContent'
    }),
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email'
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url'
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn',
      type: 'url'
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter/X',
      type: 'url'
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url'
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url'
    }),
    defineField({
      name: 'expertise',
      title: 'Areas of Expertise',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'seoBio',
      title: 'SEO Bio',
      type: 'text',
      rows: 2,
      description: 'Search-optimized biography'
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'articleCount',
      title: 'Article Count',
      type: 'number',
      readOnly: true,
      description: 'Auto-calculated published articles'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'photo'
    }
  }
})

