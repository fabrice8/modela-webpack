
export const CONTROL_ROOT = '#modela'

/**
 * Common selector use to identify view elements
 * in the DOM.
 * 
 * Could be `classname` or `tagname` or `data-*`
 */
export const VIEW_IDENTIFIER = '.view'

export const VIEW_KEY_SELECTOR = 'mv-key'
export const VIEW_NAME_SELECTOR = 'mv-name'
export const VIEW_STYLE_SELECTOR = 'mv-style'
export const VIEW_ACTIVE_SELECTOR = 'mv-active'
export const VIEW_CAPTION_SELECTOR = 'mv-caption'
export const VIEW_PLACEHOLDER_SELECTOR = 'mv-placeholder'
export const VIEW_TYPES_ALLOWED_SELECTOR = 'mv-types-allowed'

/**
 * View control options
 */
export const VIEW_CONTROL_OPTIONS = [
  { 
    icon: 'bx bx-edit-alt',
    title: 'Attributes',
    event: {
      type: 'show',
      attr: 'attributes',
      params: false,
      shortcut: 'command + alt + a'
    },
    disabled: true
  },
  { 
    icon: 'bx bx-duplicate',
    title: 'Duplicate',
    event: {
      type: 'action',
      attr: 'duplicate',
      params: false,
      shortcut: 'command + shift + d'
    }
  },
  { 
    icon: 'bx bx-trash',
    title: 'Delete',
    event: {
      type: 'action',
      attr: 'delete',
      params: false,
      shortcut: 'command + alt + d'
    }
  },
]

/**
 * Control layer element selector
 * 
 * NOTE: Only custom attributes
 */
export const CONTROL_PANEL_SELECTOR = 'mv-panel'
export const CONTROL_TOOLBAR_SELECTOR = 'mv-toolbar'
export const CONTROL_BLOCK_SELECTOR = 'mv-control-block'

export const CONTROL_EDGE_MARGIN = 15
export const CONTROL_TOOLBAR_MARGIN = 6

/**
 * Global control options
 */
export const GLOBAL_CONTROL_OPTIONS = [
  { 
    icon: 'bx bx-undo',
    title: 'Undo',
    event: {
      type: 'action',
      attr: 'undo',
      params: false,
      shortcut: 'command + z'
    },
    disabled: true
  },
  { 
    icon: 'bx bx-redo',
    title: 'Redo',
    event: {
      type: 'action',
      attr: 'redo',
      params: false,
      shortcut: 'command + y'
    },
    disabled: true
  },
  { 
    icon: 'bx bx-devices',
    title: 'Device Screens',
    event: {
      type: 'toggle',
      attr: 'sub',
      params: 'screen-mode'
    },
    disabled: false,
    sub: [
      { 
        icon: 'bx bx-mobile-alt',
        title: 'Mobile',
        event: {
          type: 'action',
          attr: 'screen-mode',
          params: 'mobile'
        },
        disabled: false
      },
      { 
        icon: 'bx bx-tab',
        title: 'Tablet',
        event: {
          type: 'action',
          attr: 'screen-mode',
          params: 'tablet'
        },
        disabled: false
      },
      { 
        icon: 'bx bx-desktop',
        title: 'Desktop',
        event: {
          type: 'action',
          attr: 'screen-mode',
          params: 'desktop'
        },
        disabled: false
      },
      { 
        icon: 'bx bx-tv',
        title: 'Tv',
        event: {
          type: 'action',
          attr: 'screen-mode',
          params: 'tv'
        },
        disabled: false
      }
    ]
  },
  { 
    icon: 'bx bx-cog',
    title: 'Settings',
    event: {
      type: 'show',
      attr: 'global',
      params: 'settings',
      shortcut: 'command + shift + s'
    },
    disabled: false
  },
  { 
    icon: 'bx bxs-brush',
    title: 'Styles',
    event: {
      type: 'show',
      attr: 'global',
      params: 'styles',
      shortcut: 'command + shift + c'
    },
    disabled: false,
    extra: true
  },
  { 
    icon: 'bx bx-landscape',
    title: 'Assets',
    event: {
      type: 'show',
      attr: 'global',
      params: 'assets',
      shortcut: 'command + shift + a'
    },
    disabled: false,
    extra: true
  }
]