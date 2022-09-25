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
        Welcome to Support group for
        <span class="chat-title__subtitle">dog</span> brothers to
        <span class="chat-title__subtitle">newborn baby</span> humans
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
