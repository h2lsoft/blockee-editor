class BlockeePlugin__embed {

    static info(){
        return {
                    name: 'Embed',
                    title: "Embed",
                    settings:  true
        }
    }

    static insert() {

        let contents = `<div class="blockee-editor-block-element blockee-editor-block-element--embed"></div>`;
        blockeeEditor.blockInsert('embed', contents, true);
    }


    static settingsRender()
    {
        const $node = blockeeEditor.blockGetNode();

        let contents = $node.html();
        let form = `<textarea placeholder="Paste your code here...">${contents}</textarea>`;

        return form;
    }


    static settingsValidate()
    {
        const $node = blockeeEditor.blockGetNode();

        let contents = $('.blockee-editor-window textarea').val();
        contents = $.trim(contents);

        $node.html(contents);

    }


}