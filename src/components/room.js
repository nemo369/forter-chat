import {LitElement, html} from './base';
export class ChatRoom extends LitElement {
  static properties = {
    version: {},
  };

  constructor() {
    super();
    this.version = 'STARTING';
  }

  render() {
    return html`
    <h1>Welcome to Chat Room #123</h1>
    <room-messages></room-messages>
    <room-input></room-input>
`;
  }
}
customElements.define('chat-room', ChatRoom);