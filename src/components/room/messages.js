import {LitElement, html} from '../base';

export class RoomMessages extends LitElement {
  // constructor() {
  //   super();
  // }

  render() {
    return html`<ol>
      <li>Message 1</li>
      <li>Message 2</li>
    </ol>`;
  }
}
customElements.define('room-messages', RoomMessages);