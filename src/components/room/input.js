import {LitElement, html} from '../base';

export class RoomInput extends LitElement {
  // constructor() {
  //   super();
  // }

  render() {
    return html`<input type="text" placeholder="Type your message here" />`;
  }
}
customElements.define('room-input', RoomInput);