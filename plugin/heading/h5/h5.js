class BlockeePlugin__h5 {

    static info(){
        return {
                    name: 'H5',
                    title: "Heading 5",

        }
    }


    static insert() {

        let contents = "<h5 class='blockee-editor-block-element' contenteditable='true'></h5>";
        blockeeEditor.blockInsert('h5', contents);

    }

}