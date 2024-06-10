class BlockeePlugin__h1 {

    static info(){
        return {
                    name: 'H1',
                    title: "Heading 1",

        }
    }


    static insert() {

        let contents = "<h1 class='blockee-editor-block-element' contenteditable='true'></h1>";
        blockeeEditor.blockInsert('h1', contents);

    }




}