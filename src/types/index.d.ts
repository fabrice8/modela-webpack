type ViewBlockCaptionPoster = { 
  type: 'image' | 'video'
  src: string
  info?: string
}
type ViewBlockCaption = {
  title: string
  description: string
  posters?: ViewBlockCaptionPoster[]
}
type ViewBlockProperties = {
  selector: string
  /**
   * Define the caption of header to help 
   * users know how it should be used.
   */
  caption?: ViewBlockCaption
  /**
   * Tells whether to add new views to this
   * block.
   */
  addView?: boolean
  /**
   * Define an option list of view content types that
   * could be added to this block.
   * 
   * Default: any (if `addView` param is set to true)
   */
  allowedViewTypes?: string[]
}

type StyleSheetProps = {
  predefined?: {
    options?: string[]
    css?: string
  }
  custom?: {
    enabled: boolean
    required: string[]
    options: string[]
    css?: string
  }
}
type StylesheetParams = { 
  nsp?: string
  key?: string
  props?: StyleSheetProps 
}

type ToolbarSet = {
  icon: string
  label?: string
  title: string
  event: {
    type: string,
    attr: string,
    params: string | boolean
    shortcut?: string
  }
  sub?: ToolbarSet[]
  extra?: boolean
  disabled?: boolean
}

type ViewEvent = {
  type: string
  dataset: any
  view: View
}

interface GlobalSet {
  css: Modela['css']
  assets: Modela['assets']
  i18n: ( text: string ) => string
  defineProperties: ( props: ViewBlockProperties ) => string
}

interface ViewSpecs {
  name: string
  node: string
  attributes: {}
  toolbar?: ToolbarSet[]
  render: ( props: {}, global: GlobalSet ) => string
  styles?: ( global: GlobalSet ) => StyleSheetProps
  apply?: ( e: ViewEvent ) => void
  activate?: ( e: ViewEvent, global: GlobalSet ) => void
  dismiss?: ( e: ViewEvent, global: GlobalSet ) => void
  actions?: () => void
}

type ModelaSettings = {
  viewOnly?: boolean
  hoverSelect?: boolean
  enablePlaceholders?: boolean
}

type Components = {
  [index: string]: ViewSpecs
}

type ModelaStore = {
  components: Components,
  templates: {}
}
type ModelaGlobalStyleSet = {
  group?: string
  label: string
  value?: any
  values?: { 
    [index: string]: string | number | boolean
  }
  options?: { 
    value: string | number | boolean,
    hint?: string
    apply?: string[]
  }[]
  palette?: { 
    value: string | number | boolean,
    hint?: string
    apply?: string[]
  }[]
  featuredOptions?: number[]
  applyOnly?: string
  display?: string // 'inline' | 'dropdown'
  customizable?: boolean
}
type ModelaGlobalStyles = {
  [index: string]: ModelaGlobalStyleSet
}
type ModalGlobalAssets = {}