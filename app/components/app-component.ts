import { LitElement, html } from '@polymer/lit-element'

import '@polymer/iron-collapse'
import './demo-component'
import './demos/index'

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
            :host {
               padding: 20px;
            }
            .demos {
               display:flex;
               flex-direction: column;
            }
         </style>
         
         <h1> Babylonjs Demos </h1>
         
         <div class="demos">
            <demo-component>
               <h2>CAD Camera Demo</h2>
               <cad-camera-demo></cad-camera-demo>
            </demo-component>
         </div>

      `
   }


}

customElements.define("app-component", AppComponent);