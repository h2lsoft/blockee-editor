class BlockeePlugin__iframe {

    static info(){
        return {
                    name: 'Iframe',
                    title: "Iframe",
                    settings:  true
        }
    }

    static insert() {

        let contents = `<iframe class="blockee-editor-block-element" src="about:blank" width="100%" height="150px"></iframe>`;
        blockeeEditor.blockInsert('iframe', contents, true);
    }

    static settingsRender()
    {
       const $node = blockeeEditor.blockGetNode();

       let src = $node.attr('src');
       if(typeof src === "undefined")src = "";

       let width = $node.attr('width');
       if(typeof width === "undefined")width = "";

       let height = $node.attr('height');
       if(typeof height === "undefined")height = "";

       let href = $node.attr('href');
       if(typeof href === "undefined")href = "";

       let title = $node.attr('title');
       if(typeof title === "undefined")title = "";

       let o_class = $node.attr('class');
       if(typeof o_class === "undefined" || o_class === false)o_class = "";

        // remove class begins blockee-
        let classes = o_class.split(' ');
        let filtered_classes = [];
        for (var i = 0; i < classes.length; i++) {
            if (!classes[i].startsWith('blockee')) {
                filtered_classes.push(classes[i]);
            }
        }
        let result = filtered_classes.join(' ');
        o_class = $.trim(result);


       let style = $node.attr('style');
       if(typeof style === "undefined" || style === false)style = "";

       let form = `<div class="blockee-editor-form-row">                                
                                <div class="blockee-editor-form-label">Src</div>
                                <input type="text" name="src" value="${src}">                                                                                                                                
                           </div>
                           <div class="blockee-editor-form-row">                                
                                <div class="blockee-editor-form-label">Size</div>
                                Width <input type="text" name="width" style="width: 80px; text-align: center; margin-left: 10px; margin-right: 10px" value="${width}"> 
                                Height <input type="text" name="height" style="width: 80px; text-align: center; margin-left: 10px;" value="${height}">                                
                           </div>
                           
                           <div class="blockee-editor-form-row">                                
                                <div class="blockee-editor-form-label">Title</div>
                                <input type="text" name="title" value="${title}">
                           </div>                                                     
                           
                           <div class="blockee-editor-form-row">                                
                                <div class="blockee-editor-form-label">Class</div>
                                <input type="text" name="class" value="${o_class}">
                           </div>
                           
                           <div class="blockee-editor-form-row">                                
                                <div class="blockee-editor-form-label">Style</div>
                                <input type="text" name="style" value="${style}">
                           </div>
`;

        return form;
    }


    static settingsValidate()
    {
        const $node = blockeeEditor.blockGetNode();

        let src =  $('.blockee-editor-window input[name="src"]').val();
        let o_class =  $('.blockee-editor-window input[name="class"]').val();
        let width =  $('.blockee-editor-window input[name="width"]').val();
        let height =  $('.blockee-editor-window input[name="height"]').val();
        let style =  $('.blockee-editor-window input[name="style"]').val();

        o_class = 'blockee-editor-block-element '+o_class;

        if(src === '')src = 'about:blank;'

        $node.attr("src", src);
        $node.attr("class", o_class);
        $node.attr("width", width);
        $node.attr("height", height);
        $node.attr("style", style);

    }






}