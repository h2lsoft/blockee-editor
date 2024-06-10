class BlockeePlugin__list {

    static info(){
        return {
                    name: 'List',
                    title: "List"

        }
    }


    static insert() {

        let contents = `<ul data-blockee-type="list" class='blockee-editor-block-element' contenteditable='true'>
                                    <li>item 1</li>
                                    <li>item 2</li>
                                    <li>item 3</li>
                               </ul>`;

        blockeeEditor.blockInsert('list', contents);

    }

}