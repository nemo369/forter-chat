import { LitElement, html, css } from '../base';

export class SingleMember extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
      .circle {
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        flex: 0 0 1rem;
        overflow: hidden;
        padding: 1px;
      }
      .bot,
      :host:has(img) {
        color: #00d894;
      }
      .circle img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    `;
  }
  static properties = {
    member: String
  };
  constructor() {
    super();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
  }

  render() {
    const member = JSON.parse(this.member);
    return html`<div
        class="circle "
        style="background:hsl(${member.userColor},60%, 60%)"
      >
        ${member.userId === 'BOT_ID'
          ? html`<img
              src="${member.userAvatar}"
              width="16"
              height="16"
              alt="bot"
            />`
          : ''}
      </div>
      <span class="member ${member.userId === 'BOT_ID' ? 'bot' : ''}"
        >${member.userName}</span
      >`;
  }
}
customElements.define('single-member', SingleMember);
