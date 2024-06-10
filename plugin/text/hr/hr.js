class BlockeePlugin__hr {

    static info(){
        return {
                    name: 'hr',
                    title: "Hr"

        }
    }


    static insert() {

        let contents = "<hr class='blockee-editor-block-element' />";
        blockeeEditor.blockInsert('hr', contents);
    }

}