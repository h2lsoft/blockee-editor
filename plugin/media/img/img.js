class BlockeePlugin__img {

    static info(){
        return {
            name: 'Img',
            title: "Image",
            settings:  true
        }
    }

    static insert() {

        let contents = `<div data-type="img" class="blockee-editor-block-element blockee-editor-block-element--img"><img></div>`;
        blockeeEditor.blockInsert('img', contents, true);
    }


    static settingsRender()
    {
        let $node = blockeeEditor.blockGetNode();
        $node = $node.find('img');

        let src = $node.attr('src');
        if(typeof src === 'undefined' || !src)src = "";

        let alt = $node.attr('alt');
        if(typeof alt === 'undefined' || !alt)alt = "";

        let title = $node.attr('title');
        if(typeof title === 'undefined' || !title)title = "";

        let o_class = $node.attr('class');
        if(typeof o_class === 'undefined' || !o_class)o_class = "";

        let width = $node.attr('width');
        if(typeof width === 'undefined' || !width)width = "";

        let height = $node.attr('height');
        if(typeof height === 'undefined' || !height)height = "";

        let style = $node.attr('style');
        if(typeof style === 'undefined' || !style)style = "";


        $node = $node.parent('a');
        let url = "";
        let target = "";
        if($node.length)
        {

        }


        let form = `
                            <ul class="blockee-editor-tabs">
                                <li><a href="" class="active">GENERAL</a></li>
                                <li><a href="">LINK</a></li>
                            </ul>                                

                            <div id="tab_general" class="blockee-editor-tab--content active">
                            
                                <div class="blockee-editor-form-row">                                
                                    <div class="blockee-editor-form-label">Src</div>
                                    <input type="text" name="src" value="${src}" class="input-file">
                                    <input type="button" value="..." class="input-file-manager" onclick="blockeeEditor.fileManagerOpen(this)">
                               </div>
                               <div class="blockee-editor-form-row">                                
                                    <div class="blockee-editor-form-label">Text alt</div>
                                    <input type="text" name="alt" value="${alt}">
                               </div>
                               <div class="blockee-editor-form-row">                                
                                    <div class="blockee-editor-form-label">Title</div>
                                    <input type="text" name="title" value="${title}">
                               </div>
                               <div class="blockee-editor-form-row">                                
                                    <div class="blockee-editor-form-label">Size</div>
                                    Width <input type="text" name="width" style="width: 80px; text-align: center; margin-left: 10px; margin-right: 10px" value="${width}"> 
                                    Height <input type="text" name="height" style="width: 80px; text-align: center; margin-left: 10px;" value="${height}">                                
                               </div>
                               
                               
                               <div class="blockee-editor-form-row">                                
                                    <div class="blockee-editor-form-label">Class</div>
                                    <input type="text" name="class" value="${o_class}">
                               </div>                                                      
                               <div class="blockee-editor-form-row">                                
                                    <div class="blockee-editor-form-label">Style</div>
                                    <input type="text" name="style" value="${style}">
                               </div>
                                                        
                            </div>
                            
                            <div id="tab_advanced" class="blockee-editor-tab--content">
                                                                
                               <div class="blockee-editor-form-row">                                
                                    <div class="blockee-editor-form-label">Url</div>
                                    <input type="text" name="url" value="${url}">
                               </div>
                               
                               <div class="blockee-editor-form-row">                                
                                    <div class="blockee-editor-form-label">Target</div>
                                    <select>
                                        <option value=""></option>
                                        <option value="_blank">_blank</option>
                                        <option value="_top">_top</option>
                                    </select>
                               </div>
                               
                               
                            </div>
                            
                            `;

        return form;
    }


    static settingsValidate()
    {
        let $node = blockeeEditor.blockGetNode();
        $node = $node.find('img');

        let src =  $('.blockee-editor-window input[name="src"]').val();
        let alt =  $('.blockee-editor-window input[name="alt"]').val();
        let title =  $('.blockee-editor-window input[name="title"]').val();
        let width =  $('.blockee-editor-window input[name="width"]').val();
        let height =  $('.blockee-editor-window input[name="height"]').val();
        let style =  $('.blockee-editor-window input[name="style"]').val();

        if(src === '')
            $node.removeAttr("src");
        else
            $node.attr("src", src);

        $node.attr("title", title);

        $node.attr("width", width);
        $node.attr("height", height);
        $node.attr("alt", alt);
        $node.attr("style", style);


    }


}