class BlockeePlugin__pre {

    static info(){
        return {
                    name: 'Pre',
                    title: "Pre",
                    settings:  false
        }
    }

    static insert() {

        let contents = `<pre class="blockee-editor-block-element" contenteditable="true">Configure your text</pre>`;
        blockeeEditor.blockInsert('pre', contents);
    }


    static settingsValidate()
    {
        const $node = blockeeEditor.blockGetNode();

        let contents = $('.blockee-editor-window textarea').val();
        contents = $.trim(contents);

        $node.text(contents);

    }


    static settingsRender()
    {
        const $node = blockeeEditor.blockGetNode();

        let contents = $node.html();
        let form = `<textarea>${contents}</textarea>`;

        return form;
    }



}