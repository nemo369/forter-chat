import { html } from './base';
import { Logo } from './logo';

export function AppFooter() {
  return html`<header class="app-footer">
    <div class="max-width flex justify-between align-center">
      <div class="">
        <b>Forter Challenge: Chat Bot With an Attitude</b>
        |
        <a
          class="nemo-hover"
          target="_blank"
          href="https://www.naamanfrenkel.dev"
          rel="noopener noreferrer"
          >Dev: Naaman Frenkel</a
        >
      </div>
      ${Logo()}
    </div>
  </header> `;
}
