import {LitElement, html,css} from '../base';

export class SingleMember extends LitElement {

  static get styles() {
    return css`
      :host  {
      display: flex;  
      gap: 1rem;
      align-items: center;
      }
      .circle {
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        flex:0 0 1rem;
      }
    `;
  }
  static properties = {
      member: String,
  }
  constructor() {
    super();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
  }

  render() {
    const member = JSON.parse(this.member);
    return html`<div class="circle" style="background:hsl(${member.color},60%, 60%)"></div><span class="member">${member.userName}</span>`;
  }



}
customElements.define('single-member', SingleMember);

