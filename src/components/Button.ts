const toolbar: ToolbarSet[] = []

/**
 * Button view (button) 
 */
export default class Button implements ViewSpecs {
  public name = 'button'
  public node = 'button'
  public attributes = {}
  public toolbar = toolbar
  
  render(): string {
    return `<button>Click me</button>`
  }
}
