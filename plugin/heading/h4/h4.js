class BlockeePlugin__h4 {

    static info(){
        return {
                    name: 'H4',
                    title: "Heading 4",

        }
    }


    static insert() {

        let contents = "<h4 class='blockee-editor-block-element' contenteditable='true'></h4>";
        blockeeEditor.blockInsert('h4', contents);

    }

}