class BlockeePlugin__h2 {

    static info(){
        return {
                    name: 'H2',
                    title: "Heading 2",

        }
    }


    static insert() {

        let contents = "<h2 class='blockee-editor-block-element' contenteditable='true'></h2>";
        blockeeEditor.blockInsert('h2', contents);

    }

}