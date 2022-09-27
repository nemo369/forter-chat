import { html } from 'lit';
import { Logo, Feature } from '../components';
import { urlForName } from '../router';
import { PageElement } from '../helpers/page-element';
import { ChatRoom } from '../components/room';
import { ChatMembers } from '../components/members';

export class PageHome extends PageElement {
  render() {
    return html`
      <h1 class="chat-title max-width">
        Support group for<br />
        <span class="chat-title__subtitle">dogs</span> with
        <span class="chat-title__subtitle">baby</span> human siblings
      </h1>
      <div class="chat-wrapper__outer max-width">
        <section class="chat-wrapper">
          <div>${ChatRoom()}</div>
          <chat-members></chat-members>
        </section>
      </div>
    `;
  }
}

customElements.define('page-home', PageHome);
