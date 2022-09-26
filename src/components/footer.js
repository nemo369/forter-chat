import { html } from './base';
import { Logo } from './logo';

export function AppFooter() {
  return html`<header class="app-footer">
    <div class="max-width flex justify-between align-center">
      <h2 class="">Forter Challenge: Chat Bot With an Attitude</h2>
      ${Logo()}
    </div>
  </header> `;
}
