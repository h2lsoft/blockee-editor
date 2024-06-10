class BlockeePlugin__html {

    static info(){
        return {
            name: 'Html',
            title: "Html",
            settings:  false
        }
    }

    static insert() {

        let contents = `<div data-blockee-type="html" class="blockee-editor-block-element blockee-editor-block-element--html" contenteditable="true">Html text here</div>`;
        blockeeEditor.blockInsert('html', contents);
    }




}