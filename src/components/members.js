import {LitElement, html} from './base';

export class ChatMembers extends LitElement {
  static properties = {
    version: {},
  };

  constructor() {
    super();
    this.version = 'STARTING';
  }

  render() {
    return html`<aside>
      <h2>Available now</h2>
      <ul>
        <li>Member 1</li>
        <li>Member 2</li>
      </ul>
    </aside>`;
  }
}
customElements.define('chat-members', ChatMembers);