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
 * Paragraph view (p) 
 */
export default class Paragraph implements ViewSpecs {
  public name = 'paragraph'
  public node = 'p'
  public attributes = {}
  public toolbar = toolbar

  styles( global: GlobalSet ): StyleSheetProps {
    return {
      predefined: {
        options: [],
        css: `
          width: 100%;
          font-size: inherit;
          content: "Loren upsum";

          &[mv-active="true"]:not([mv-placeholder]) {
            background: var(--me-primary-color-fade);
            border-radius: var(--me-placeholder-radius);
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
          font-weight: italic;

          &:active { color: red; }
        `
      }
    }
  }
  render( props: {}, global: GlobalSet ): string {
    return `<p>Loren upsum</p>`
  }
  activate( e: ViewEvent, global: GlobalSet ){ 
    e.view.attr('contenteditable', true )
  }
  dismiss( e: ViewEvent, global: GlobalSet ){
    e.view.removeAttr('contenteditable')
  }
  actions(){}
}