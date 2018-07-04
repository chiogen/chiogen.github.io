import { LitElement, html } from '@polymer/lit-element'

import '@polymer/iron-collapse'

type AppComponentProps = {

}

export class AppComponent extends LitElement implements AppComponentProps {

   public static get properties() {
      return {

      }
   }


   _render(props: AppComponentProps) {
      return html`

         <style>
            
         </style>
        
        <slot></slot>
         
      `
   }


}

customElements.define("demo-component", AppComponent);