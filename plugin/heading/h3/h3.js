class BlockeePlugin__h3 {

    static info(){
        return {
                    name: 'H3',
                    title: "Heading 3",

        }
    }


    static insert() {

        let contents = "<h3 class='blockee-editor-block-element' contenteditable='true'></h3>";
        blockeeEditor.blockInsert('h3', contents);

    }

}