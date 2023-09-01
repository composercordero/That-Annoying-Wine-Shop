


for(let btn of nav){
    btn!.addEventListener('click',(e:Event) => {
        let target = e.currentTarget as HTMLElement
        switch(target.id){
            case 'homeBtn':
                console.log('home')
                break;
            case 'aboutBtn':
                console.log('about')
                break;
            case 'shopBtn':
                console.log('shop')
                break;
            case 'contactBtn':
                console.log('contact')
                break;
            case 'modeBtn':
                if(document.body.dataset.bsTheme === ''){
                    document.body.dataset.bsTheme = 'dark'
                }else{
                    document.body.dataset.bsTheme = ''
                break;
        }
    }
    })
}