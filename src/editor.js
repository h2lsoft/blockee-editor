"use strict";

var blockee_editor_configuration = {};

class blockeeEditor {

    parent;

    constructor(parent) {


        this.parent = parent;
        let wrapper_name = "blockee-wrapper__"+parent.name;


        let blockee_wrapper = `<div class="blockee-editor__wrapper" id="${wrapper_name}">
                                    
                                    <div class="blockee-editor__toolbar">           
                                    
                                        <button type="button" class="blockee-editor__toolbar_insert" onclick="blockeeEditor.openBlocks('${wrapper_name}');">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                            </svg>
                                        </button>
                                                                                                     
                                        <button type="button" class="blockee-editor__toolbar_fullscreen" onclick="blockeeEditor.fullscreen('${wrapper_name}');">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                                              <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/>
                                            </svg>                                                                 
                                        </button>     
                                             
                                    </div>
                                    
                                    <div class="blockee-editor__content"></div>
                                    <div class="blockee-editor__window blockee-editor__blocks">                                        
                                        <div class="blockee-editor__window-header">Insert</div>
                                        <div class="blockee-editor__window-body">                                            
                                            <input type="search" placeholder="Search...">
                                            <div class="blockee-editor__blocks-items">
                                                
                                                <figure class="blockee-editor__block blockee-editor__block-heading">                                                    
                                                    <figcaption>Heading</figcaption>
                                                </figure>
                                                
                                            </div>                                            
                                        </div>                                        
                                    </div>                                                                        
                                    
                                </div>`;



        parent.insertAdjacentHTML('beforebegin', blockee_wrapper);

        document.querySelector("#"+wrapper_name+" .blockee-editor__content").innerHTML = parent.value;

    }

    static loadPlugins(){

        // load plugin at end
        let plugins = blockee_editor_configuration['plugins'];
        if(!plugins)plugins = [{name: 'heading', url: ''}];

        plugins.forEach(function(plugin){

            // add css
            let link = document.createElement( "link" );
            link.type = "text/css";
            link.href = `../src/blocs/${plugin.name}/${plugin.name}.css`;
            link.rel = "stylesheet";

            document.getElementsByTagName( "head" )[0].appendChild( link );

        });

    }



    static init() {

        // initialize
        blockeeEditors = document.querySelectorAll("textarea.blockee-editor");
        blockeeEditors.forEach(function(element){
            new blockeeEditor(element);
        });
    }

    static setDefault(config) {
        blockee_editor_configuration = config;
    }

    static fullscreen(parent){}


}

// load script
blockeeEditor.loadPlugins();

// fire event
var blockeeEditors = [];
blockeeEditor.init();

