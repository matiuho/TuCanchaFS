class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav>
            <div class="titulo"><h1>TuCancha!</h1></div>
            <a href="index.html">Inicio</a>
            <a href="index.html#nosotros">Nosotros</a>
            <a href="index.html#canchas">Canchas</a>
            <a href="index.html#blogs">Blogs</a>
            <a href="contacto.html">Contacto</a>
            <div class="login"><a href="login.html" target="_self">Iniciar sesion</a></div>
        </nav>
      `;
    }
}
customElements.define('my-header', MyHeader);