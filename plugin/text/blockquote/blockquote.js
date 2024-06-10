class BlockeePlugin__blockquote {

    static info(){
        return {
                    name: 'Blockquote',
                    title: "Blockquote"

        }
    }


    static insert() {

        let contents = `<blockquote data-blockee-type="blockquote" class="blockee-editor-block-element">
                                    <p contenteditable="true">My quote</p>
                                    <footer contenteditable="true">Aldous Huxley</footer>
                               </blockquote>`;

        blockeeEditor.blockInsert('blockquote', contents);

    }

}