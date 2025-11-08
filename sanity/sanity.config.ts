import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'

// Import schema types
import article from './schemaTypes/article'
import author from './schemaTypes/author'
import category from './schemaTypes/category'
import blockContent from './schemaTypes/blockContent'
import embeddedImage from './schemaTypes/embeddedImage'
import carousel from './schemaTypes/carousel'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'x5mdofpa'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: '1031exchangenewyork.com',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Articles')
              .child(
                S.list()
                  .title('Articles')
                  .items([
                    S.listItem()
                      .title('Published')
                      .child(
                        S.documentList()
                          .title('Published Articles')
                          .filter('_type == "article" && published == true')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('Drafts')
                      .child(
                        S.documentList()
                          .title('Draft Articles')
                          .filter('_type == "article" && published == false')
                          .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('All Articles')
                      .child(
                        S.documentList()
                          .title('All Articles')
                          .filter('_type == "article"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      )
                  ])
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !['article'].includes(item.getId()!)
            )
          ])
    }),
    visionTool(),
    colorInput()
  ],

  schema: {
    types: [article, author, category, blockContent, embeddedImage, carousel]
  }
})

