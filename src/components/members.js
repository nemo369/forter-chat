import config from '../config';
import { ALL_MEMBERS_EVENT } from '../helpers/consts';
import { LitElement, html, css } from './base';
import './room/member';
import './web-socket';
export class ChatMembers extends LitElement {
  static get styles() {
    return css`
      ul {
        list-style: none;
        padding: 0 0rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      :host {
        border-left: 2px dashed white;
        padding-left: 1rem;
        margin-left: 1rem;
      }
      h2 {
        font-size: 20px;
      }
      @media (max-width: 640px) {
        :host {
          order: -1;
          padding: 0;
          border-left: none;
          border-bottom: 2px dashed white;
        }
        ul {
          padding: 0 0 24px 0;
          flex-direction: row;
          overflow: auto;
          scroll-snap-type: x mandatory;
          white-space: nowrap;
          max-width: 80vw;
        }
        h2 {
          display: none;
        }
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
      <web-socket></web-socket>
      <h2>Online pack members</h2>
      <ul>
        ${this.members.map(
          (member) =>
            html`<li>
              <single-member
                data-member="${JSON.stringify(member)}"
              ></single-member>
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
