class BlockeePlugin__p {

    static info(){
        return {
                    name: 'P',
                    title: "Paragraph",
                    settings:  true
        }
    }

    static insert(alignment='none') {

        let attr_style = '';
        if(alignment !== 'none')
            alignment = 'style="text-align:'+alignment+'"';

        let contents = `<p ${attr_style} class="blockee-editor-block-element" contenteditable="true"></p>`;

        blockeeEditor.blockInsert('p', contents);
    }




    static settingsRender()
    {
        let alignment_none = '';
        let alignment_left = '';
        let alignment_center = '';
        let alignment_right = '';
        let alignment_justify = '';

        let $node = blockeeEditor.blockGetNode();

        let node_style = $node.attr('style')+"";
        node_style = node_style.toLowerCase();
        node_style = node_style.replaceAll(': ', ':');


        if(node_style.indexOf('text-align:left') !== -1)alignment_left = 'checked';
        if(node_style.indexOf('text-align:center') !== -1)alignment_center = 'checked';
        if(node_style.indexOf('text-align:right') !== -1)alignment_right = 'checked';
        if(node_style.indexOf('text-align:justify') !== -1)alignment_justify = 'checked';

        if(alignment_left === '' && alignment_center === '' && alignment_right === ''  && alignment_justify === '')
            alignment_none = 'checked';

        let form = `<div class="blockee-editor-form-row">                                
                                <div class="blockee-editor-form-label">Alignment</div>                                                                                                
                                <label><input type="radio" name="alignment" value="none" ${alignment_none}> None</label>                                
                                <label><input type="radio" name="alignment" value="left" ${alignment_left}> Left</label>                                
                                <label><input type="radio" name="alignment" value="center" ${alignment_center}> Center</label>
                                <label><input type="radio" name="alignment" value="right" ${alignment_right}> Right</label>                                
                                <label><input type="radio" name="alignment" value="justify" ${alignment_justify}> Justify</label>
                           </div>`;

        return form;
    }


    static settingsValidate()
    {
        let alignment = $('.blockee-editor-window input[name="alignment"]:checked').val();
        let $node = blockeeEditor.blockGetNode();

        if(alignment === 'none')
            alignment = '';

        $node.css("text-align", alignment);
    }


}