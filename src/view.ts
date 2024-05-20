import type Modela from '.'
import {
  VIEW_KEY_SELECTOR,
  VIEW_NAME_SELECTOR,
  VIEW_ACTIVE_SELECTOR,
  VIEW_CAPTION_SELECTOR,
  VIEW_PLACEHOLDER_SELECTOR,
  VIEW_TYPES_ALLOWED_SELECTOR,
  
  CONTROL_TOOLBAR_SELECTOR,
  
  CONTROL_EDGE_MARGIN,
  CONTROL_TOOLBAR_MARGIN
} from './constants'
import { Stylesheet } from './css'
import { createPlaceholder, createToolbar } from './block.factory'
import { log, generateKey, i18n, defineProperties, extractProperties } from './utils'

export default class View {

  private flux: Modela

  /**
   * View's styles application handler
   */
  private styles?: Stylesheet 

  public element?: HTMLElement | string
  public $?: JQuery<HTMLElement>

  public key?: string
  private component?: ViewSpecs
  
  /**
   * 
   */
  private $parent?: JQuery<HTMLElement>

  private globalSet: GlobalSet

  constructor( flux: Modela ){
    this.flux = flux

    this.globalSet = {
      css: flux.css,
      assets: flux.assets,
      i18n,
      defineProperties
    }
  }

  inspect( element: HTMLElement, name: string ){
    this.element = element
    log('current target - ', element )

    this.$ = $(element)
    if( !this.$.length )
      throw new Error('Invalid View Element')
    
    /**
     * Mount view without key: Not inspected prior
     */
    const isMounted = this.$.attr( VIEW_KEY_SELECTOR ) !== undefined
    if( !isMounted ){
      /**
       * Generate and assign view tracking key
       */
      this.key = generateKey()

      this.$.attr({
        [VIEW_KEY_SELECTOR]: this.key, // Set view key
        [VIEW_NAME_SELECTOR]: name // Set view node name identify
      })
      
      // Set view specifications
      this.setSpecs( this.flux.store.getComponent( name ) )
      // Initialize view properties
      this.initialize()
    }

    // Auto-trigger current view
    this.trigger()
  }
  mount( component: ViewSpecs, to: string, isPlaceholder = true ){
    /**
     * `to` field should only be a model-view-key to be
     * sure the destination view is within editor control
     * scope.
     */
    const $to = $(`[${VIEW_KEY_SELECTOR}="${to}"]`)
    if( !$to.length )
      throw new Error(`Invalid destination view - <key:${to}>`)
    
    if( typeof component.render !== 'function' )
      throw new Error(`<${component.name}> render function not specified`)
    
    /**
     * Render new element with default component and 
     * defined global settings
     */
    this.element = component.render( component, this.globalSet )
    log('mount view - ', this.element )

    // Add view to the DOM
    this.$ = $(this.element)
    $to[ isPlaceholder ? 'after' : 'append' ]( this.$ )

    // Attach a next placeholder to the new view element
    this.$.after( createPlaceholder() )

    /**
     * Generate and assign tracking key to the 
     * new view
     */
    this.key = generateKey()

    this.$.attr({
      [VIEW_KEY_SELECTOR]: this.key, // Set view key
      [VIEW_NAME_SELECTOR]: component.name // Set view node name identify
    })

    /**
     * Extract defined view blocks props
     */
    const renderingProps = extractProperties( this.element )
    this.inject( renderingProps )

    // Set view specifications
    this.setSpecs( component )
    // Initialize view properties
    this.initialize()
    // Auto-trigger current view
    this.trigger()
  }
  mirror( viewInstance: View ){
    /**
     * Argument must be a new instance of view class
     */
    if( typeof viewInstance !== 'object' 
        || !viewInstance.key
        || !viewInstance.$
        || this.key )
      return

    // Clone view element
    this.element = viewInstance.$.clone().get(0)
    if( !this.element )
      throw new Error('View instance HTML element not found')

    log('mirror view - ', this.element )

    // Add duplicated view to the DOM
    this.$ = $(this.element)
    viewInstance.$.parent().append( this.$ )

    // Attach a next placeholder to the new view element
    this.flux.settings.enablePlaceholders && this.$.after( createPlaceholder() )

    /**
     * Generate and assign view tracking key
     */
    this.key = generateKey()
    this.$.attr( VIEW_KEY_SELECTOR, this.key )

    // Clone view specifications
    this.setSpecs( viewInstance.getSpecs() )
    // Initialize view properties
    this.initialize()
  }

  setSpecs( values: any ){
    if( typeof values !== 'object' 
        || !Object.keys( values ).length )
      throw new Error('Invalid method argument')

    this.component = this.component ? { ...this.component, ...values } : values
    log('component - ', this.component )
  }
  
  getSpecs( type?: keyof ViewSpecs ): any {
    if( !this.component ) 
      throw new Error('Invalid method called')

    return type ? this.component[ type ] : this.component
  }

  /**
   * Run initial 
   */
  initialize(){
    try {
      /**
       * Initialize default styles of the view
       */
      const { name, styles } = this.getSpecs()
      if( name && typeof styles === 'function' ){
        this.styles = new Stylesheet({
          nsp: name,
          key: this.key,
          /**
           * Run the defined `styles()` method of the component
           * to get initial style properties.
           */
          props: styles( this.globalSet )
        })

        this.styles.load()
      }

      /**
       * 
       */
    }
    catch( error: any ){ log( error.message ) }
  }

  setParent( parent: HTMLElement ){
    if( !parent ) return

    this.$parent = $(parent)
    log('parent target - ', parent )

    // Get parent's default component

    // Auto-trigger current view's parent
    this.triggerParent()
  }
  getParent(){
    return this.$parent
  }

  getTopography( $view?: JQuery<HTMLElement> ){
    $view = $view || this.$
    if( !$view?.length )
      throw new Error('Invalid method call. Expected a valid $view element')
    
    /**
     * View position coordinates in the DOM base on
     * which related triggers will be positionned.
     */
    const { left, top } = $view.offset() || {}

    return { 
      x: left || 0,
      y: top || 0,
      width: $view.width() || 0,
      height: $view.height() || 0
    }
  }

  inject( props: ViewBlockProperties[] ){
    if( !Array.isArray( props ) || !props.length ) return

    props.forEach( each => {
      if( !this.$ ) return

      if( !each.selector ){
        each.caption && this.$.data( VIEW_CAPTION_SELECTOR, each.caption )
        each.allowedViewTypes && this.$.data( VIEW_TYPES_ALLOWED_SELECTOR, each.allowedViewTypes )
        each.addView
        && this.flux.settings.enablePlaceholders
        && this.$.append( createPlaceholder() )

        return
      }

      /**
       * Assign props to specified content blocks
       */
      const $block = this.$.find( each.selector )

      each.caption && $block.data( VIEW_CAPTION_SELECTOR, each.caption )
      each.allowedViewTypes && $block.data( VIEW_TYPES_ALLOWED_SELECTOR, each.allowedViewTypes )
      each.addView
      && this.flux.settings.enablePlaceholders
      && $block.append( createPlaceholder() )
    } )
  }
  update( type: string, dataset: any ){
    if( !this.component ) 
      throw new Error('Invalid method called')

    typeof this.component.apply == 'function'
    && this.component.apply({ type, dataset, view: this })
  }
  destroy(){
    if( !this.$?.length ) 
      throw new Error('Invalid method called')

    // Remove placeholder attached to the view
    this.$.next(`[${VIEW_PLACEHOLDER_SELECTOR}]`).remove()
    this.$.remove()

    // Clear all styles attached from the DOM
    this.styles?.clear()

    this.$ = undefined
    this.key = undefined
    this.styles = undefined
    this.$parent = undefined
    this.component = undefined
  }

  /**
   * Show view's editing toolbar
   */
  showToolbar(){
    if( !this.flux.$root || !this.key ) 
      throw new Error('Invalid method called')

    if( this.flux.$root.find(`[${CONTROL_TOOLBAR_SELECTOR}="${this.key}]"`).length ) 
      return

    const options = this.getSpecs('toolbar')
    if( !options ) return

    const $toolbar = $(createToolbar( this.key, options, true ))

    let { x, y, height } = this.getTopography()
    log('show view toolbar: ', x, y )

    // Adjust by left edges
    if( x < 15 ) x = CONTROL_EDGE_MARGIN

    $toolbar.css({ left: `${x}px`, top: `${y}px` })
    this.flux.$root.append( $toolbar )

    const
    tWidth = $toolbar.width() || 0,
    tHeight = $toolbar.height() || 0
    
    /**
     * Push slightly on top of element in normal position
     * but adjust below the element if it's to close to 
     * the top edge.
     */
    if( y < CONTROL_EDGE_MARGIN ) y = height + CONTROL_TOOLBAR_MARGIN
    else y -= tHeight + CONTROL_TOOLBAR_MARGIN

    // Adjust by right & bottom edges
    const
    dWidth = $(window).width() || 0,
    dHeight = $(window).height() || 0

    if( x > (dWidth - tHeight) ) x = dWidth - tHeight - CONTROL_EDGE_MARGIN
    if( y > (dHeight - tHeight) ) y = dHeight - tHeight - CONTROL_EDGE_MARGIN

    $toolbar.css({ left: `${x}px`, top: `${y}px` })
  }

  trigger(){
    if( !this.key || !this.$ ) return
    log('trigger view')

    /**
     * Highlight triggered view: Delay due to 
     * pre-unhighlight effect.
     */
    setTimeout( () => this.$?.attr( VIEW_ACTIVE_SELECTOR, 'true' ), 200 )

    /**
     * Fire activation function provided with 
     * view component.
     */
    const activate = this.getSpecs('activate')
    typeof activate === 'function' && activate({ view: this.$ }, this.globalSet )
  }
  triggerParent(){
    if( !this.key ) return
    log('trigger parent view')
    
  }

  dismiss(){
    // Unhighlight triggered views
    $(`[${VIEW_KEY_SELECTOR}="${this.key}"]`).removeAttr( VIEW_ACTIVE_SELECTOR )
    // Remove editing options menu if active
    this.flux.$root?.find(`[${CONTROL_TOOLBAR_SELECTOR}="${this.key}"]`).remove()

    /**
     * Fire dismiss function provided with 
     * view component.
     */
    const dismiss = this.getSpecs('dismiss')
    typeof dismiss === 'function' && dismiss({ view: this.$ }, this.globalSet )
  }
  dismissParent(){
    
  }
}