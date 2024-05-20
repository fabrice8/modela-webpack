
const toolbar: ToolbarSet[] = [
  { 
    icon: 'bx bx-bold',
    title: 'Bold',
    event: {
      type: 'action',
      attr: 'apply',
      params: 'bold',
      shortcut: 'command + alt + b'
    }
  },
  { 
    icon: 'bx bx-italic',
    title: 'Italic',
    event: {
      type: 'action',
      attr: 'apply',
      params: 'italic',
      shortcut: 'command + alt + i'
    }
  },
  { 
    icon: 'bx bx-underline',
    title: 'Underline',
    event: {
      type: 'action',
      attr: 'apply',
      params: 'underline',
      shortcut: 'command + alt + u'
    }
  },
  {
    icon: 'bx bx-strikethrough',
    title: 'Stike',
    event: {
      type: 'action',
      attr: 'apply',
      params: 'strikethrough',
      shortcut: 'command + alt + s'
    }
  },
  {
    icon: 'bx bx-font-color',
    title: 'Font Color',
    event: {
      type: 'action',
      attr: 'apply',
      params: 'font-color',
      shortcut: 'command + alt + c'
    }
  },
  { 
    icon: 'bx bx-align-justify',
    title: 'Alignment',
    event: {
      type: 'toggle',
      attr: 'sub',
      params: 'alignment'
    },
    sub: [
      {
        icon: 'bx bx-align-left',
        title: 'Align Left',
        event: {
          type: 'action',
          attr: 'align',
          params: 'left'
        }
      },
      {
        icon: 'bx bx-align-middle',
        title: 'Align Center',
        event: {
          type: 'action',
          attr: 'align',
          params: 'center'
        }
      },
      {
        icon: 'bx bx-align-right',
        title: 'Align Right',
        event: {
          type: 'action',
          attr: 'align',
          params: 'right'
        }
      },
      {
        icon: 'bx bx-align-justify',
        title: 'Align Justify',
        event: {
          type: 'action',
          attr: 'align',
          params: 'justify'
        }
      }
    ]
  }
]

/**
 * Text view (span) 
 */
export default class Text implements ViewSpecs {
  public name = 'text'
  public node = 'span'
  public attributes = {}
  public toolbar = toolbar

  styles( global: GlobalSet ): StyleSheetProps {
    return {
      predefined: {
        options: [],
        css: `
          min-width: 1.3rem;
          font-size: inherit;
          display: inline-block;
          content: "Loren upsum";
          
          &[mv-active="true"]:not([mv-placeholder]) {
            border-radius: var(--me-placeholder-radius);
            background: var(--me-primary-color-fade);
            transition: var(--me-active-transition);
          }
          &[contenteditable] { outline: none; }
        `
      },
      custom: {
        enabled: true,
        required: [],
        options: [],
        css: `
          font-weight: bold;

          &:active { color: green; }
        `
      }
    }
  }

  render( props: {}, global: GlobalSet ): string {
    return `<span>Loren upsum</span>`
  }

  /**
   * e.type
   * e.dataset
   * e.view
   */
  apply( e: ViewEvent ){
    console.log( e.view.key )

    switch( e.type ){
      case 'view.styles': {
        e.view.$.css( e.dataset )
      } break

      case 'global.styles': {
        e.view.$.css( e.dataset )
      } break


    }
    
  }

  activate( e: ViewEvent, global: GlobalSet ){ 
    e.view.attr('contenteditable', true )
  }

  dismiss( e: ViewEvent, global: GlobalSet ){
    e.view.removeAttr('contenteditable')
  }

  actions(){}
}