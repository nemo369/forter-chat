import config from '../config';
import { ALL_MEMBERS_EVENT } from '../helpers/consts';
import { LitElement, html, css } from './base';
import './room/member';

export class ChatMembers extends LitElement {
  static get styles() {
    return css`
      ul {
        list-style: none;
        padding: 0 0rem;
        display: flex;
        flex-direction: column;
        gap: 1rem 0;
      }
      :host {
        border-left: 2px dashed white;
        padding-left: 1rem;
        margin-left: 1rem;
      }
    `;
  }

  static properties = {
    members: []
  };

  constructor() {
    super();
    this.members = [];
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(ALL_MEMBERS_EVENT, this._setMembers);
  }

  disconnectedCallback() {
    window.removeEventListener(ALL_MEMBERS_EVENT, this._setMembers);
    super.disconnectedCallback();
  }
  render() {
    return html`<aside>
      <h2>Available now</h2>
      <ul>
        ${this.members.map(
          (member) =>
            html`<li>
              <single-member member=${JSON.stringify(member)}></single-member>
            </li>`
        )}
      </ul>
    </aside>`;
  }

  _setMembers = (event) => {
    if (Array.isArray(event.detail)) {
      this.members = [...event.detail];
    }
  };
}
customElements.define('chat-members', ChatMembers);
