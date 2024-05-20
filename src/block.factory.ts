
import {
  VIEW_CONTROL_OPTIONS,
  VIEW_KEY_SELECTOR,
  VIEW_PLACEHOLDER_SELECTOR,
  CONTROL_PANEL_SELECTOR,
  CONTROL_TOOLBAR_SELECTOR
} from './constants'
import { generateKey } from './utils'

/**
 * UI blocks factory
 */

  /**
   * Process toolbar options into HTML content
   */
export const createToolbar = ( key: string, options: ToolbarSet[], editing = false ) => {
  if( typeof key !== 'string' 
      || !Array.isArray( options ) 
      || !options.length )
    throw new Error('Invalid createToolbar Arguments')

  let 
  mainOptions = '',
  extraOptions = '',
  subOptions: string[] = []

  const
  composeSubLi = ({ icon, title, event, disabled }: ToolbarSet ) => {
    let attrs = `${disabled ? 'class="disabled"' : ''}`
    
    // Trigger event type & params attributes
    if( event ){
      if( event.type && event.attr ) attrs += ` ${event.type}="${event.attr}"`
      if( event.params ) attrs += ` params="${event.params}"`
    }

    // Add title attributes
    if( title ) attrs += ` title="${title}"`

    return `<li ${attrs}><i class="${icon}"></i></li>`
  },
  composeLi = ({ icon, label, title, event, disabled, extra, sub }: ToolbarSet ) => {
    let attrs = `${disabled ? 'class="disabled"' : ''}`
    
    // Trigger event type & params attributes
    if( event ){
      if( event.type && event.attr ) attrs += ` ${event.type}="${event.attr}"`
      if( event.params ) attrs += ` params="${event.params}"`

      // Create a sub options
      if( Array.isArray( sub ) && sub.length )
        subOptions.push(`<div options="sub" extends="${event.params}">
                          <li dismiss="sub"><i class="bx bx-chevron-left"></i></li>
                          <li class="label"><i class="${icon}"></i><label>${label || title}</label></li>
                          ${sub.map( composeSubLi ).join('')}
                        </div>`)
    }

    // Add title attributes
    if( label ) attrs += ` class="label"`
    if( title ) attrs += ` title="${title}"`

    const optionLi = `<li ${attrs}><i class="${icon}"></i><label>${label ? ` ${label}` : ''}</label></li>`
    extra ?
        extraOptions += optionLi
        : mainOptions += optionLi
  }
  
  // Generate HTML menu
  options.forEach( composeLi )

  if( !mainOptions )
    throw new Error('Undefined main options')

  return `<div ${CONTROL_TOOLBAR_SELECTOR}="${key}" ${editing ? 'class="editing"' : ''}>
    <div>
      <ul>
        <div options="main">
          ${mainOptions}
          ${extraOptions ? `<li toggle="extra"><i class="bx bx-dots-horizontal-rounded"></i></li>` : ''}
        </div>

        ${ extraOptions ?
              `<div options="extra">
                ${extraOptions}
                <li dismiss="extra"><i class="bx bx-chevron-left"></i></li>
              </div>` : ''
        }

        ${subOptions.length ? subOptions.join('') : ''}
      </ul>

      ${ editing ? 
            `<ul>
              <div options="control">
                ${VIEW_CONTROL_OPTIONS.map( composeSubLi ).join('')}
              </div>
            </ul>`: ''
      }
    </div>
  </div>`
}

export const createPanel = ( key: string, props: {}, editing = false ) => {

  return `<div ${CONTROL_PANEL_SELECTOR}="${key}">
    <div>
      <div class="label">
        <i class="bx bx-paragraph"></i>
        <label>Paragraph</label>
      </div>

      <ul options="tabs">
        <li class="active"><i class="bx bx-edit-alt"></i></li>
        <li ><i class="bx bxs-brush"></i></li>
        <li><i class="bx bxs-zap"></i></li>

        <!-- <li><i class="bx bx-accessibility"></i></li> -->
        <li><i class="bx bx-info-circle"></i></li>
        <li><i class="bx bx-dots-horizontal-rounded"></i></li>
        <li dismiss="global"><i class="bx bx-x"></i></li>
      </ul>
      
      <div class="body">
        
      </div>
    </div>
  </div>`
}

/**
 * Create common placeholder block
 */
export const createPlaceholder = () => {
  return `<div ${VIEW_PLACEHOLDER_SELECTOR}="active" ${VIEW_KEY_SELECTOR}="${generateKey()}"></div>`
}