exports.textEdit=(text)=>{
    console.log()
    let array=[]
    let b=''
    let close=false
    text.forEach(e=>{
        for(var i=0;i<e.length;i++){
            if(e[i]=='"'){
                if(close){
                    b+="</q>"+e[i+1]
                    close=false
                }else{
                    b+="<q>"+e[i+1]
                    close=true
                }
                i+=1
            }else{
                b+=e[i]
            }
        }
        array.push(b)
    })
    return array
}
exports.textEditSimple=(text)=>{
    let b=""
    console.log(text)
    let close=false
    for(var i=0;i<text.length;i++){
        if(text[i]=='"'){
            if(close){
                b+="</q>"+text[i+1]
                close=false
            }else{
                b+="<q>"+text[i+1]
                close=true
            }
            i+=1
        }else{
            b+=text[i]
        }
    }
    console.log(b)
    return b
}