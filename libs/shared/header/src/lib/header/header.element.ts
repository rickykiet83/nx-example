declare global {
  interface HTMLElementTagNameMap {
    'nx-example-header': HeaderElement;
  }
}

enum HeaderElementAttribute {
  Title = 'title',
}

export class HeaderElement extends HTMLElement {
  static observedAttributes = [HeaderElementAttribute.Title];

  private titleElement = document.createElement('h2');

  override get title(): string {
    return this.getAttribute(HeaderElementAttribute.Title) ?? '';
  }

  override set title(value: string) {
    this.setAttribute(HeaderElementAttribute.Title, value);
  }

  connectedCallback(): void {
    // prevent double-render if HMR re-attaches
    if (this.childNodes.length > 0) return;

    this.appendChild(this.createLeftSide());
    this.appendChild(this.createRightSide());
  }

  attributeChangedCallback(name: string): void {
    if (name === HeaderElementAttribute.Title) {
      this.titleElement.textContent = this.title;
    }
  }

  private createLeftSide() {
    const leftSide = document.createElement('div');

    const homeLink = document.createElement('a');
    homeLink.href = '/';

    const homeLinkText = document.createElement('h2');
    homeLinkText.textContent = 'Nx Store';
    homeLink.appendChild(homeLinkText);

    leftSide.appendChild(homeLink);

    this.titleElement.textContent = this.title;
    leftSide.appendChild(this.titleElement);

    return leftSide;
  }

  private createRightSide() {
    const githubLink = document.createElement('a');
    githubLink.href = 'https://github.com/rickykiet83/nx-example';
    githubLink.target = '_blank';
    githubLink.rel = 'noreferrer';

    const icon = document.createElement('span');
    icon.classList.add('icon', 'icon-github');
    githubLink.appendChild(icon);

    const rightSide = document.createElement('div');
    rightSide.appendChild(githubLink);

    return rightSide;
  }
}

export function registerHeaderElement(): void {
  if (!customElements.get('nx-example-header')) {
    customElements.define('nx-example-header', HeaderElement);
  }
}
