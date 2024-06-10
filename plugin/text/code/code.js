class BlockeePlugin__code {

    static info(){
        return {
                    name: 'Code',
                    title: "Code",
                    settings:  true
        }
    }

    static insert() {

        let contents = `<code class="blockee-editor-block-element">Configure your code</code>`;
        blockeeEditor.blockInsert('code', contents, true);
    }


    static settingsRender()
    {
        const $node = blockeeEditor.blockGetNode();

        let contents = $node.html();
        let form = `<textarea autofocus>${contents}</textarea>`;

        return form;
    }


    static settingsValidate()
    {
        const $node = blockeeEditor.blockGetNode();

        let contents = $('.blockee-editor-window textarea').val();
        contents = $.trim(contents);

        $node.text(contents);

    }


}